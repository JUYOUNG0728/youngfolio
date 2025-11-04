"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Intro from "@/components/Intro/Intro";
import Background from "@/components/Main/Background";
import useScreenWidth from "@/utils/useScreenWidth";
import Scene from "@/components/Main/Models/Scene";
import Arrow from "@/components/Common/Arrow";

gsap.registerPlugin(ScrollTrigger);

export default function MainPage() {
  const screenWidth = useScreenWidth();

  const [showContents, setShowContents] = useState(true);
  const [whiteMode, setWhiteMode] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const iconScrollArrowSize = screenWidth > 1920 ? 52 : 36;

  useEffect(() => {
    if (!showContents) return;
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
  }, [screenWidth, showContents]);

  // useEffect(() => {
  //   const showContentsTimer = setTimeout(() => {
  //     setShowContents(true);
  //   }, 8500);

  //   return () => {
  //     clearTimeout(showContentsTimer);
  //   };
  // }, []);)

  useEffect(() => {
    if (!scrollRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: scrollRef.current,
      start: "top center",
      onEnter: () => setWhiteMode(true),
      onLeaveBack: () => setWhiteMode(false),
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      className={`w-full ${
        showContents ? "overflow-y-auto" : "overflow-y-hidden h-full"
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <Background />
        {/* <Intro /> */}
      </div>
      <div
        style={{
          transition: "opacity 0.5s ease-in-out",
          opacity: showContents ? 1 : 0,
          pointerEvents: showContents ? "auto" : "none",
        }}
      >
        {showContents && (
          <>
            <div className="absolute top-0 left-0 w-full h-full pt-28 px-[70px] xl:px-[100px] xl:pt-32">
              <video
                src="/images/video-youngfolio.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full absolute bottom-0 left-0 object-cover object-top"
                ref={videoRef}
              />
              <div
                className="w-full h-[70vh] absolute top-0 left-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 40%, rgba(0, 0, 0, 0) 100%)",
                }}
              />
              <div className="w-full flex flex-col items-center relative">
                <span className="body2 text-white mb-5 xl:mb-7">
                  2025 : Imagine beyond words
                </span>
                <h1 className="h2 text-white !font-semibold text-center mb-10 xl:mb-12">
                  YOUNG'S PORTFOLIO
                </h1>
                <button
                  className="px-8 py-2.5 bg-white rounded-full text-black body3 font-semibold flex items-center justify-center gap-3 xl:gap-4 hover:scale-110"
                  onClick={() => {
                    window.location.href = "/about";
                  }}
                  style={{ transition: "transform 0.3s ease-in-out" }}
                >
                  View about
                  <Image
                    src="/images/icon-arrow-down.png"
                    alt="화살표"
                    width={28}
                    height={28}
                    className="-rotate-90"
                  />
                </button>
              </div>
            </div>
            <div
              className="absolute top-0 left-0 w-full h-full"
              ref={contentRef}
            >
              <div
                className={`${
                  whiteMode ? "bg-white" : "bg-black"
                } w-full h-[300vh]`}
                style={{ transition: "background-color 0.5s ease-in-out" }}
              >
                <div className="w-full h-[200vh]">
                  <div className="w-full h-screen flex flex-col items-center justify-center sticky top-0">
                    <p
                      className={`absolute px-12 top-20 left-0 body1 font-semibold ${
                        whiteMode ? "text-outline" : "text-outline-white"
                      } text-justify xl:top-16`}
                    >
                      BLENDING TECHNOLOGY AND EMOTION, CREATING EXPERIENCES THAT
                      GO BEYOND WORDS AND RESONATE WITH THE HEART.
                    </p>
                    <p
                      className={`body2 ${
                        whiteMode ? "text-black font-medium" : "text-white"
                      } absolute bottom-56 text-center xl:bottom-80`}
                    >
                      현실과 감성의 경계를 넘나들며 마음에 닿는 경험과 공간을
                      디자인합니다.
                      <br />
                      감성과 기술로 연결된 공간을 그리는 디자이너, 최주영입니다.
                    </p>
                    <div className="w-[40vw] h-[40vh]">
                      <Scene />
                    </div>
                    <div
                      ref={scrollRef}
                      className="absolute bottom-28 xl:bottom-40 "
                    >
                      <Arrow
                        width={iconScrollArrowSize}
                        height={iconScrollArrowSize}
                        fill={whiteMode ? "#000000" : "#FFFFFF"}
                        className="animate-bounce"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full h-full" />
              </div>
              <div className="bg-black w-full h-full" />
              <div className="bg-white w-full h-full" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
