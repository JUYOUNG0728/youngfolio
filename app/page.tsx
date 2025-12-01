"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ProjectSection from "@/components/Main/ProjectSection";

import Arrow from "@/components/Common/Arrow";

export default function Page() {
  const projectRef = useRef<HTMLElement | null>(null);

  return (
    <div className="w-full">
      <section className="w-full h-screen text-black bg-white pt-[120px] xl:pt-[150px]">
        <div className="h-full flex relative border-t border-gray-30">
          <div className="w-1/2 h-full flex flex-col justify-between py-[40px] px-[60px] md:px-[140px] md:py-[80px] xl:py-[100px]">
            <div className="absolute bottom-[5vh] right-[51%] flex flex-col items-center animate-bounce gap-9 lg:gap-11 xl:gap-14">
              <div className="-rotate-90">
                <span className="font-semibold body5">SCROLL TO</span>
              </div>
              <Image
                src="/images/icon-mouse-scroll.png"
                alt="마우스 스크롤"
                width={16}
                height={16}
              />
            </div>
            <h1 className="h1 leading-[1.1]">
              BEYOND
              <br />
              LIMITS
            </h1>
            <p className="body3 font-medium ">
              한계를 넘는 디자이너 최주영입니다.
              <br />
              디자이너의 감각, 개발자의 논리, 기획자의 구조를 함께 다루며,
              <br />
              경계를 넘는 경험과 더 나은 완성도를 추구하고 있습니다.
            </p>
          </div>
          <div className="w-1/2 h-full relative">
            <Image
              src="/images/img-visual.jpg"
              alt="비주얼 이미지"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <section className="w-full sticky top-0 text-white py-[80px] md:py-[160px] xl:py-[200px]">
        <Image
          src="/images/img-projects-background.jpg"
          alt="배경 이미지"
          fill
          className="object-cover opacity-10 z-[-1]"
        />
        <div className="w-full flex gap-[12vw] items-center justify-center">
          <div className="w-[12vw] h-[12vw] relative -rotate-90">
            <Image
              src="/images/img-introduce-spin.png"
              alt="소개 이미지"
              fill
              className="object-cover animate-spin"
              style={{ animationDuration: "10s" }}
            />
            <Arrow
              width={24}
              height={24}
              fill="#fff"
              className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
            />
          </div>
          <div className="flex flex-col gap-16">
            <p className="body1 font-medium">
              Experiences beyond technology,
              <br />
              resonating with the heart.
            </p>
            <p className="body3">
              기술과 감성을 넘어, 마음에 닿는 경험을 만듭니다.
            </p>
          </div>
        </div>
        {/* <div className="mt-60 px-[60px] md:px-[140px]">
          <ProjectSection projectRef={projectRef} />
        </div> */}
      </section>
    </div>
  );
}
