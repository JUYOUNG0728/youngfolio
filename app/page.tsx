"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Intro from "@/components/Intro/Intro";
import Background from "@/components/Main/Background";
import PhotoList from "@/components/Main/PhotoList";
import useScreenWidth from "@/utils/useScreenWidth";

export default function MainPage() {
  const screenWidth = useScreenWidth();

  // const [showContents, setShowContents] = useState(false);
  const [showContents, setShowContents] = useState(true);
  // const [zoomPhoto, setZoomPhoto] = useState(false);

  const photos = [
    "/images/img-photo1.jpg",
    "/images/img-photo2.jpg",
    "/images/img-photo3.jpg",
    "/images/img-photo4.jpg",
  ];

  const iconSize = screenWidth > 1920 ? 200 : 160;

  // useEffect(() => {
  //   const showContentsTimer = setTimeout(() => {
  //     setShowContents(true);
  //   }, 8500);

  //   return () => {
  //     clearTimeout(showContentsTimer);
  //   };

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
  //       setZoomPhoto(true);
  //     } else {
  //       setZoomPhoto(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [showContents]);

  return (
    <div
      className={`w-full relative overflow-x-hidden ${
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
        className="relative w-full"
      >
        <div
          className="relative w-full h-screen pt-32 px-[70px] xl:px-[100px] xl:pt-44"
          style={{
            backgroundColor: "rgba(5, 30, 20, 0.5)",
          }}
        >
          <div className="h-full flex flex-col items-center">
            <span className="body2 text-white mb-10 xl:mb-12">
              2025 : Imagine beyond words
            </span>
            <h1 className="h2 text-white !font-semibold text-center">
              YOUNG'S PORTFOLIO
            </h1>
            <div className="w-[80vw] h-full mt-16 bg-white overflow-hidden">
              <video
                src="/images/video-youngfolio.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="h-screen bg-black"></div>
      </div>
    </div>
  );
}
