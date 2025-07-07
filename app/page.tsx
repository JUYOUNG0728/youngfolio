"use client";

import Intro from "@/components/Intro/Intro";
import Background from "@/components/Intro/Background";
import ProjectCard from "@/components/Main/ProjectCard";

import { useEffect, useState } from "react";

export default function MainPage() {
  const [showContents, setShowContents] = useState(false);

  const project = {
    name: "제목이 들어갑니다.",
    description:
      "간단한 설명이 들어갑니다. 간단한 설명이 들어갑니다. 간단한 설명이 들어갑니다. 간단한 설명이 들어갑니다.",
    image: "none",
  };

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
        }}
      >
        <div className="h-full w-full absolute top-0 items-center flex gap-6 justify-center xl:gap-8">
          <ProjectCard project={project} />
          <ProjectCard project={project} />
          <ProjectCard project={project} focus={true} />
          <ProjectCard project={project} />
          <ProjectCard project={project} />
        </div>
      </div>
    </div>
  );
}
