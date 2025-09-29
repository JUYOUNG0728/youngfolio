"use client";

import { useRef } from "react";

import Head from "@/components/Youngfolio/Head";

export default function YoungFolioPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  Head({ containerRef });

  return (
    <div className="bg-gray-10 w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute h2 left-[70px] bottom-[30px]">
        <p className="h4 mb-[-6px]">다양한 관점에서 만들어지는 다각도의 산물</p>
        <h1 className="h2 ml-[-10px]">PERSPECTIVE</h1>
      </div>
      <div className="absolute right-[70px] top-36 border border-gray-30 w-[400px] h-[240px] rounded-2xl xl:w-[520px] xl:h-[340px]" />
    </div>
  );
}
