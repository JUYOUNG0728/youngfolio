"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

const HeroGlassY = dynamic(() => import("@/components/Main/HeroGlassY"), {
  ssr: false,
});

type VisualSectionProps = {
  sectionStyle: {
    horizontalPaddingStyle: string;
    verticalPaddingStyle: string;
  };
};

export default function VisualSection(_props: VisualSectionProps) {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-[#111] text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <h2
          className="absolute left-5 top-20 md:left-[30px] md:top-[100px] lg:left-5 lg:top-[120px]"
          aria-label="Everyday objects redefined by Makers"
        >
          <span className="block" data-hero-refract>
            <span
              data-hero-refract-text
              className="block whitespace-nowrap font-normal leading-[0.9] tracking-[-0.03em] text-[clamp(48px,8.33vw,160px)]"
            >
              EVERYDAY
            </span>
          </span>
          <span className="block" data-hero-refract>
            <span
              data-hero-refract-text
              className="block whitespace-nowrap font-normal leading-[0.9] tracking-[-0.03em] text-[clamp(48px,8.33vw,160px)]"
            >
              OBJECTS
            </span>
          </span>
        </h2>

        <div className="absolute bottom-5 right-5 flex max-w-[min(858px,52vw)] flex-col items-end gap-4 text-right md:bottom-6 md:right-[30px] lg:right-5">
          <p
            className="max-w-[376px] text-[clamp(12px,0.94vw,18px)] font-normal leading-[1.4]"
            aria-label="A collective of Makers creating categories the world has never seen"
          >
            <span className="block" data-hero-refract>
              <span data-hero-refract-text className="block whitespace-nowrap">
                A COLLECTIVE OF MAKERS CREATING
              </span>
            </span>
            <span className="block" data-hero-refract>
              <span data-hero-refract-text className="block whitespace-nowrap">
                CATEGORIES THE WORLD HAS NEVER SEEN
              </span>
            </span>
          </p>
          <div className="whitespace-nowrap font-normal leading-[0.9] tracking-[-0.03em] text-[clamp(48px,8.33vw,160px)]">
            <span className="block" data-hero-refract>
              <span data-hero-refract-text className="block">
                REDEFINED
              </span>
            </span>
            <span className="block" data-hero-refract>
              <span data-hero-refract-text className="block">
                BY MAKERS
              </span>
            </span>
          </div>
        </div>
      </div>

      <HeroGlassY heroRef={heroRef} />

      <button
        type="button"
        className="absolute bottom-5 left-5 z-[3] text-white md:bottom-8 md:left-[30px] lg:left-5"
        aria-label="Scroll down"
        onClick={() => {
          heroRef.current?.parentElement?.nextElementSibling?.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M54.9998 80.86L85.3548 50.505L92.4248 57.575L49.9998 100L46.4648 96.465L7.57481 57.575L14.6448 50.505L44.9998 80.86L44.9998 6.5036e-06L54.9998 7.37783e-06L54.9998 80.86Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </section>
  );
}
