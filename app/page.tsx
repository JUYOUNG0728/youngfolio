"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Arrow from "@/components/Common/Arrow";
import useScreenWidth from "@/utils/useScreenWidth";
import Button from "@/components/Common/Button";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [projectHover, setProjectHover] = useState<boolean[]>(
    Array(5).fill(false)
  );
  const [projectProgress, setProjectProgress] = useState<number>(0);

  const processRef = useRef<HTMLDivElement | null>(null);
  const projectRef = useRef<HTMLDivElement | null>(null);

  const screenWidth = useScreenWidth();

  const projectOffset =
    (screenWidth / 2 - screenWidth * 0.15 - (screenWidth >= 768 ? 140 : 30)) *
    2;

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

  const handleProjectHover = (index: number) => {
    setProjectHover((prev) =>
      prev.map((item, i) => (i === index ? true : item))
    );
  };

  const handleProjectUnHover = (index: number) => {
    setProjectHover((prev) =>
      prev.map((item, i) => (i === index ? false : item))
    );
  };

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

  useLayoutEffect(() => {
    if (!projectRef.current) return;

    const wrapper = projectRef.current.parentElement;

    const ctx = gsap.context(() => {
      gsap.to(projectRef.current, {
        x: () =>
          -(
            projectRef.current!.scrollWidth -
            projectRef.current!.clientWidth +
            projectOffset
          ),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () =>
            `+=${
              projectRef.current!.scrollWidth -
              projectRef.current!.clientWidth +
              projectOffset
            }`,
          onUpdate: (self) => {
            setProjectProgress(self.progress);
          },
          scrub: true,
          pin: wrapper,
          anticipatePin: 1,
        },
      });
    }, projectRef);

    return () => ctx.revert();
  }, [screenWidth]);

  return (
    <div className="w-full">
      <section className="w-full h-screen text-black bg-white pt-[120px] xl:pt-[150px]">
        <div className="h-full flex relative border-t border-gray-30">
          <div className="w-1/2 h-full flex flex-col justify-between py-[40px] px-[30px] md:px-[140px] md:py-[80px] xl:py-[100px]">
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
      <section className="w-full relative text-white py-24 md:py-36 lg:py-44 xl:py-56">
        <Image
          src="/images/img-projects-background.jpg"
          alt="배경 이미지"
          fill
          className="object-cover opacity-20 z-[-1]"
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
          className="body1 text-center mt-[12vh] px-[30px] md:px-[140px] md:mt-[16vh]"
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
      <section className="relative h-screen flex flex-col justify-between py-[7vh] text-white overflow-x-hidden px-[30px] md:px-[140px]">
        <Image
          src="/images/img-project-background.jpg"
          alt="배경 이미지"
          fill
          className="object-cover opacity-50 z-[-1]"
        />
        <h1 className="h7 !font-medium">(SOME PROJECTS)</h1>
        <div
          className="w-full flex gap-[22vw] ml-[calc(50vw-15vw-30px)] md:ml-[calc(50vw-15vw-140px)]"
          ref={projectRef}
        >
          <div
            className="w-[30vw] h-[76vh] bg-white flex-shrink-0 relative cursor-pointer"
            onMouseOver={() => handleProjectHover(0)}
            onMouseOut={() => handleProjectUnHover(0)}
            onClick={() =>
              (window.location.href = "https://youngfolio.vercel.app")
            }
          >
            <Image
              src="/images/img-visual.jpg"
              alt="프로젝트 이미지 1"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 text-nowrap flex flex-col gap-3.5">
              <h2 className="h5 !font-medium text-white">YOUNGFOLIO</h2>
              <span className="body5 !leading-none text-gray-20">
                WEB / UX JUYOUNG'S PORTFOLIO
              </span>
            </div>
            <div
              className={`absolute inset-0  bg-opacity-50 flex flex-col justify-center items-center text-center px-4 bg-black/20 pointer-events-none select-none ${
                projectHover[0] ? "opacity-100" : "opacity-0"
              }`}
              style={{ backdropFilter: "blur(10px)", transition: "0.5s" }}
            >
              <div className="w-[22vw] h-[14vw] relative">
                <Image
                  src="/images/img-project-thumbnail-youngfolio.png"
                  alt="YOUNGFOLIO 프로젝트 썸네일"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div
            className="w-[30vw] h-[76vh] bg-white flex-shrink-0 relative cursor-pointer"
            onMouseOver={() => handleProjectHover(1)}
            onMouseOut={() => handleProjectUnHover(1)}
            onClick={() =>
              (window.location.href = "https://youngfolio.vercel.app")
            }
          >
            <Image
              src="/images/img-visual.jpg"
              alt="프로젝트 이미지 1"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 text-nowrap flex flex-col gap-3.5">
              <h2 className="h5 !font-medium text-white">YOUNGFOLIO</h2>
              <span className="body5 !leading-none text-gray-20">
                WEB / UX JUYOUNG'S PORTFOLIO
              </span>
            </div>
            <div
              className={`absolute inset-0  bg-opacity-50 flex flex-col justify-center items-center text-center px-4 bg-black/20 pointer-events-none select-none ${
                projectHover[1] ? "opacity-100" : "opacity-0"
              }`}
              style={{ backdropFilter: "blur(10px)", transition: "0.5s" }}
            >
              <div className="w-[22vw] h-[14vw] relative">
                <Image
                  src="/images/img-project-thumbnail-youngfolio.png"
                  alt="YOUNGFOLIO 프로젝트 썸네일"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div
            className="w-[30vw] h-[76vh] bg-white flex-shrink-0 relative cursor-pointer"
            onMouseOver={() => handleProjectHover(2)}
            onMouseOut={() => handleProjectUnHover(2)}
            onClick={() =>
              (window.location.href = "https://youngfolio.vercel.app")
            }
          >
            <Image
              src="/images/img-visual.jpg"
              alt="프로젝트 이미지 1"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 text-nowrap flex flex-col gap-3.5">
              <h2 className="h5 !font-medium text-white">YOUNGFOLIO</h2>
              <span className="body5 !leading-none text-gray-20">
                WEB / UX JUYOUNG'S PORTFOLIO
              </span>
            </div>
            <div
              className={`absolute inset-0  bg-opacity-50 flex flex-col justify-center items-center text-center px-4 bg-black/20 pointer-events-none select-none ${
                projectHover[2] ? "opacity-100" : "opacity-0"
              }`}
              style={{ backdropFilter: "blur(10px)", transition: "0.5s" }}
            >
              <div className="w-[22vw] h-[14vw] relative">
                <Image
                  src="/images/img-project-thumbnail-youngfolio.png"
                  alt="YOUNGFOLIO 프로젝트 썸네일"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div
            className="w-[30vw] h-[76vh] bg-white flex-shrink-0 relative cursor-pointer"
            onMouseOver={() => handleProjectHover(3)}
            onMouseOut={() => handleProjectUnHover(3)}
            onClick={() =>
              (window.location.href = "https://youngfolio.vercel.app")
            }
          >
            <Image
              src="/images/img-visual.jpg"
              alt="프로젝트 이미지 1"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 text-nowrap flex flex-col gap-3.5">
              <h2 className="h5 !font-medium text-white">YOUNGFOLIO</h2>
              <span className="body5 !leading-none text-gray-20">
                WEB / UX JUYOUNG'S PORTFOLIO
              </span>
            </div>
            <div
              className={`absolute inset-0  bg-opacity-50 flex flex-col justify-center items-center text-center px-4 bg-black/20 pointer-events-none select-none ${
                projectHover[3] ? "opacity-100" : "opacity-0"
              }`}
              style={{ backdropFilter: "blur(10px)", transition: "0.5s" }}
            >
              <div className="w-[22vw] h-[14vw] relative">
                <Image
                  src="/images/img-project-thumbnail-youngfolio.png"
                  alt="YOUNGFOLIO 프로젝트 썸네일"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div
            className="w-[30vw] h-[76vh] bg-white flex-shrink-0 relative cursor-pointer"
            onMouseOver={() => handleProjectHover(4)}
            onMouseOut={() => handleProjectUnHover(4)}
            onClick={() =>
              (window.location.href = "https://youngfolio.vercel.app")
            }
          >
            <Image
              src="/images/img-visual.jpg"
              alt="프로젝트 이미지 1"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 text-nowrap flex flex-col gap-3.5">
              <h2 className="h5 !font-medium text-white">YOUNGFOLIO</h2>
              <span className="body5 !leading-none text-gray-20">
                WEB / UX JUYOUNG'S PORTFOLIO
              </span>
            </div>
            <div
              className={`absolute inset-0  bg-opacity-50 flex flex-col justify-center items-center text-center px-4 bg-black/20 ${
                projectHover[4] ? "opacity-100" : "opacity-0"
              }`}
              style={{ backdropFilter: "blur(10px)", transition: "0.5s" }}
            >
              <div className="w-[22vw] h-[14vw] relative">
                <Image
                  src="/images/img-project-thumbnail-youngfolio.png"
                  alt="YOUNGFOLIO 프로젝트 썸네일"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center gap-4">
          <div className="w-[8vw] min-w-[100px] bg-white/30 rounded-full overflow-hidden relative">
            <div
              className="h-1 bg-gray-20"
              style={{ width: `${projectProgress * 100}%` }}
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-10 text-black py-24 md:py-36 lg:py-44 xl:py-56">
        <h1 className="w-fit group h1 !font-normal text-center flex flex-col mx-auto">
          <span>
            W
            <span
              className="text-gray-20 group-hover:text-black"
              style={{ transition: "0.5s" }}
            >
              OULD YOU LIK
            </span>
            E
          </span>
          <span>
            <span
              className="text-gray-20 group-hover:text-black"
              style={{ transition: "0.5s" }}
            >
              TO KNOW{" "}
            </span>
            M
            <span
              className="text-gray-20 group-hover:text-black"
              style={{ transition: "0.5s" }}
            >
              OR
            </span>
            E
          </span>
          <span className="flex items-center justify-center gap-8">
            <span>
              <span
                className="text-gray-20 group-hover:text-black"
                style={{ transition: "0.5s" }}
              >
                ABOU
              </span>
              T
            </span>
            <div className="w-[200px] h-[94px] relative xl:w-[240px] xl:h-[120px]">
              <Image
                src="/images/img-about-me.jpg"
                alt="ABOUT ME 이미지"
                fill
                className="object-cover object-[50%_30%]"
              />
            </div>
            ?
          </span>
        </h1>
        <p className="body3 text-center mt-10 xl:mt-12">
          저에 대해 더 자세히 알려드릴게요!
        </p>
        <Button
          variant="primary-outline"
          size="lg"
          circleButton={true}
          className="mt-28 mx-auto flex items-center justify-center xl:mt-32"
          onClick={() => (window.location.href = "/about")}
        >
          <Arrow
            width={32}
            height={32}
            fill="currentColor"
            className="rotate-[225deg]"
          />
        </Button>
      </section>
    </div>
  );
}
