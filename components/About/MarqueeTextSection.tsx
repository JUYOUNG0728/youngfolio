"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import useScreenWidth from "@/utils/useScreenWidth";

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeTextSection() {
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  const screenWidth = useScreenWidth();

  const marqueeText1 = Array(4).fill("GROWTH MINDSET 🚀");
  const marqueeText2 = Array(4).fill("A COMPLETE CREATOR ✨");

  const marqueeTextStyle = "flex shrink-0 gap-12 whitespace-nowrap";
  const lineStyle =
    "flex items-center gap-12 overflow-hidden text-[1.35rem] font-medium leading-none tracking-[-0.03em] md:text-[1.85rem] lg:text-[2.5rem] xl:text-[3rem]";

  useEffect(() => {
    if (!marquee1Ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const marqueeText = marquee1Ref.current.querySelectorAll(".marquee");

    const ctx = gsap.context(() => {
      gsap.to(marqueeText, {
        xPercent: -100,
        ease: "linear",
        repeat: -1,
        duration: 40,
      });
    }, marquee1Ref);

    return () => ctx.revert();
  }, [screenWidth]);

  useEffect(() => {
    if (!marquee2Ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const marqueeText = marquee2Ref.current.querySelectorAll(".marquee");

    const ctx = gsap.context(() => {
      gsap.set(marqueeText, { xPercent: -100 });
      gsap.to(marqueeText, {
        xPercent: 0,
        ease: "linear",
        repeat: -1,
        duration: 40,
      });
    }, marquee2Ref);

    return () => ctx.revert();
  }, [screenWidth]);

  return (
    <div className="border-y border-white/15">
      <div
        className={`bg-black py-5 text-white md:py-6 ${lineStyle}`}
        ref={marquee1Ref}
      >
        <ul className={`marquee ${marqueeTextStyle}`}>
          {marqueeText1.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
        <ul aria-hidden="true" className={`marquee ${marqueeTextStyle}`}>
          {marqueeText1.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </div>
      <div
        className={`bg-white py-5 text-black md:py-6 ${lineStyle}`}
        ref={marquee2Ref}
      >
        <ul className={`marquee ${marqueeTextStyle}`}>
          {marqueeText2.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
        <ul aria-hidden="true" className={`marquee ${marqueeTextStyle}`}>
          {marqueeText2.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
