"use client";

import { useEffect, useState, useRef } from "react";

import Intro from "@/components/Intro/Intro";
import Background from "@/components/Intro/Background";
import ProjectCard from "@/components/Main/ProjectCard";
import SoundButton from "@/components/Main/SoundButton";

export default function MainPage() {
  const [showContents, setShowContents] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [focusProject, setFocusProject] = useState<number>(2);

  const playerRef = useRef<any>(null);
  const dragStartX = useRef<number | null>(null);

  const project = {
    name: "제목이 들어갑니다.",
    description:
      "간단한 설명이 들어갑니다. 간단한 설명이 들어갑니다. 간단한 설명이 들어갑니다.",
    image: "none",
  };

  const projects = Array(5).fill(project);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;

    const deltaX = e.clientX - dragStartX.current;

    const threshold = 240;

    if (deltaX > threshold) {
      setFocusProject((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
      dragStartX.current = e.clientX;
    } else if (deltaX < -threshold) {
      setFocusProject((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
      dragStartX.current = e.clientX;
    }
  };

  const onMouseUp = () => {
    dragStartX.current = null;
  };

  useEffect(() => {
    const showContentsTimer = setTimeout(() => {
      setShowContents(true);
    }, 8500);

    return () => {
      clearTimeout(showContentsTimer);
    };
  }, []);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("bgm-player", {
        height: "0",
        width: "0",
        videoId: "LlN8MPS7KQs",
        playerVars: {
          autoplay: 0,
          start: 8,
          loop: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(30);
          },
        },
      });
    };
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (player) {
      if (soundOn) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
  }, [soundOn]);

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
        <div className="h-full w-full absolute top-0 items-center flex justify-between p-[70px]">
          {projects.map((_, index) => (
            <ProjectCard
              key={index}
              project={project}
              focus={focusProject === index}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
            />
          ))}
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <SoundButton soundOn={soundOn} setSoundOn={setSoundOn} />
          <div id="bgm-player" className="hidden" />
        </div>
      </div>
    </div>
  );
}
