"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import Intro from "@/components/Intro/Intro";
import Background from "@/components/Main/Background";
import useScreenWidth from "@/utils/useScreenWidth";
import Scene from "@/components/Main/Model/Scene";
import Arrow from "@/components/Common/Arrow";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function MainPage() {
  const screenWidth = useScreenWidth();

  const [showContents, setShowContents] = useState(true);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const projectRef = useRef<HTMLDivElement | null>(null);
  const processRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const iconScrollArrowSize = screenWidth > 1920 ? 52 : 36;
  const iconInquirySendSize = screenWidth > 1920 ? 40 : 32;
  const iconContactArrowSize = screenWidth > 1920 ? 64 : 52;
  const iconFooterArrowSize = screenWidth > 1920 ? 30 : 24;

  const scrollTop = () => {
    ScrollTrigger.refresh();

    gsap.to(window, {
      scrollTo: 0,
      duration: 1,
      overwrite: "auto",
      onComplete: () => {
        ScrollTrigger.refresh();

        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 50);
      },
    });
  };

  /* 인트로 후 contents 등장 */
  useEffect(() => {
    const showContentsTimer = setTimeout(() => {
      setShowContents(true);
    }, 8500);

    return () => {
      clearTimeout(showContentsTimer);
    };
  }, []);

  /* contents 위로 올라오는 애니메이션 */
  useEffect(() => {
    if (!showContents || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: "92%" },
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
  useLayoutEffect(() => {
    if (!scrollRef.current || !photoRef.current) return;

    const photoDiv = photoRef.current.querySelector(".zoom-photo");
    const photo = photoRef.current.querySelector(".zoom-photo-img");

    const ctx = gsap.context(() => {
      gsap.set(photoDiv, { width: "60vw" });
      gsap.set(photo, { filter: "brightness(1)" });

      ScrollTrigger.create({
        trigger: scrollRef.current,
        start: "center top-=500",
        onEnter: () => {
          gsap.to(photoDiv, { width: "100vw", duration: 0.5 }),
            gsap.to(photo, { filter: "brightness(0.5)", duration: 0.5 });
        },
        onLeaveBack: () => {
          gsap.to(photoDiv, { width: "60vw", duration: 0.5 }),
            gsap.to(photo, { filter: "brightness(1)", duration: 0.5 });
        },
      });
    }, scrollRef);

    return () => ctx.revert();
  }, [screenWidth, showContents]);

  /* 사진 글자 나타나는 애니메이션 */
  useLayoutEffect(() => {
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
  }, [screenWidth, showContents]);

  /* 프로젝트 글자 나타나는 애니메이션 */
  useLayoutEffect(() => {
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
        start: "top top-=500",
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
  }, [screenWidth, showContents]);

  /* 프로젝트 스케일 업 애니메이션 */
  useLayoutEffect(() => {
    if (!projectRef.current) return;

    const projects = Array.from(
      projectRef.current.querySelectorAll(".project-item")
    ) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      projects.forEach((project, i) => {
        gsap.set(project, { scale: 0.8 });

        const innerHeight = window.innerHeight;

        ScrollTrigger.create({
          trigger: projectRef.current,
          start: `top+=${i * innerHeight} bottom+=400`,
          onEnter: () => gsap.to(project, { scale: 1, duration: 0.3 }),
          onLeaveBack: () => gsap.to(project, { scale: 0.8, duration: 0.3 }),
          scrub: true,
        });
      });
    }, projectRef);

    return () => {
      ctx.revert();
    };
  }, [screenWidth, showContents]);

  /* 프로세스 타이틀 좌우 이동 애니메이션 */
  useLayoutEffect(() => {
    if (!processRef.current) return;

    const leftTitle = processRef.current.querySelector(".left-title");
    const rightTitle = processRef.current.querySelector(".right-title");

    const ctx = gsap.context(() => {
      gsap.set(leftTitle, { x: "0vw" });
      gsap.set(rightTitle, { x: "0vw" });

      ScrollTrigger.create({
        trigger: processRef.current,
        start: "top bottom",
        end: "center top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(leftTitle, { x: `${-100 * progress}vw`, overwrite: "auto" });
          gsap.to(rightTitle, { x: `${100 * progress}vw`, overwrite: "auto" });
        },
      });
    }, processRef);

    return () => ctx.revert();
  }, [screenWidth, showContents]);

  /* 프로세스 글자 흰색 체인지 애니메이션 */
  useLayoutEffect(() => {
    if (!processRef.current) return;

    const processText = processRef.current.querySelector(".process-item");

    const ctx = gsap.context(() => {
      gsap.set(processText, { backgroundSize: "0% 100%" });

      ScrollTrigger.create({
        trigger: processRef.current,
        start: "top 50%",
        end: "center 25%",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(processText, {
            backgroundSize: `${progress * 100}% 100%`,
          });
        },
      });
    }, processRef);

    return () => ctx.revert();
  }, [screenWidth, showContents]);

  /* 컨택트 마퀴 애니메이션 */
  useEffect(() => {
    if (!contactRef.current) return;
    const marquee = contactRef.current?.querySelectorAll(".marquee");
    let direction = 1;

    const tween = gsap.to(marquee, {
      xPercent: -100,
      ease: "linear",
      repeat: -1,
      duration: 40,
    });

    ScrollTrigger.create({
      trigger: marquee,
      start: "top bottom+=1000",
      end: "bottom top",
      onUpdate: (self) => {
        const newDirection = self.direction;
        if (newDirection !== direction) {
          direction = newDirection;
          tween.timeScale(direction);
        }
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
          transition: "opacity 1s ease-in-out",
          opacity: showContents ? 1 : 0,
          pointerEvents: showContents ? "auto" : "none",
        }}
      >
        {showContents && (
          <>
            <section className="absolute top-0 left-0 w-full h-[150vh] bg-white overflow-x-hidden pt-32 px-[70px] xl:px-[100px] xl:pt-40">
              <div
                className="absolute top-0 left-0 w-full h-[70vh]"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%)",
                }}
              />
              <div className="text-black flex flex-col items-center gap-10 xl:gap-12">
                <div className="w-28 h-28 bg-black rounded-full flex items-center justify-center relative overflow-hidden">
                  <Image
                    src="/images/img-character.png"
                    alt="캐릭터 이미지"
                    width={120}
                    height={120}
                    className="object-cover rounded-full absolute bottom-[-36px] scale-150"
                  />
                </div>
                <h1 className="h1">YOUNG, PORTFOLIO</h1>
                <span className="body3 font-semibold py-4 px-8 text-black border border-black rounded-full mt-2 xl:mt-4">
                  2025 : Imagine beyond words
                </span>
              </div>
              <div className="absolute left-10 bottom-[58vh] flex flex-col items-center gap-11 xl:gap-14">
                <div className="-rotate-90">
                  <span className="text-black font-semibold body5">
                    SCROLL TO
                  </span>
                </div>
                <Image
                  src="/images/icon-mouse-scroll.png"
                  alt="마우스 스크롤"
                  width={16}
                  height={16}
                />
              </div>
              <button
                className="absolute flex justify-center items-center right-[70px] bottom-[58vh] bg-black rounded-full w-32 h-32 xl:w-40 xl:h-40"
                onClick={() => (window.location.href = "/contact")}
              >
                <Image
                  src="/images/icon-inquiry-button.png"
                  alt="문의하기 버튼 텍스트"
                  fill
                  className="absolute animate-spin"
                  style={{ animationDuration: "12s" }}
                />
                <Image
                  src="/images/icon-send.png"
                  alt="문의하기 아이콘"
                  width={iconInquirySendSize}
                  height={iconInquirySendSize}
                />
              </button>
            </section>

            <div
              className="absolute top-0 left-0 w-full h-full pointer-events-none select-none"
              ref={contentRef}
            >
              <section
                className="bg-black w-full h-[250vh] rounded-t-full"
                style={{
                  clipPath: "inset(0 0 0 0 round 45% 45% 0 0)",
                }}
              >
                <div className="w-full h-screen flex flex-col items-center justify-center sticky top-8 xl:top-16">
                  <p
                    className="absolute px-12 top-20 left-0 fullBody font-semibold text-outline-white
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
                      fill="#ffffff"
                      className="bouncing"
                    />
                  </div>
                </div>
              </section>

              <div
                className="w-full bg-black relative h-[690vh] xl:h-[640vh]"
                ref={photoRef}
              >
                <section className="w-full h-screen sticky top-0 flex items-center justify-center overflow-x-hidden">
                  <div className="h-full relative flex flex-col items-center justify-center zoom-photo">
                    <Image
                      src="/images/img-main-background.jpg"
                      alt="배경 이미지"
                      fill
                      className="object-cover zoom-photo-img"
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
                </section>

                <section
                  className="bg-black w-full absolute top-[300vh] xl:top-[250vh]"
                  ref={projectRef}
                >
                  <div className="absolute top-0 left-0 w-[40vw] h-[60vh] bg-black text-white project-item">
                    <div className="w-full h-full">
                      <Image
                        src="/images/img-project-thumbnail-youngfolio.png"
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
                        src="/images/img-project-thumbnail-youngfolio.png"
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
                        src="/images/img-project-thumbnail-youngfolio.png"
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
                        src="/images/img-project-thumbnail-youngfolio.png"
                        alt="YOUNGFOLIO 썸네일"
                        fill
                        className="object-cover border border-gray-40"
                      />
                    </div>
                    <div className="relative pt-8 flex flex-col gap-2 ml-4">
                      <h3 className="h5">YOUNGFOLIO</h3>
                      <p className="body5">
                        2025. WEB / UX JUYOUNG'S PORTFOLIO
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <section
                ref={processRef}
                className="w-full overflow-x-hidden h-[330vh] bg-black px-[70px] pt-[20vh] xl:px-[100px] xl:h-[280vh]"
              >
                <h2 className="h1 text-white !font-medium flex flex-col items-center justify-center">
                  <span className="body2 mb-8">(Built This Way)</span>
                  <span className="left-title">CREATED THROUGH</span>
                  <span className="right-title flex gap-4 items-center">
                    THIS
                    <div className="w-[140px] h-[130px] relative xl:h-[170px] xl:w-[190px]">
                      <Image
                        src="/images/img-process.png"
                        alt="프로세스 이미지"
                        fill
                        className="object-cover"
                      />
                    </div>
                    PROCESS
                  </span>
                </h2>
                <p className="body1 text-center mt-[24vh]">
                  <span>
                    <span
                      style={{
                        WebkitTextFillColor: "rgba(255, 255, 255, 0.2)",
                        WebkitBackgroundClip: "text",
                        backgroundImage:
                          "linear-gradient(90deg, #FFFFFF, #FFFFFF)",
                      }}
                      className="process-item bg-no-repeat"
                    >
                      사용자 설문조사
                      <br />
                      경쟁 서비스 분석
                      <br />
                      데이터/사용자 행동 분석
                      <br />
                      페르소나 작성
                      <br />
                      사용자 여정지도 작성
                      <br />
                      핵심 문제(HMW) 도출
                      <br />
                      IA/사이트맵 작성
                      <br />
                      와이어프레임 제작
                      <br />
                      하이파이 디자인
                      <br />
                      디자인 시스템 설계
                      <br />
                      인터랙션/애니메이션 설계
                      <br />
                      프로토타입 제작
                      <br />
                      사용성 테스트 진행
                      <br />
                      피드백 수집
                      <br />
                      성과 측정(KPI, UX metrics)
                    </span>
                  </span>
                </p>
              </section>
              <section>
                <div
                  ref={contactRef}
                  className="w-full h-[110vh] px-[70px] text-white relative bg-black overflow-x-hidden !pointer-events-auto !select-auto xl:px-[100px]"
                >
                  <h2 className="h1 !font-medium flex gap-12">
                    <ul className="flex gap-12 whitespace-nowrap marquee">
                      <li>FEEL FREE TO EXPLORE 😊</li>
                      <li>FEEL FREE TO EXPLORE 😊</li>
                      <li>FEEL FREE TO EXPLORE 😊</li>
                      <li>FEEL FREE TO EXPLORE 😊</li>
                    </ul>
                    <ul
                      aria-hidden="true"
                      className="flex gap-12 whitespace-nowrap marquee"
                    >
                      <li>FEEL FREE TO EXPLORE 😊</li>
                      <li>FEEL FREE TO EXPLORE 😊</li>
                      <li>FEEL FREE TO EXPLORE 😊</li>
                      <li>FEEL FREE TO EXPLORE 😊</li>
                    </ul>
                  </h2>
                  <button
                    className="fullSizeButton mt-28 gap-7 rounded-full xl:mt-36 xl:gap-9"
                    onClick={() => (window.location.href = "/contact")}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderRadius = "1.5rem")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderRadius = "10rem")
                    }
                    style={{
                      transition: "border-radius 0.3s ease-in-out",
                    }}
                  >
                    <span>LET’S GET IN CONTACT</span>
                    <Arrow
                      width={iconContactArrowSize}
                      height={iconContactArrowSize}
                      fill="#ffffff"
                      className="-rotate-[135deg]"
                    />
                  </button>
                  <div className="w-full h-[36vh] absolute bottom-0 left-0 border-t border-gray-40 px-[70px] py-[70px] xl:px-[100px] xl:py-[100px]">
                    <div className="flex w-full h-full relative gap-60 xl:gap-80">
                      <div className="flex flex-col justify-between h-full">
                        <div className="body2 flex flex-col text-gray-20">
                          <span>2025 : IMAGINE BEYOND</span>
                          <span className="font-bold">YOUNGFOLIO</span>
                        </div>
                        <span className="body4 text-gray-40">
                          © 2025 YOUNGFOLIO. All rights reserved.
                        </span>
                      </div>
                      <div className="flex flex-col justify-between h-full">
                        <div className="h4 !font-semibold flex flex-col gap-1">
                          <span className="text-gray-10">
                            THIS IS MY SPACE.
                          </span>
                          <p className="flex justify-center gap-4 ml-[-44px]">
                            <span className="text-gray-10">[</span>
                            <span className="text-gray-30">
                              JUYOUNG'S PORTFOLIO
                            </span>
                            <span className="text-gray-10">]</span>
                          </p>
                        </div>
                        <div className="flex body4 text-gray-40 gap-16">
                          <span>Email : vilioite@naver.com</span>
                          <span>Mobile : 010-8297-7649</span>
                        </div>
                      </div>
                      <button
                        className="rounded-full w-16 h-16 bg-gray-50 absolute top-0 right-0 flex justify-center items-center xl:w-20 xl:h-20"
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
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
