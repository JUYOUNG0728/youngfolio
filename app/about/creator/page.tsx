"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SnsItems from "@/components/SnsItems";
import getScreenWidth from "@/utils/useScreenWidth";

gsap.registerPlugin(ScrollTrigger);

export default function CreatorPage() {
  const grayDivRef = useRef<HTMLDivElement>(null);

  const screenWidth = getScreenWidth();

  const getNameFontSize = () => {
    const baseSize = (screenWidth - 140) / 7.65;
    const currentWidth = screenWidth - 1;
    const fontSize = baseSize * ((currentWidth / screenWidth) * 10 - 9);

    return `${fontSize}px`;
  };

  const creatorImageSize =
    screenWidth < 1920
      ? { width: 1200, height: 1644 }
      : { width: 1640, height: 2248 };

  useEffect(() => {
    if (!grayDivRef.current) return;

    gsap.fromTo(
      grayDivRef.current,
      { y: "0%" },
      {
        y: "-100%",
        scrollTrigger: {
          trigger: grayDivRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        ease: "power4.out",
      }
    );
  }, []);

  return (
    <div className="w-full h-full">
      <div className="bg-gray-50 w-full h-[calc(100vh+160px)] flex justify-center text-white relative overflow-hidden">
        <div className="relative w-[calc(100%-140px)] h-full top-8 xl:top-6">
          <h1
            className="font-extrabold whitespace-nowrap ml-[-10px]"
            style={{ fontSize: `${getNameFontSize()}` }}
          >
            CHOI JUYOUNG
          </h1>
          <h3 className="h4 mt-[-10px] text-right">
            Igniting value in design!
          </h3>
          <div className="body3 absolute w-full bottom-[280px] flex justify-between items-end xl:bottom-[300px]">
            <div className="flex justify-end flex-col gap-6 xl:gap-8">
              <h3 className="h4">More than just visuals.</h3>
              <p>
                디자인은 단순한 시각적 아름다움이 아닌,
                <br />
                문제를 해결하고 가치를 전달하는 수단이라고 생각합니다.
                <br />
                사용자의 입장에서 생각하고,
                <br />더 나은 경험을 만들기 위한 끊임없는 고민이 필요합니다.
              </p>
            </div>
            <SnsItems />
          </div>
        </div>
        <Image
          src="/images/img-creator.png"
          alt="Creator"
          width={creatorImageSize.width}
          height={creatorImageSize.height}
          className="absolute top-[170px] xl:top-[210px]"
          priority
        />
      </div>
      <div
        className="bg-gray-30 w-full h-[100vh] relative z-10 flex justify-center text-black"
        ref={grayDivRef}
      >
        <div className="w-[calc(100%-140px)] h-full">
          <div className="mt-[70px] flex flex-col gap-4 xl:gap-6">
            <h3 className="h5 !font-semibold">(Who is Juyoung)</h3>
            <h2 className="h3">Who is Juyoung?</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
