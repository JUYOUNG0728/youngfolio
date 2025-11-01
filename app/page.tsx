"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Intro from "@/components/Intro/Intro";
import Background from "@/components/Main/Background";
import useScreenWidth from "@/utils/useScreenWidth";

gsap.registerPlugin(ScrollTrigger);

export default function MainPage() {
  const screenWidth = useScreenWidth();

  const contentRef = useRef<HTMLDivElement | null>(null);

  // const [showContents, setShowContents] = useState(false);
  const [showContents, setShowContents] = useState(true);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      timeline.fromTo(
        contentRef.current,
        { y: "100%" },
        { y: "0%", ease: "power4.out" }
      );
    }, contentRef.current);

    ScrollTrigger.refresh();
    ScrollTrigger.clearScrollMemory();

    return () => {
      ctx.revert();
    };
  }, [screenWidth]);

  // useEffect(() => {
  //   const showContentsTimer = setTimeout(() => {
  //     setShowContents(true);
  //   }, 8500);

  //   return () => {
  //     clearTimeout(showContentsTimer);
  //   };

  return (
    <div
      className={`w-full ${
        showContents ? "overflow-y-auto" : "overflow-y-hidden"
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <Background />
        <Intro />
      </div>
      <div
        style={{
          transition: "opacity 0.5s ease-in-out",
          opacity: showContents ? 1 : 0,
          pointerEvents: showContents ? "auto" : "none",
        }}
      >
        <video
          src="/images/video-youngfolio.mp4"
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="w-full h-full absolute top-0 left-0" ref={contentRef}>
          <div className="bg-white w-full h-full" />
          <div className="bg-black w-full h-full" />
          <div className="bg-white w-full h-full" />
          <div className="bg-black w-full h-full" />
          <div className="bg-white w-full h-full" />
        </div>
      </div>
    </div>
  );
}
