"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import useScreenWidth from "@/utils/useScreenWidth";

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeTextSection() {
  const marquee1Ref = useRef<HTMLHeadingElement>(null);
  const marquee2Ref = useRef<HTMLHeadingElement>(null);

  const screenWidth = useScreenWidth();

  const marqueeText1 = Array(4).fill("GROWTH MINDSET 🚀");
  const marqueeText2 = Array(4).fill("A COMPLETE CREATOR ✨");

  const marqueeTextStyle = "flex gap-12 whitespace-nowrap marquee";
  const containerStyle =
    "overflow-x-hidden relative h2 !font-medium flex gap-12 py-8";

  useEffect(() => {
    if (!marquee1Ref.current) return;

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
    <div>
      <span
        className={`w-screen bg-white text-blue-30 ${containerStyle}`}
        ref={marquee1Ref}
      >
        <ul className={marqueeTextStyle}>
          {marqueeText1.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
        <ul aria-hidden="true" className={marqueeTextStyle}>
          {marqueeText1.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </span>
      <span
        className={`w-screen bg-blue-30 text-white ${containerStyle}`}
        ref={marquee2Ref}
      >
        <ul className={marqueeTextStyle}>
          {marqueeText2.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
        <ul aria-hidden="true" className={marqueeTextStyle}>
          {marqueeText2.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </span>
    </div>
  );
}
