'use client";';

import Image from "next/image";

import getScreenWidth from "@/utils/useScreenWidth";

export default function SoundButton({
  soundOn,
  setSoundOn,
}: {
  soundOn: boolean;
  setSoundOn: (soundOn: boolean) => void;
}) {
  const screenWidth = getScreenWidth();

  return (
    <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center xl:w-[70px] xl:h-[70px] cursor-pointer">
      <Image
        src={
          soundOn ? "/images/icon-sound-on.png" : "/images/icon-sound-off.png"
        }
        alt="Sound"
        width={screenWidth < 1920 ? 20 : 24}
        height={screenWidth < 1920 ? 20 : 24}
        onClick={() => setSoundOn(!soundOn)}
        priority
      />
    </div>
  );
}
