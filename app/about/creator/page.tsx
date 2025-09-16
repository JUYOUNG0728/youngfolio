"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import getScreenWidth from "@/utils/useScreenWidth";
import CoverSection from "@/components/Creator/CoverSection";
import IntroduceSection from "@/components/Creator/IntroduceSection";

gsap.registerPlugin(ScrollTrigger);

export default function CreatorPage() {
  const grayDivRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    ScrollTrigger.refresh();
  };

  useEffect(() => {
    if (!grayDivRef.current) return;

    gsap.fromTo(
      grayDivRef.current,
      { y: "0%" },
      {
        y: "-100%",
        scrollTrigger: {
          trigger: grayDivRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        ease: "power4.out",
      }
    );
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      ScrollTrigger.killAll();
      window.removeEventListener("resize", handleResize);
    };
  }, [getScreenWidth]);

  return (
    <div className="w-full h-full">
      <CoverSection />
      <IntroduceSection grayDivRef={grayDivRef} />
    </div>
  );
}
