"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SnsItems from "@/components/SnsItems";

gsap.registerPlugin(ScrollTrigger);

export default function CreatorPage() {
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const grayDivRef = useRef<HTMLDivElement>(null);

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
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!grayDivRef.current) return;

    gsap.fromTo(
      grayDivRef.current,
      { y: 0 },
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
      <div className="bg-gray-50 w-full h-[calc(100vh+160px)] flex flex-col items-center justify-end text-white relative overflow-hidden">
        <div
          className={`w-[${
            screenWidth - 120
          }px] absolute top-8 h-[100%] xl:top-6`}
        >
          <h1
            className="font-extrabold whitespace-nowrap text-center"
            style={{ fontSize: `${getNameFontSize()}` }}
          >
            CHOI JUYOUNG{" "}
          </h1>
          <div className="mx-2">
            <h2 className="body2 flex justify-end mt-[-10px]">
              Igniting value in design!
            </h2>
            <div className="body3 absolute bottom-[280px] flex justify-between items-end w-full xl:bottom-[300px]">
              <div className="flex justify-end w-full flex-col gap-6 xl:gap-8">
                <h2 className="body2">More than just visuals.</h2>
                <p>
                  디자인은 단순한 시각적 아름다움이 아닌,
                  <br />
                  문제를 해결하고 가치를 전달하는 수단이라고 생각합니다.
                  <br />
                  사용자의 입장에서 생각하고,
                  <br />더 나은 경험을 만들기 위한 끊임없는 고민이 필요합니다.
                </p>
              </div>
              <div className="mr-10">
                <SnsItems screenWidth={screenWidth} />
              </div>
            </div>
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
        className="bg-gray-30 w-full h-[100vh] text-white relative z-10"
        ref={grayDivRef}
      ></div>
    </div>
  );
}
