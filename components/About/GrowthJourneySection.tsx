"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { growthPosters, type GrowthPoster } from "@/data/growthJourney";

import styles from "./GrowthJourneySection.module.css";

gsap.registerPlugin(ScrollTrigger);

type MotionKeys = {
  y: readonly [number, number, number, number];
  rotation: readonly [number, number, number, number];
};

const MOTION_KEYS: readonly MotionKeys[] = [
  { y: [10, 30, -10, 10], rotation: [20, -10, 45, -40] },
  { y: [0, 37.5, -10, 15], rotation: [-25, 15, -40, 25] },
  { y: [0, 32.5, -10, 30], rotation: [15, -5, 40, -60] },
  { y: [0, 30, -10, 30], rotation: [-20, 10, -40, 20] },
  { y: [0, 35, -10, 20], rotation: [25, -15, 40, -20] },
];

const STAGGER = 0.1125;

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const amount = clamp01((value - edge0) / (edge1 - edge0));
  return amount * amount * (3 - 2 * amount);
}

function sampleKeys(keys: readonly number[], amount: number) {
  const scaled = amount * 3;
  const index = Math.min(Math.floor(scaled), keys.length - 2);
  return lerp(keys[index], keys[index + 1], scaled - index);
}

type Motion = {
  mobile: boolean;
  speed: number;
  tail: number;
  span: number;
  spread: number;
  peek: number;
  exitGap: number;
  yScale: number;
  rotationScale: number;
};

function getMotion(width: number, count: number): Motion {
  const mobile = width < 768;
  const speed = mobile ? 0.92 : 2;
  const tail = mobile ? 0.38 : 0.3;
  const span = 1 / speed + STAGGER * Math.max(count - 1, 0) + tail;

  return {
    mobile,
    speed,
    tail,
    span,
    spread: mobile ? 3 : 0.08,
    peek: mobile ? 0.55 : 0.38,
    exitGap: mobile ? 28 : 72,
    yScale: mobile ? 0.42 : 0.4,
    rotationScale: mobile ? 0.7 : 1,
  };
}

function spreadOf(spread: number, index: number) {
  return 100 * spread * (index - 2);
}

function trackFor(
  poster: HTMLElement,
  index: number,
  count: number,
  width: number,
  motion: Motion,
) {
  const posterWidth = poster.offsetWidth;
  const posterHeight = poster.offsetHeight;
  const rightEdge = (width + posterWidth) / 2;
  const centerX = (width - posterWidth) / 2 - poster.offsetLeft;
  const spread = spreadOf(motion.spread, index);
  const peek = posterWidth * motion.peek;
  const startX = rightEdge - peek + spread - spreadOf(motion.spread, 0);
  const previous = Math.max(count - 2, 0);
  const exitShift = Math.max(0, spreadOf(motion.spread, previous));
  const clearance = Math.max(posterWidth, posterHeight) * 0.55;
  const endX =
    index === count - 1
      ? centerX
      : -rightEdge - motion.exitGap - exitShift - clearance + spread;

  return { startX, endX, centerX, rightEdge, posterWidth };
}

function entranceOpacity(x: number, rightEdge: number, posterWidth: number) {
  const hiddenAt = rightEdge + posterWidth * 0.4;
  const shownAt = rightEdge - posterWidth * 0.5;
  return clamp01((hiddenAt - x) / Math.max(hiddenAt - shownAt, 1));
}

function PosterFace({ poster }: { poster: GrowthPoster }) {
  return (
    <div className={styles.posterInner}>
      {poster.imageSrc ? (
        <img
          className={styles.media}
          src={poster.imageSrc}
          alt={poster.imageAlt}
          draggable={false}
        />
      ) : (
        <div className={styles.blank} aria-hidden="true" />
      )}
      <div className={styles.copy}>
        <p className={styles.year} data-field="year">
          {poster.year}
        </p>
        <p className={styles.posterTitle} data-field="title">
          {poster.title}
        </p>
        <p className={styles.description} data-field="description">
          {poster.description}
        </p>
      </div>
    </div>
  );
}

export default function GrowthJourneySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const posterRefs = useRef<Array<HTMLElement | null>>([]);
  const [reduceMotion, setReduceMotion] = useState(false);

  const labels = growthPosters
    .map((poster) => poster.title)
    .filter((title) => title.trim().length > 0);

  useLayoutEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setReduceMotion(media.matches);
    syncMotionPreference();
    media.addEventListener("change", syncMotionPreference);

    return () => media.removeEventListener("change", syncMotionPreference);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const posters = posterRefs.current.filter(
      (poster): poster is HTMLElement => poster !== null,
    );
    if (posters.length === 0) return;

    const update = (progress: number) => {
      const width = section.clientWidth || window.innerWidth;
      const motion = getMotion(width, posters.length);
      const timeline = progress * motion.span;

      const lastIndex = posters.length - 1;

      posters.forEach((poster, index) => {
        if (poster.offsetWidth < 1) return;

        const keys = MOTION_KEYS[index % MOTION_KEYS.length];
        const local = clamp01((timeline - STAGGER * index) * motion.speed);
        const { startX, endX, rightEdge, posterWidth } = trackFor(
          poster,
          index,
          posters.length,
          width,
          motion,
        );
        const x = local >= 1 ? endX : lerp(startX, endX, local);
        const isLast = index === lastIndex;
        let yPercent = motion.yScale * sampleKeys(keys.y, local);
        let rotation = motion.rotationScale * sampleKeys(keys.rotation, local);

        if (isLast) {
          const settle = smoothstep(0.78, 1, local);
          yPercent = lerp(yPercent, 0, settle);
          rotation = local >= 1 ? 0 : lerp(rotation, 0, settle);
        }

        const revealed = index === 0 ? 1 : smoothstep(0, 0.03, local);
        const opacity = entranceOpacity(x, rightEdge, posterWidth) * revealed;

        gsap.set(poster, { x, yPercent, rotation, opacity });
        poster.classList.toggle(styles.isCenter, isLast && local >= 1);
      });
    };

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => {
          const width = section.clientWidth || window.innerWidth;
          const span = getMotion(width, posters.length).span;
          const distance = Math.max(section.offsetHeight, window.innerHeight);
          return `+=${distance * 3 * span}`;
        },
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          titleRef.current?.classList.add(styles.isActive);
          listRef.current?.classList.add(styles.isIn);
        },
        onEnterBack: () => {
          titleRef.current?.classList.add(styles.isActive);
          listRef.current?.classList.add(styles.isIn);
        },
        onLeave: () => {
          titleRef.current?.classList.remove(styles.isActive);
          listRef.current?.classList.remove(styles.isIn);
        },
        onLeaveBack: () => {
          titleRef.current?.classList.remove(styles.isActive);
          listRef.current?.classList.remove(styles.isIn);
          posters.forEach((poster) => poster.classList.remove(styles.isCenter));
        },
        onUpdate: (self) => update(self.progress),
        onRefresh: (self) => update(self.progress),
      });

      update(trigger.progress);
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("orientationchange", refresh);

    return () => {
      window.removeEventListener("orientationchange", refresh);
      ctx.revert();
    };
  }, [reduceMotion]);

  const heading = (
    <div className="about-rise w-full text-center">
      <p className="text-xs font-medium tracking-[0.22em] text-gray-30 md:text-sm">
        STILL BECOMING
      </p>
      <h2 className="mt-4 flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[clamp(1.65rem,7.2vw,2.25rem)] font-semibold leading-[0.95] tracking-[-0.04em] md:mt-6 md:flex-nowrap md:gap-x-4 md:text-[3rem] lg:text-[3.75rem]">
        <span className="text-gray-40">MY GROWTH</span>
        <span className="text-white">JOURNEY</span>
      </h2>
    </div>
  );

  if (reduceMotion) {
    return (
      <section className={styles.staticSection} aria-label="성장과정">
        <header className={styles.staticHeader}>
          <h2 className={styles.staticTitle}>{heading}</h2>
        </header>
        <div className={styles.staticGrid}>
          {growthPosters.map((poster) => (
            <article key={poster.id} className={styles.staticPoster}>
              <PosterFace poster={poster} />
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className={styles.section} aria-label="성장과정">
      <h2 ref={titleRef} className={styles.title}>
        {heading}
      </h2>
      {labels.length > 0 ? <div ref={listRef} className={styles.list} /> : null}
      <div className={styles.cards}>
        {growthPosters.map((poster, index) => (
          <article
            key={poster.id}
            ref={(node) => {
              posterRefs.current[index] = node;
            }}
            className={styles.poster}
            aria-label={poster.title || undefined}
          >
            <PosterFace poster={poster} />
          </article>
        ))}
      </div>
    </section>
  );
}
