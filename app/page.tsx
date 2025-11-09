"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Intro from "@/components/Intro/Intro";
import Background from "@/components/Main/Background";
import useScreenWidth from "@/utils/useScreenWidth";
import Scene from "@/components/Main/Models/Scene";
import Arrow from "@/components/Common/Arrow";

gsap.registerPlugin(ScrollTrigger);

export default function MainPage() {
  const screenWidth = useScreenWidth();

  const [showContents, setShowContents] = useState(true);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const photoBackgroundRef = useRef<HTMLDivElement | null>(null);
  const projectRef = useRef<HTMLDivElement | null>(null);

  const iconScrollArrowSize = screenWidth > 1920 ? 52 : 36;

  // useEffect(() => {
  //   const showContentsTimer = setTimeout(() => {
  //     setShowContents(true);
  //   }, 8500);

  //   return () => {
  //     clearTimeout(showContentsTimer);
  //   };
  // }, []);)

  /* contents 위로 올라오는 애니메이션 */
  useEffect(() => {
    if (!showContents || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: "100%" },
        {
          y: "0%",
          ease: "power4.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, [screenWidth, showContents]);

  /* 사진 줌인 애니메이션 */
  useEffect(() => {
    if (!scrollRef.current || !photoRef.current) return;

    const photo = photoRef.current.querySelector(".zoom-photo");

    const ctx = gsap.context(() => {
      gsap.set(photo, { width: "70vw" });

      ScrollTrigger.create({
        trigger: scrollRef.current,
        start: "center center",
        onEnter: () => gsap.to(photo, { width: "100vw", duration: 0.5 }),
        onLeaveBack: () => gsap.to(photo, { width: "70vw", duration: 0.5 }),
      });
    }, scrollRef);

    return () => ctx.revert();
  }, []);

  /* 사진 글자 나타나는 애니메이션 */
  useEffect(() => {
    if (!photoRef.current) return;

    const words = photoRef.current.querySelector(".photo-words");

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0 });

      ScrollTrigger.create({
        trigger: photoRef.current,
        start: "top bottom",
        onEnter: () => gsap.to(words, { opacity: 1, duration: 0.5 }),
        onLeaveBack: () => gsap.to(words, { opacity: 0, duration: 0.5 }),
      });
    }, photoRef);

    return () => ctx.revert();
  }, []);

  /* 검은 배경 슬라이드 되는 애니메이션 */
  useEffect(() => {
    if (!photoRef.current || !photoBackgroundRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        photoBackgroundRef.current,
        { x: "100vw" },
        {
          x: 0,
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top top",
            end: "+=800",
            scrub: true,
          },
        }
      );
    }, photoBackgroundRef);

    return () => ctx.revert();
  }, []);

  /* 프로젝트 글자 나타나는 애니메이션 */
  useEffect(() => {
    if (!photoRef.current) return;

    const mainTextDiv = photoRef.current.querySelector(".photo-words");
    const mainText = mainTextDiv?.querySelector("span") as HTMLSpanElement;
    const subTextDiv = mainTextDiv?.querySelector("div") as HTMLDivElement;

    const ctx = gsap.context(() => {
      gsap.set(mainText, { opacity: 1 });
      gsap.set(subTextDiv, { opacity: 0, maxHeight: 0 });

      if (!mainTextDiv || !mainText || !subTextDiv) return;

      ScrollTrigger.create({
        trigger: photoRef.current,
        start: "top top-=800",
        onEnter: () => {
          mainTextDiv.classList.remove("h1"), mainTextDiv.classList.add("h2");
          gsap.to(mainText, {
            opacity: "40%",
            duration: 0.1,
            ease: "cubic-bezier(0.65,0,0.35,1)",
          });
          gsap.to(subTextDiv, {
            opacity: 1,
            maxHeight: 500,
            duration: 0.1,
            ease: "cubic-bezier(0.65,0,0.35,1)",
          });
        },
        onLeaveBack: () => {
          gsap.to(mainText, {
            opacity: "100%",
            duration: 0.1,
            ease: "cubic-bezier(0.65,0,0.35,1)",
          });
          gsap.to(subTextDiv, {
            opacity: 0,
            maxHeight: 0,
            duration: 0.1,
            ease: "cubic-bezier(0.65,0,0.35,1)",
          });

          gsap.delayedCall(0.5, () => {
            mainTextDiv.classList.remove("h2");
            mainTextDiv.classList.add("h1");
          });
        },
      });
    }, photoRef);

    return () => ctx.revert();
  }, []);

  /* 프로젝트 스케일 업 애니메이션 */
  useEffect(() => {
    if (!projectRef.current) return;

    const projects = Array.from(
      projectRef.current.querySelectorAll(".project-item")
    ) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      projects.forEach((project, i) => {
        gsap.set(project, { scale: 0.8 });

        ScrollTrigger.create({
          trigger: projectRef.current,
          start: `top+=${i * 1000} bottom+=700`,
          onEnter: () => gsap.to(project, { scale: 1, duration: 0.2 }),
          onLeaveBack: () => gsap.to(project, { scale: 0.8, duration: 0.2 }),
          scrub: true,
        });
      });
    }, projectRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      className={`w-full ${
        showContents ? "overflow-y-auto" : "overflow-y-hidden h-full"
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <Background />
        {/* <Intro /> */}
      </div>
      <div
        style={{
          transition: "opacity 0.5s ease-in-out",
          opacity: showContents ? 1 : 0,
          pointerEvents: showContents ? "auto" : "none",
        }}
      >
        {showContents && (
          <>
            <div className="absolute top-0 left-0 w-full h-full pt-28 px-[70px] xl:px-[100px] xl:pt-32">
              <video
                src="/images/video-youngfolio.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full absolute bottom-0 left-0 object-cover object-top"
                ref={videoRef}
              />
              <div
                className="w-full h-[70vh] absolute top-0 left-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 40%, rgba(0, 0, 0, 0) 100%)",
                }}
              />
              <div className="w-full flex flex-col items-center relative">
                <span className="body2 text-white mb-5 xl:mb-7">
                  2025 : Imagine beyond words
                </span>
                <h1 className="h2 text-white !font-semibold text-center mb-10 xl:mb-12">
                  YOUNG'S PORTFOLIO
                </h1>
                <button
                  className="px-8 py-2.5 bg-white rounded-full text-black body3 font-semibold flex items-center justify-center gap-3 xl:gap-4 hover:scale-110"
                  onClick={() => {
                    window.location.href = "/about";
                  }}
                  style={{ transition: "transform 0.3s ease-in-out" }}
                >
                  View about
                  <Image
                    src="/images/icon-arrow-down.png"
                    alt="화살표"
                    width={28}
                    height={28}
                    className="-rotate-90"
                  />
                </button>
              </div>
            </div>

            <div
              className="absolute top-0 left-0 w-full h-full"
              ref={contentRef}
            >
              <div className="bg-black w-full h-[200vh]">
                <div className="w-full h-screen flex flex-col items-center justify-center sticky top-0">
                  <p
                    className="absolute px-12 top-20 left-0 body1 font-semibold text-outline-white
                      text-justify xl:top-16"
                  >
                    BLENDING TECHNOLOGY AND EMOTION, CREATING EXPERIENCES THAT
                    GO BEYOND WORDS AND RESONATE WITH THE HEART.
                  </p>
                  <p
                    className="body2 text-white
                      absolute bottom-56 text-center xl:bottom-80"
                  >
                    현실과 감성의 경계를 넘나들며 마음에 닿는 경험과 공간을
                    디자인합니다.
                    <br />
                    감성과 기술로 연결된 공간을 그리는 디자이너, 최주영입니다.
                  </p>
                  <div className="w-[40vw] h-[40vh]">
                    <Scene />
                  </div>
                  <div
                    className="absolute bottom-28 xl:bottom-40"
                    ref={scrollRef}
                  >
                    <Arrow
                      width={iconScrollArrowSize}
                      height={iconScrollArrowSize}
                      fill={"#fff"}
                      className="animate-bounce"
                    />
                  </div>
                </div>
              </div>

              <div
                className="w-full bg-black relative h-[800vh] xl:h-[750vh]"
                ref={photoRef}
              >
                <div className="w-full h-screen sticky top-0 flex items-center justify-center overflow-x-hidden">
                  <div className="h-full relative flex flex-col items-center justify-center zoom-photo">
                    <Image
                      src="/images/img-main-background.jpg"
                      alt="배경 이미지"
                      fill
                      className="object-cover brightness-75"
                    />
                    <div
                      className="absolute top-0 left-0 bg-black w-full h-screen"
                      ref={photoBackgroundRef}
                    />
                    <h2 className="text-gray-10 text-center font-semibold relative z-10 flex flex-col items-center justify-center photo-words h1">
                      <span className="transition-all duration-700">
                        IMAGINE BEYOND
                      </span>
                      <div className="flex flex-col items-center transition-all duration-700">
                        <div
                          className="flex relative bottom-[34px] my-8 xl:my-12 xl:bottom-[50px]"
                          style={{
                            clipPath: "polygon(0 0, 100% 0, 100% 200%, 0 200%)",
                          }}
                        >
                          <span className="bouncing-loop h-10">x</span>
                        </div>
                        <span>SOME PROJECTS</span>
                      </div>
                    </h2>
                  </div>
                </div>

                <div
                  className="bg-black w-full absolute top-[400vh] xl:top-[350vh]"
                  ref={projectRef}
                >
                  <div className="absolute top-0 left-0 w-[40vw] h-[60vh] bg-black text-white project-item">
                    <div className="w-full h-full">
                      <Image
                        src="/images/img-project-thumbnail-youngfolio.jpg"
                        alt="YOUNGFOLIO 썸네일"
                        fill
                        className="object-cover border border-gray-40"
                      />
                    </div>
                    <div className="relative mt-8 flex flex-col gap-2 ml-4">
                      <h3 className="h5">YOUNGFOLIO</h3>
                      <p className="body5">
                        2025. WEB / UX JUYOUNG'S PORTFOLIO
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-[100vh] right-0 w-[40vw] h-[60vh] bg-black text-white project-item">
                    <div className="w-full h-full">
                      <Image
                        src="/images/img-project-thumbnail-youngfolio.jpg"
                        alt="YOUNGFOLIO 썸네일"
                        fill
                        className="object-cover border border-gray-40"
                      />
                    </div>
                    <div className="relative mt-8 flex flex-col gap-2 ml-4">
                      <h3 className="h5">YOUNGFOLIO</h3>
                      <p className="body5">
                        2025. WEB / UX JUYOUNG'S PORTFOLIO
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-[200vh] left-0 w-[40vw] h-[60vh] bg-black text-white project-item">
                    <div className="w-full h-full">
                      <Image
                        src="/images/img-project-thumbnail-youngfolio.jpg"
                        alt="YOUNGFOLIO 썸네일"
                        fill
                        className="object-cover border border-gray-40"
                      />
                    </div>
                    <div className="relative mt-8 flex flex-col gap-2 ml-4">
                      <h3 className="h5">YOUNGFOLIO</h3>
                      <p className="body5">
                        2025. WEB / UX JUYOUNG'S PORTFOLIO
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-[300vh] left-0 right-0 mx-auto w-[40vw] h-[60vh] bg-black text-white project-item">
                    <div className="w-full h-full">
                      <Image
                        src="/images/img-project-thumbnail-youngfolio.jpg"
                        alt="YOUNGFOLIO 썸네일"
                        fill
                        className="object-cover border border-gray-40"
                      />
                    </div>
                    <div className="relative pt-8 flex flex-col gap-2 ml-4 bg-black">
                      <h3 className="h5">YOUNGFOLIO</h3>
                      <p className="body5">
                        2025. WEB / UX JUYOUNG'S PORTFOLIO
                      </p>
                    </div>
                    <div className="w-full h-[20vh] bg-black" />
                  </div>
                </div>
              </div>

              <div className="w-full h-[400vh] bg-white"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
