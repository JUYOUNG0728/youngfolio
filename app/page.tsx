"use client";

import { useEffect, useState } from "react";

import Intro from "@/components/Intro/Intro";
import Background from "@/components/Intro/Background";
import BgmPlayer from "@/components/Main/BgmPlayer";
import ProjectList from "@/components/Main/ProjectList";

export default function MainPage() {
  const [showContents, setShowContents] = useState(false);

  const project = {
    name: "제목이 들어갑니다.",
    description:
      "간단한 설명이 들어갑니다. 간단한 설명이 들어갑니다. 간단한 설명이 들어갑니다.",
    image: "none",
  };

  const projects = Array(5).fill(project);

  useEffect(() => {
    const showContentsTimer = setTimeout(() => {
      setShowContents(true);
    }, 8500);

    return () => {
      clearTimeout(showContentsTimer);
    };
  }, []);

  return (
    <div className="h-full">
      <Background />
      <Intro />
      <div
        style={{
          transition: "opacity 0.5s ease-in-out",
          opacity: showContents ? 1 : 0,
          pointerEvents: showContents ? "auto" : "none",
        }}
      >
        <p className="text-center body4 absolute top-[48px] left-1/2 -translate-x-1/2 text-white font-medium xl:top-[54px]">
          2025 : Branding Myself Beyond Words
        </p>
        <ProjectList projects={projects} />
        <BgmPlayer />
      </div>
    </div>
  );
}
