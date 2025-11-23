"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import Arrow from "@/components/Common/Arrow";
import useScreenWidth from "@/utils/useScreenWidth";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Footer() {
  const screenWidth = useScreenWidth();

  const iconFooterArrowSize =
    screenWidth >= 1920 ? 30 : screenWidth >= 768 ? 24 : 20;

  const footerSectionDivStyle =
    "flex flex-col justify-between gap-4 lg:h-full lg:gap-0";

  const scrollTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0, autoKill: false },
      duration: 1,
      overwrite: "auto",
      onComplete: () => {
        ScrollTrigger.refresh();
      },
    });
  };

  return (
    <div className="bg-black w-full max-h-[440px] h-[230px] relative z-30 border-t border-gray-40 px-[30px] py-[50px] mt-[30vh] md:p-[70px] md:h-[36vh]">
      <div className="flex w-full h-full relative flex-col gap-1 pr-20 md:flex-row md:gap-[12vw]">
        <div className={footerSectionDivStyle}>
          <div className="body2 flex flex-col text-gray-20">
            <span>2025 : IMAGINE BEYOND</span>
            <span className="font-bold">YOUNGFOLIO</span>
          </div>
          <span className="body4 text-gray-40">
            © 2025 YOUNGFOLIO. All rights reserved.
          </span>
        </div>
        <div className={footerSectionDivStyle}>
          {screenWidth >= 768 && (
            <div className="h4 !font-semibold flex flex-col gap-1">
              <span className="text-gray-10">THIS IS MY SPACE.</span>
              <p className="flex gap-4 ml-[-44px] justify-center">
                <span className="text-gray-10">[</span>
                <span className="text-gray-30">JUYOUNG'S PORTFOLIO</span>
                <span className="text-gray-10">]</span>
              </p>
            </div>
          )}
          <div className="flex body4 text-gray-40 gap-8 text-nowrap md:gap-16">
            <span>Email : vilioite@naver.com</span>
            <span>Mobile : 010-8297-7649</span>
          </div>
        </div>
        <button
          className="rounded-full w-12 h-12 bg-gray-50 absolute top-0 right-0 flex justify-center items-center lg:w-16 lg:h-16 xl:w-20 xl:h-20"
          onClick={() => {
            scrollTop();
          }}
        >
          <Arrow
            width={iconFooterArrowSize}
            height={iconFooterArrowSize}
            fill="#ffffff"
            className="rotate-180"
          />
        </button>
      </div>
    </div>
  );
}
