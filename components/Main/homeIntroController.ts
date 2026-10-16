type FaceName = "front" | "back" | "right" | "left";

type DigitState = {
  cell: HTMLElement;
  currentFace: HTMLElement;
  nextFace: HTMLElement;
  value: number;
  timerId?: number;
};

const COUNTER_THRESHOLDS = [0, 50, 100];
const DIGIT_ROLL_TOTAL_DURATIONS = [520, 520, 620];
const FINAL_DIGIT_ROLL_TOTAL_DURATIONS = [520, 620, 700];
const COUNTER_ROLL_GAP = 300;
const YAW_VELOCITY = -52;
const FACES: FaceName[] = ["front", "left", "back", "right"];

let activeController: HomeIntroController | null = null;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function faceForYaw(yaw: number): FaceName {
  const normalized = ((yaw % 360) + 360) % 360;
  const quadrant = Math.round(normalized / 90) % 4;
  return FACES[quadrant] ?? "front";
}

export class HomeIntroController {
  private readonly root: HTMLElement;
  private readonly square: HTMLElement | null;
  private readonly counter: HTMLElement | null;
  private readonly onComplete: () => void;
  private readonly reducedMotion: boolean;
  private readonly minimumDuration: number;
  private readonly maximumDuration: number;
  private readonly startedAt = performance.now();
  private readonly digits: DigitState[] = [];
  private readonly counterValues: number[];
  private readonly inertElements: HTMLElement[] = [];
  private readonly counterIdleResolvers: Array<() => void> = [];
  private readonly counterStartResolvers: Array<{
    value: number;
    resolve: () => void;
  }> = [];

  private startYaw = 0;
  private yaw = 0;
  private displayedProgress = 0;
  private targetProgress = 0;
  private lastFrame = performance.now();
  private frameId = 0;
  private ready = false;
  private completed = false;
  private finishing = false;
  private destroyed = false;
  private counterStopIndex = -1;
  private counterQueue: number[] = [];
  private counterRolling = false;
  private activeCounterValue = 0;
  private cubeRotation: Animation | null = null;
  private savedHtmlOverflow = "";
  private savedBodyOverflow = "";
  private locked = false;
  private notified = false;
  private onWheel: ((event: Event) => void) | null = null;
  private onKey: ((event: KeyboardEvent) => void) | null = null;

  constructor(root: HTMLElement, onComplete: () => void) {
    this.root = root;
    this.onComplete = onComplete;
    this.square = root.querySelector<HTMLElement>("[data-home-intro-square]");
    this.counter = root.querySelector<HTMLElement>("[data-home-intro-counter]");
    this.reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    this.minimumDuration = this.reducedMotion ? 480 : 3000;
    this.maximumDuration = this.reducedMotion ? 700 : 3000;
    this.counterValues = [0, this.randomInteger(36, 64), 100];
    this.digits = Array.from(
      root.querySelectorAll<HTMLElement>("[data-home-intro-digit]"),
    ).flatMap((cell) => {
      const currentFace = cell.querySelector<HTMLElement>(
        "[data-home-intro-digit-current]",
      );
      const nextFace = cell.querySelector<HTMLElement>(
        "[data-home-intro-digit-next]",
      );
      if (!currentFace || !nextFace) return [];
      return [{ cell, currentFace, nextFace, value: 0 }];
    });
  }

  start() {
    if (activeController && activeController !== this) {
      activeController.destroy();
    }
    activeController = this;
    this.root.classList.add("is-managed");
    if (this.reducedMotion) this.root.classList.add("is-reduced-motion");
    document.documentElement.classList.add("is-home-intro-loading");

    const attrYaw = Number(
      document.documentElement.getAttribute("data-home-intro-yaw"),
    );
    this.startYaw = this.reducedMotion
      ? 0
      : Number.isFinite(attrYaw)
        ? attrYaw
        : -90 * this.randomInteger(0, 3);
    this.yaw = this.startYaw;
    this.root.style.setProperty(
      "--home-intro-initial-y",
      `${this.startYaw}deg`,
    );
    window.setTimeout(() => {
      if (this.destroyed || this.notified) return;
      this.completed = true;
      this.finishing = true;
      this.root.classList.add("is-expanded");
      this.notifyComplete();
    }, this.maximumDuration + 5500);

    this.lockPage();
    if (!this.square || !this.counter) {
      this.ready = true;
      this.displayedProgress = 100;
      this.finish();
      return;
    }

    this.startCubeMotion();
    this.render(0);
    this.trackRealLoading();
    this.frameId = window.requestAnimationFrame(this.tick);
  }

  destroy() {
    this.destroyed = true;
    if (activeController === this) activeController = null;
    this.cleanupMotion();
    this.unlockPage();
  }

  private tick = (now: number) => {
    if (this.completed || this.destroyed) return;
    const elapsed = now - this.startedAt;
    const deltaSeconds = Math.min(0.1, (now - this.lastFrame) / 1000);
    this.lastFrame = now;

    const timeGate = Math.min(100, (elapsed / this.minimumDuration) * 100);
    const gatedTarget = Math.min(this.targetProgress, timeGate);
    const maxStep = (this.reducedMotion ? 320 : 28) * deltaSeconds;
    this.displayedProgress = Math.min(
      gatedTarget,
      this.displayedProgress + maxStep,
    );

    if (elapsed >= this.maximumDuration) {
      this.ready = true;
      this.targetProgress = 100;
      this.displayedProgress = 100;
    }

    if (
      this.ready &&
      elapsed >= this.minimumDuration &&
      this.displayedProgress >= 99
    ) {
      this.displayedProgress = 100;
      this.completed = true;
      this.finish();
      return;
    }

    this.render(this.displayedProgress);
    this.frameId = window.requestAnimationFrame(this.tick);
  };

  private render(progress: number) {
    this.updateCounterForProgress(clamp(progress, 0, 100));
  }

  private randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private cubeTransform(yaw: number) {
    return `translate3d(-50%, -50%, 0) rotateX(0deg) rotateY(${yaw}deg) rotateZ(0deg)`;
  }

  private startCubeMotion() {
    if (!this.square || this.reducedMotion) return;
    const durationSeconds = 3600;
    const targetYaw = this.startYaw + YAW_VELOCITY * durationSeconds;
    this.cubeRotation = this.square.animate(
      [
        { transform: this.cubeTransform(this.startYaw) },
        { transform: this.cubeTransform(targetYaw) },
      ],
      {
        duration: durationSeconds * 1000,
        easing: "linear",
        fill: "forwards",
      },
    );
  }

  private nextYaw(current: number) {
    const step = 90;
    const epsilon = 0.01;
    let target = Math.floor((current - epsilon) / step) * step;
    if (Math.abs(current - target) < epsilon) target -= step;
    return target;
  }

  private beginCubeSettle() {
    if (!this.square) return this.reducedMotion ? 1 : 700;

    if (this.cubeRotation) {
      const seconds = Number(this.cubeRotation.currentTime ?? 0) / 1000;
      this.yaw = this.startYaw + YAW_VELOCITY * seconds;
      this.cubeRotation.cancel();
      this.cubeRotation = null;
    }

    const targetYaw = this.reducedMotion ? 0 : this.nextYaw(this.yaw);
    const distance = Math.abs(targetYaw - this.yaw);
    const naturalDuration = (distance / Math.abs(YAW_VELOCITY)) * 900;
    const settleDuration = this.reducedMotion
      ? 1
      : clamp(naturalDuration, 700, 1500);
    const face = faceForYaw(targetYaw);

    this.root.style.setProperty(
      "--home-intro-cube-settle-start-y",
      `${this.yaw}deg`,
    );
    this.root.style.setProperty(
      "--home-intro-cube-settle-end-y",
      `${targetYaw}deg`,
    );
    this.root.style.setProperty(
      "--home-intro-cube-settle-duration",
      `${settleDuration}ms`,
    );
    this.square
      .querySelector(`.home-intro__cube-face--${face}`)
      ?.classList.add("is-expansion-face");
    this.yaw = targetYaw;
    this.root.classList.add("is-settling");
    return settleDuration;
  }

  private updateCounterForProgress(progress: number) {
    let nextIndex = this.counterStopIndex;
    for (
      let index = this.counterStopIndex + 1;
      index < COUNTER_THRESHOLDS.length;
      index += 1
    ) {
      if (progress < COUNTER_THRESHOLDS[index]) break;
      nextIndex = index;
    }
    if (nextIndex === this.counterStopIndex) return;
    this.counterStopIndex = nextIndex;
    const value = this.counterValues[nextIndex] ?? 0;
    if (nextIndex === 0) {
      this.updateCounterAccessibility(value);
      return;
    }
    this.counterQueue.push(value);
    this.processCounterQueue();
  }

  private async processCounterQueue() {
    if (this.counterRolling || this.destroyed) return;
    const value = this.counterQueue.shift();
    if (value === undefined) {
      this.resolveCounterIdle();
      return;
    }
    this.counterRolling = true;
    this.activeCounterValue = value;
    this.resolveCounterStart(value);
    this.updateCounterAccessibility(value);
    const rollDuration = this.updateCounter(value);
    await this.delay(rollDuration + COUNTER_ROLL_GAP);
    if (this.destroyed) return;
    this.counterRolling = false;
    if (this.counterQueue.length > 0) {
      this.processCounterQueue();
      return;
    }
    this.resolveCounterIdle();
  }

  private updateCounterAccessibility(value: number) {
    this.root.setAttribute("aria-valuenow", String(value));
    this.root.setAttribute("aria-valuetext", `${value}%`);
  }

  private waitForCounterIdle() {
    if (!this.counterRolling && this.counterQueue.length === 0) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      this.counterIdleResolvers.push(resolve);
    });
  }

  private resolveCounterIdle() {
    this.counterIdleResolvers.splice(0).forEach((resolve) => resolve());
  }

  private waitForCounterStart(value: number) {
    if (this.activeCounterValue === value) return Promise.resolve();
    return new Promise<void>((resolve) => {
      this.counterStartResolvers.push({ value, resolve });
    });
  }

  private resolveCounterStart(value: number) {
    const remaining: typeof this.counterStartResolvers = [];
    this.counterStartResolvers.forEach((entry) => {
      if (entry.value === value) entry.resolve();
      else remaining.push(entry);
    });
    this.counterStartResolvers.length = 0;
    this.counterStartResolvers.push(...remaining);
  }

  private updateCounter(value: number) {
    const safeValue = clamp(value, 0, 100);
    const values =
      safeValue === 100
        ? [1, 0, 0]
        : [null, Math.floor(safeValue / 10), safeValue % 10];
    const digitDurations =
      safeValue === 100
        ? FINAL_DIGIT_ROLL_TOTAL_DURATIONS
        : DIGIT_ROLL_TOTAL_DURATIONS;
    let totalDuration = 0;
    this.counter?.classList.toggle("is-three-digit", safeValue === 100);

    values.forEach((nextValue, index) => {
      if (nextValue === null) return;
      const state = this.digits[index];
      if (!state) return;
      if (state.timerId !== undefined) {
        window.clearTimeout(state.timerId);
        state.currentFace.textContent = String(state.value);
        state.cell.classList.remove("is-rolling");
      }
      state.nextFace.textContent = String(nextValue);
      void state.cell.offsetWidth;
      state.cell.style.setProperty(
        "--home-intro-digit-roll-duration",
        `${digitDurations[index] ?? 620}ms`,
      );
      state.cell.classList.add("is-rolling");
      state.value = nextValue;
      const digitDuration = digitDurations[index] ?? 620;
      totalDuration = Math.max(totalDuration, digitDuration);
      state.timerId = window.setTimeout(() => {
        state.currentFace.textContent = String(nextValue);
        state.nextFace.textContent = String(nextValue);
        state.cell.classList.remove("is-rolling");
        state.timerId = undefined;
      }, digitDuration);
    });

    return totalDuration;
  }

  private async trackRealLoading() {
    const tasks: Promise<unknown>[] = [];
    if (document.fonts) tasks.push(document.fonts.ready);
    if (document.readyState !== "complete") {
      tasks.push(
        new Promise((resolve) => {
          window.addEventListener("load", () => resolve(null), { once: true });
        }),
      );
    }

    const total = Math.max(1, tasks.length);
    let completed = 0;
    this.targetProgress = 8;
    const tracked = tasks.map(async (task) => {
      try {
        await task;
      } finally {
        if (this.destroyed) return;
        completed += 1;
        const measured = 8 + (completed / total) * 84;
        this.targetProgress = Math.max(
          this.targetProgress,
          Math.min(92, measured),
        );
      }
    });

    await Promise.race([
      Promise.allSettled(tracked),
      this.delay(this.maximumDuration),
    ]);
    if (this.destroyed) return;
    this.ready = true;
    this.targetProgress = 100;
  }

  private async finish() {
    if (this.finishing || this.destroyed) return;
    this.finishing = true;
    this.completed = true;
    window.cancelAnimationFrame(this.frameId);

    const shouldNotify = () =>
      !this.destroyed && !this.notified && activeController === this;

    try {
      this.render(100);
      await Promise.race([
        this.waitForCounterStart(100),
        this.delay(1200),
      ]);
      if (!shouldNotify()) return;
      const settleDuration = this.beginCubeSettle();
      await Promise.all([
        this.waitForCounterIdle(),
        this.delay(this.reducedMotion ? 40 : settleDuration),
      ]);
      if (!shouldNotify()) return;
      await this.delay(this.reducedMotion ? 80 : 300);
      if (!shouldNotify()) return;
      this.root.classList.add("is-expanding");
      await this.delay(this.reducedMotion ? 140 : 900);
      if (!shouldNotify()) return;
      this.root.classList.add("is-expanded");
      await this.delay(this.reducedMotion ? 1 : 40);
    } finally {
      if (shouldNotify()) this.notifyComplete();
    }
  }

  private notifyComplete() {
    if (this.notified || this.destroyed || activeController !== this) return;
    this.notified = true;
    this.cleanupMotion();
    this.unlockPage();
    this.onComplete();
  }

  private lockPage() {
    if (this.locked) return;
    this.locked = true;
    this.savedHtmlOverflow = document.documentElement.style.overflow;
    this.savedBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    if (this.root.parentElement === document.body) {
      Array.from(document.body.children).forEach((child) => {
        if (!(child instanceof HTMLElement) || child === this.root) return;
        if (child.contains(this.root)) return;
        child.inert = true;
        this.inertElements.push(child);
      });
    }

    this.onWheel = (event) => event.preventDefault();
    this.onKey = (event) => {
      if (
        event.key === " " ||
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "PageDown" ||
        event.key === "PageUp" ||
        event.key === "Home" ||
        event.key === "End"
      ) {
        event.preventDefault();
      }
    };
    window.addEventListener("wheel", this.onWheel, {
      capture: true,
      passive: false,
    });
    window.addEventListener("touchmove", this.onWheel, {
      capture: true,
      passive: false,
    });
    window.addEventListener("keydown", this.onKey, { capture: true });
  }

  private unlockPage() {
    if (!this.locked) return;
    if (activeController !== null && activeController !== this) return;
    this.locked = false;
    document.documentElement.style.overflow = this.savedHtmlOverflow;
    document.body.style.overflow = this.savedBodyOverflow;
    document.documentElement.classList.remove("is-home-intro-loading");
    this.inertElements.forEach((element) => {
      element.inert = false;
    });
    this.inertElements.length = 0;
    if (this.onWheel) {
      window.removeEventListener("wheel", this.onWheel, { capture: true });
      window.removeEventListener("touchmove", this.onWheel, { capture: true });
    }
    if (this.onKey) {
      window.removeEventListener("keydown", this.onKey, { capture: true });
    }
    this.onWheel = null;
    this.onKey = null;
  }

  private cleanupMotion() {
    window.cancelAnimationFrame(this.frameId);
    this.cubeRotation?.cancel();
    this.cubeRotation = null;
    this.digits.forEach((state) => {
      if (state.timerId !== undefined) window.clearTimeout(state.timerId);
    });
    this.resolveCounterIdle();
    this.counterStartResolvers.splice(0).forEach((entry) => entry.resolve());
  }

  private delay(milliseconds: number) {
    return new Promise<void>((resolve) => {
      window.setTimeout(resolve, milliseconds);
    });
  }
}
