"use client";

import { useEffect, useRef, useState } from "react";
import SoundButton from "@/components/Main/SoundButton";

export default function BgmPlayer() {
  const [soundOn, setSoundOn] = useState(false);

  const playerRef = useRef<any>(null);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("bgm-player", {
        height: "0",
        width: "0",
        videoId: "waz0YopWY28",
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: "waz0YopWY28",
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
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
      <SoundButton soundOn={soundOn} setSoundOn={setSoundOn} />
      <div id="bgm-player" className="hidden" />
    </div>
  );
}
