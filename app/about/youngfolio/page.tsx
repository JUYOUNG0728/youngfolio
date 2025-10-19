"use client";

import useScreenWidth from "@/utils/useScreenWidth";

export default function YoungFolioPage() {
  const screenWidth = useScreenWidth();

  const getNameFontSize = () => {
    const baseSize = (screenWidth - 140) / 7.45;
    const currentWidth = screenWidth - 1;
    const fontSize = baseSize * ((currentWidth / screenWidth) * 10 - 9);

    return `${fontSize}px`;
  };
  return (
    <div
      className="w-full h-full"
      style={{
        background: "linear-gradient(0deg, #0f0c29, #302b63, #24243e)",
      }}
    >
      <h1
        className="font-bold text-white whitespace-nowrap !tracking-normal ml-[-5px] lg:ml-[-8px]"
        style={{ fontSize: `${getNameFontSize()}` }}
      >
        YOUNGFOLIO
      </h1>
    </div>
  );
}
