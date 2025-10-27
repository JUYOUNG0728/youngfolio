"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import useScreenWidth from "@/utils/useScreenWidth";
import CoverSection from "@/components/Creator/CoverSection";
import IntroduceSection from "@/components/Creator/IntroduceSection";

gsap.registerPlugin(ScrollTrigger);

export default function CreatorPage() {
  const screenWidth = useScreenWidth();
  const grayDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!grayDivRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: grayDivRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      timeline.fromTo(
        grayDivRef.current,
        { y: "100%" },
        { y: "0%", ease: "power4.out" }
      );
    }, grayDivRef);

    ScrollTrigger.refresh();
    ScrollTrigger.clearScrollMemory();

    return () => {
      ctx.revert();
    };
  }, [screenWidth]);

  return (
    <div className="w-full h-full">
      <CoverSection />
      <IntroduceSection grayDivRef={grayDivRef} />
    </div>
  );
}
