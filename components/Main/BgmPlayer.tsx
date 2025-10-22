"use client";

import { useEffect, useRef, useState } from "react";
import SoundButton from "@/components/Main/SoundButton";

export default function BgmPlayer() {
  const [soundOn, setSoundOn] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  const playerRef = useRef<any>(null);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("bgm-player", {
        videoId: "LlN8MPS7KQs",
        playerVars: {
          autoplay: 0,
          start: 4,
          loop: 1,
          playlist: "LlN8MPS7KQs",
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

  const onMouseEnter = () => {
    setMouseOver(true);
    console.log("Mouse entered");
  };
  const onMouseLeave = () => {
    setMouseOver(false);
    console.log("Mouse left");
  };

  return (
    <div
      className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex items-end justify-center ${
        mouseOver && "h-[100px] w-[180px]"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <SoundButton soundOn={soundOn} setSoundOn={setSoundOn} />
      <div
        className={`absolute bottom-24 left-1/2 -translate-x-1/2 ${
          mouseOver ? "block" : "hidden"
        }`}
      >
        <div id="bgm-player" className="w-[200px] h-[200px]" />
      </div>
    </div>
  );
}
