"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TextCircle from "@/components/Main/TextCircle";
import useScreenWidth from "@/utils/useScreenWidth";

gsap.registerPlugin(ScrollTrigger);

type ProcessSectionProps = {
  sectionStyle: {
    horizontalPaddingStyle: string;
    verticalPaddingStyle: string;
  };
};

export default function ProcessSection({ sectionStyle }: ProcessSectionProps) {
  const processRef = useRef<HTMLDivElement | null>(null);

  const { horizontalPaddingStyle, verticalPaddingStyle } = sectionStyle;

  const screenWidth = useScreenWidth();

  const processText = [
    "사용자 설문조사",
    "경쟁 서비스 분석",
    "데이터/사용자 행동 분석",
    "페르소나 작성",
    "사용자 여정지도 작성",
    "핵심 문제(HMW) 도출",
    "IA/사이트맵 작성",
    "와이어프레임 제작",
    "하이파이 디자인",
    "디자인 시스템 설계",
    "인터랙션/애니메이션 설계",
    "프로토타입 제작",
    "사용성 테스트 진행",
    "피드백 수집",
    "성과 측정 (KPI, UX metrics)",
  ];

  useLayoutEffect(() => {
    if (!processRef.current) return;

    const processText = processRef.current.querySelector(".process-item");

    const ctx = gsap.context(() => {
      gsap.set(processText, { backgroundSize: "0% 100%" });

      ScrollTrigger.create({
        trigger: processRef.current,
        start: "top 60%",
        end: "bottom 80%",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(processText, {
            backgroundSize: `${progress * 100}% 100%`,
          });
        },
      });
    }, processRef);

    return () => ctx.revert();
  }, [screenWidth]);

  return (
    <section
      className={`w-full relative text-white ${verticalPaddingStyle} ${horizontalPaddingStyle}`}
    >
      <Image
        src="/images/img-process-background.jpg"
        alt="배경 이미지"
        fill
        className="object-cover opacity-20 z-[-1]"
      />
      <div className="w-full flex flex-col gap-[8vw] items-center justify-center md:gap-[6vw] lg:flex-row lg:gap-[12vw]">
        <TextCircle />
        <div className="flex flex-col gap-10 text-center text-wrap px-[16px] md:px-[30px] md:gap-14 lg:text-left lg:px-0 lg:gap-16">
          <h1 className="body1 font-medium">
            Experiences beyond technology,
            <br />
            resonating with the heart.
          </h1>
          <p className="body3">
            체계적인 UX 프로세스를 기반으로 사용자 조사부터 디자인, 검증까지의
            전 과정을 통해,
            <br />
            기술과 감성을 넘어 마음에 닿는 경험을 만듭니다.
          </p>
        </div>
      </div>
      <p
        ref={processRef}
        className={`body1 text-center mt-[12vh] md:mt-[16vh] ${horizontalPaddingStyle}`}
      >
        <span
          style={{
            WebkitTextFillColor: "rgba(255, 255, 255, 0.2)",
            WebkitBackgroundClip: "text",
            backgroundImage: "linear-gradient(90deg, #FFFFFF, #FFFFFF)",
          }}
          className="process-item bg-no-repeat"
        >
          {processText.map((item, index) => (
            <span key={index} className="leading-[1.8]">
              {item}
              {index !== processText.length - 1 && <br />}
            </span>
          ))}
        </span>
      </p>
    </section>
  );
}
