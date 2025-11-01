"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Intro from "@/components/Intro/Intro";
import Background from "@/components/Main/Background";
import PhotoList from "@/components/Main/PhotoList";

export default function MainPage() {
  // const [showContents, setShowContents] = useState(false);
  const [showContents, setShowContents] = useState(true);

  const photos = [
    {
      image: "/images/img-photo1.jpg",
    },
    {
      image: "/images/img-photo2.jpg",
    },
    {
      image: "/images/img-photo3.jpg",
    },
    {
      image: "/images/img-photo4.jpg",
    },
  ];

  // useEffect(() => {
  //   const showContentsTimer = setTimeout(() => {
  //     setShowContents(true);
  //   }, 8500);

  //   return () => {
  //     clearTimeout(showContentsTimer);
  //   };
  // }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.scrollY;
  //     if (scrollTop > window.innerHeight / 2) {
  //       setWhiteMode(true);
  //     } else {
  //       setWhiteMode(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [showContents]);

  return (
    <div
      className={`w-screen h-screen relative overflow-x-hidden ${
        showContents ? "overflow-y-auto" : "overflow-y-hidden h-screen"
      }`}
    >
      <div className="absolute top-0 left-0">
        <Background />
        {/* <Intro /> */}
      </div>
      <div
        style={{
          transition: "opacity 0.5s ease-in-out",
          opacity: showContents ? 1 : 0,
          pointerEvents: showContents ? "auto" : "none",
        }}
        className="relative w-full h-full"
      >
        <div
          className="relative w-full h-full pt-32 px-[70px] xl:px-[100px] xl:pt-44"
          style={{
            backgroundColor: "rgba(5, 30, 20, 0.5)",
          }}
        >
          <div className="w-full flex flex-col items-center">
            <span className="body2 text-white mb-10 xl:mb-12">
              2025 : Imagine beyond words
            </span>
            <h1 className="h2 text-white !font-semibold text-center mb-14 xl:mb-16">
              WELCOME TO
              <br />
              YOUNG'S PORTFOLIO
            </h1>
            <button className="px-6 py-2 bg-white rounded-full text-black body3 font-semibold flex items-center justify-center gap-2.5 xl:gap-3">
              View about me
              <Image
                src="/images/icon-arrow-down.png"
                alt="화살표"
                width={28}
                height={28}
                className="-rotate-90"
              />
            </button>
          </div>
          <div className="w-[calc(100%-140px)] h-[32vh] absolute bottom-20 left-1/2 -translate-x-1/2 xl:h-[40vh]">
            <PhotoList photos={photos} />
          </div>
        </div>
      </div>
    </div>
  );
}
