"use client";

import { useLayoutEffect, useState } from "react";

import Logo from "@/components/Common/Logo";
import { HOME_INTRO_SESSION_KEY } from "@/components/Main/homeIntroBoot";
import { HomeIntroController } from "@/components/Main/homeIntroController";

const HERO = {
  beyond: "BEYOND",
  ordinary: "ORDINARY",
  step: "WITH EVERY STEP FORWARD,",
  evolveLine: "I EVOLVE, INNOVATE, AND CREATE SOMETHING NEW.",
  dare: "DARE TO",
  evolve: "EVOLVE",
} as const;

function shouldPlayIntro() {
  if (typeof window === "undefined") return true;
  try {
    if (window.sessionStorage.getItem(HOME_INTRO_SESSION_KEY) === "1") {
      return false;
    }
  } catch {
    return true;
  }
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return path === "/";
}

function PosterText({
  text,
  x,
  y,
  anchor = "start",
  small = false,
}: {
  text: string;
  x: number;
  y: number;
  anchor?: "start" | "end";
  small?: boolean;
}) {
  return (
    <text
      className={
        small
          ? "home-intro__cube-poster-text home-intro__cube-poster-text--small"
          : "home-intro__cube-poster-text"
      }
      x={x}
      y={y}
      fontSize={small ? 10.5 : 28}
      dominantBaseline="middle"
      textAnchor={anchor}
      textLength={small ? 192 : undefined}
      lengthAdjust={small ? "spacingAndGlyphs" : undefined}
    >
      {text}
    </text>
  );
}

function Poster({ children }: { children: React.ReactNode }) {
  return (
    <svg
      className="home-intro__cube-poster"
      viewBox="0 0 220 220"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function Digit({ place }: { place: "hundreds" | "tens" | "ones" }) {
  return (
    <span
      className={`home-intro__digit home-intro__digit--${place}`}
      data-home-intro-digit={place}
    >
      <span className="home-intro__digit-wheel">
        <span
          className="home-intro__digit-face home-intro__digit-face--current"
          data-home-intro-digit-current
        >
          0
        </span>
        <span
          className="home-intro__digit-face home-intro__digit-face--next"
          data-home-intro-digit-next
        >
          0
        </span>
      </span>
    </span>
  );
}

export default function HomeIntro() {
  const [playing, setPlaying] = useState(true);

  useLayoutEffect(() => {
    const root = document.getElementById("home-intro");
    if (!root || !shouldPlayIntro()) {
      setPlaying(false);
      document.documentElement.classList.remove("is-home-intro-loading");
      return;
    }

    let alive = true;
    const controller = new HomeIntroController(root, () => {
      if (!alive) return;
      try {
        window.sessionStorage.setItem(HOME_INTRO_SESSION_KEY, "1");
      } catch {
        // Storage can be blocked. The overlay still closes for this visit.
      }
      document.documentElement.classList.add("home-intro-skip");
      document.documentElement.classList.remove("is-home-intro-loading");
      setPlaying(false);
    });
    controller.start();

    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      let seen = false;
      try {
        seen = window.sessionStorage.getItem(HOME_INTRO_SESSION_KEY) === "1";
      } catch {
        seen = false;
      }
      if (!seen) return;
      alive = false;
      controller.destroy();
      document.documentElement.classList.remove("is-home-intro-loading");
      setPlaying(false);
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      alive = false;
      controller.destroy();
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  if (!playing) return null;

  return (
    <div
      id="home-intro"
      className="home-intro"
      role="progressbar"
      aria-label="Loading page"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      aria-valuetext="0%"
    >
      <div className="home-intro__square-track" aria-hidden="true">
        <div className="home-intro__square" data-home-intro-square>
          <span className="home-intro__cube-face home-intro__cube-face--front">
            <Poster>
              <PosterText text={HERO.beyond} x={14} y={32} />
              <PosterText text={HERO.ordinary} x={14} y={188} />
            </Poster>
          </span>
          <span className="home-intro__cube-face home-intro__cube-face--back">
            <Poster>
              <PosterText text={HERO.step} x={14} y={32} small />
              <PosterText text={HERO.evolveLine} x={14} y={52} small />
              <PosterText text={HERO.dare} x={206} y={168} anchor="end" />
              <PosterText text={HERO.evolve} x={206} y={198} anchor="end" />
            </Poster>
          </span>
          <span className="home-intro__cube-face home-intro__cube-face--right">
            <Poster>
              <PosterText text={HERO.beyond} x={14} y={32} />
              <PosterText text={HERO.ordinary} x={14} y={62} />
              <PosterText text={HERO.dare} x={206} y={168} anchor="end" />
              <PosterText text={HERO.evolve} x={206} y={198} anchor="end" />
            </Poster>
          </span>
          <span className="home-intro__cube-face home-intro__cube-face--left">
            <span className="home-intro__logo">
              <Logo fill="#ffffff" width={150} height={24} />
            </span>
          </span>
          <span className="home-intro__cube-face home-intro__cube-face--top" />
          <span className="home-intro__cube-face home-intro__cube-face--bottom" />
        </div>
      </div>

      <p className="home-intro__label" aria-hidden="true">
        Loading
        <span className="home-intro__loading-dots">
          <span className="home-intro__loading-dot">.</span>
          <span className="home-intro__loading-dot">.</span>
          <span className="home-intro__loading-dot">.</span>
        </span>
      </p>

      <div
        className="home-intro__counter"
        data-home-intro-counter
        aria-hidden="true"
      >
        <Digit place="hundreds" />
        <Digit place="tens" />
        <Digit place="ones" />
      </div>
    </div>
  );
}
