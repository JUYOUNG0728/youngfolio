"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Arrow from "@/components/Common/Arrow";
import useScreenWidth from "@/utils/useScreenWidth";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const processRef = useRef<HTMLDivElement | null>(null);

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
      <section className="w-full relative text-white py-[80px] md:py-[160px] xl:py-[200px]">
        <Image
          src="/images/img-projects-background.jpg"
          alt="배경 이미지"
          fill
          className="object-cover opacity-15 z-[-1]"
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
        <p
          ref={processRef}
          className="body1 text-center mt-[12vh] px-[60px] md:px-[140px] md:mt-[16vh]"
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
      <section className="w-full h-screen"></section>
    </div>
  );
}
