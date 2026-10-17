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

function sampleKeys(keys: readonly number[], amount: number) {
  const scaled = amount * 3;
  const index = Math.min(Math.floor(scaled), keys.length - 2);
  return lerp(keys[index], keys[index + 1], scaled - index);
}

function getMotion(width: number) {
  const mobile = width < 768;
  const speed = mobile ? 1.6 : 2;
  const boost = mobile ? 0.2 : 0;
  const tail = mobile ? 0.125 : 0.05;
  const span = 1 / speed - boost + STAGGER * (growthPosters.length - 1) + tail;

  return {
    mobile,
    speed,
    boost,
    span,
    startScale: mobile ? 3 : 0.7,
    endScale: mobile ? -1.5 : -1,
    spread: mobile ? 3 : 0.08,
    distanceBase: mobile ? width : 1300,
  };
}

function Parenthesis({ flipped = false }: { flipped?: boolean }) {
  return (
    <svg
      className={
        flipped ? `${styles.paren} ${styles.parenRight}` : styles.paren
      }
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="134"
      viewBox="0 0 22 134"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M19.871 134C7.94839 117.891 0 91.3766 0 67C0 42.6234 7.94839 16.1085 19.871 0H22C10.0774 16.1085 2.12903 42.6234 2.12903 67C2.12903 91.3766 10.0774 117.891 22 134H19.871Z"
        fill="#333333"
      />
    </svg>
  );
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
      const motion = getMotion(window.innerWidth);
      const timeline = progress * motion.span;

      posters.forEach((poster, index) => {
        const keys = MOTION_KEYS[index % MOTION_KEYS.length];
        const local = clamp01(
          (timeline + motion.boost - STAGGER * index) * motion.speed,
        );
        const spread = 100 * motion.spread * (index - 2);
        const startX = motion.distanceBase * motion.startScale + spread;
        const endX = motion.distanceBase * motion.endScale + spread;

        if (local <= 0) {
          gsap.set(poster, {
            x: startX,
            yPercent: 1.15 * keys.y[0],
            rotation: keys.rotation[0],
            opacity: 0,
          });
          poster.classList.remove(styles.isCenter);
          return;
        }

        const x = lerp(startX, endX, local);
        gsap.set(poster, {
          x,
          yPercent: 1.15 * sampleKeys(keys.y, local),
          rotation: sampleKeys(keys.rotation, local),
          opacity: 1,
        });
        poster.classList.toggle(styles.isCenter, x <= 120);
      });
    };

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () =>
          `+=${section.offsetHeight * 3 * getMotion(window.innerWidth).span}`,
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

    return () => ctx.revert();
  }, [reduceMotion]);

  const heading = (
    <div className="about-rise w-full text-center">
      <p className="text-xs font-medium tracking-[0.22em] text-gray-30 md:text-sm">
        STILL BECOMING
      </p>
      <h2 className="flex gap-2 mt-5 text-[2.25rem] font-semibold leading-[0.95] tracking-[-0.04em] md:mt-6 md:text-[3rem] md:gap-4 lg:text-[3.75rem]">
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
