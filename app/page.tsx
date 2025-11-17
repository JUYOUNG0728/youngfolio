"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import useScreenWidth from "@/utils/useScreenWidth";
import Scene from "@/components/Main/Model/Scene";
import Arrow from "@/components/Common/Arrow";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function MainPage() {
  const screenWidth = useScreenWidth();

  const contentRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const projectRef = useRef<HTMLDivElement | null>(null);
  const processRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const iconScrollArrowSize = screenWidth > 1920 ? 52 : 36;
  const iconInquirySendSize = screenWidth > 1920 ? 40 : 32;
  const iconContactArrowSize =
    screenWidth > 1920
      ? 64
      : screenWidth > 1280
      ? 52
      : screenWidth > 768
      ? 38
      : 32;
  const iconFooterArrowSize = screenWidth > 1920 ? 30 : 24;

  const contentsClipPath =
    screenWidth < 768 ? undefined : "inset(0 0 0 0 round 50% 50% 0 0)";

  const projectClipPath =
    screenWidth > 1920
      ? "polygon(0 0, 100% 0, 100% 240%, 0 240%)"
      : screenWidth > 1280
      ? "polygon(0 0, 100% 0, 100% 200%, 0 200%)"
      : screenWidth > 768
      ? "polygon(0 0, 100% 0, 100% 180%, 0 180%)"
      : "polygon(0 0, 100% 0, 100% 140%, 0 140%)";

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

  /* contents 위로 올라오는 애니메이션 */
  useEffect(() => {
    if (!contentRef.current) return;

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
  }, [screenWidth]);

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
  }, [screenWidth]);

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
  }, [screenWidth]);

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
          mainTextDiv.classList.remove("h1", "text-wrap"),
            mainTextDiv.classList.add("h2", "text-nowrap");
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
            mainTextDiv.classList.remove("h2", "text-nowrap"),
              mainTextDiv.classList.add("h1", "text-wrap");
          });
        },
      });
    }, photoRef);

    return () => ctx.revert();
  }, [screenWidth]);

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
          start:
            screenWidth > 768
              ? `top+=${i * innerHeight} bottom+=400`
              : `top+=${i * innerHeight} bottom+=700`,
          onEnter: () => gsap.to(project, { scale: 1, duration: 0.3 }),
          onLeaveBack: () => gsap.to(project, { scale: 0.8, duration: 0.3 }),
          scrub: true,
        });
      });
    }, projectRef);

    return () => {
      ctx.revert();
    };
  }, [screenWidth]);

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
        start: "top bottom+=200",
        end: "center top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(leftTitle, { x: `${-100 * progress}vw`, overwrite: "auto" });
          gsap.to(rightTitle, { x: `${100 * progress}vw`, overwrite: "auto" });
        },
      });
    }, processRef);

    return () => ctx.revert();
  }, [screenWidth]);

  /* 프로세스 글자 흰색 체인지 애니메이션 */
  useLayoutEffect(() => {
    if (!processRef.current) return;

    const processText = processRef.current.querySelector(".process-item");

    const ctx = gsap.context(() => {
      gsap.set(processText, { backgroundSize: "0% 100%" });

      ScrollTrigger.create({
        trigger: processRef.current,
        start: "top 80%",
        end: "center 50%",
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
    <div className="w-full overflow-y-auto">
      <section className="absolute top-0 left-0 w-full h-[150vh] bg-white overflow-hidden pt-32 px-[40px] xl:px-[100px] xl:pt-40 md:px-[70px]">
        <div
          className="absolute top-0 left-0 w-full h-[70vh]"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%)",
          }}
        />
        <div className="text-black flex flex-col items-center gap-10 xl:gap-12">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center relative overflow-hidden lg:w-28 lg:h-28 md:w-24 md:h-24">
            <Image
              src="/images/img-character.png"
              alt="캐릭터 이미지"
              width={120}
              height={120}
              className="object-cover rounded-full absolute bottom-[-30px] scale-[175%] lg:scale-150 lg:bottom-[-36px] md:bottom-[-34px] md:scale-[160%]"
            />
          </div>
          <h1 className="h1 text-center">YOUNG, PORTFOLIO</h1>
          <span className="body3 font-semibold py-3 px-7 text-black border border-black rounded-full mt-2 xl:mt-4 lg:py-4 lg:px-8">
            2025 : Imagine beyond words
          </span>
        </div>
        {screenWidth > 768 && (
          <div>
            <div className="absolute left-10 bottom-[74vh] flex flex-col items-center gap-9 xl:gap-14 lg:bottom-[58vh] lg:gap-11">
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
              className="absolute flex justify-center items-center right-[60px] bottom-[74vh] bg-black rounded-full w-28 h-28 xl:w-40 xl:h-40 lg:bottom-[58vh] lg:w-32 lg:h-32"
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
          </div>
        )}
      </section>

      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none select-none"
        ref={contentRef}
      >
        <section
          className="bg-black w-full h-[250vh] rounded-t-full"
          style={{
            clipPath: contentsClipPath,
          }}
        >
          <div className="w-full h-screen overflow-hidden flex flex-col items-center justify-center sticky top-8 xl:top-16">
            <p
              className="absolute px-12 top-20 left-0 fullBody font-semibold text-outline-white
                      text-justify xl:top-16"
            >
              BLENDING TECHNOLOGY AND EMOTION, CREATING EXPERIENCES THAT GO
              BEYOND WORDS AND RESONATE WITH THE HEART.
            </p>
            <p
              className="body2 text-white
                      absolute bottom-56 text-center px-[40px] text-wrap xl:bottom-80"
            >
              현실과 감성의 경계를 넘나들며 마음에 닿는 경험과 공간을
              디자인합니다.
              <br />
              감성과 기술로 연결된 공간을 그리는 디자이너, 최주영입니다.
            </p>
            <div className="w-[600px] h-[600px] lg:w-[40vw] lg:h-[40vh]">
              <Scene />
            </div>
            <div className="absolute bottom-28 xl:bottom-40" ref={scrollRef}>
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
          className="w-full bg-black relative h-[610vh] xl:h-[640vh] md:h-[690vh]"
          ref={photoRef}
        >
          <section className="w-full h-screen sticky top-0 flex items-center justify-center overflow-hidden">
            <div className="h-full relative flex flex-col items-center justify-center zoom-photo">
              <Image
                src="/images/img-main-background.jpg"
                alt="배경 이미지"
                fill
                className="object-cover zoom-photo-img"
              />
              <h2 className="text-gray-10 text-center font-semibold relative z-10 flex flex-col items-center justify-center photo-words h1 text-wrap">
                <span className="transition-all duration-700 px-[60px]">
                  IMAGINE BEYOND
                </span>
                <div className="flex flex-col items-center transition-all duration-700">
                  <div
                    className="flex relative bottom-[12px] my-3 xl:my-12 xl:bottom-[48px] lg:bottom-[36px] md:bottom-[24px] md:my-6 lg:my-10 "
                    style={{
                      clipPath: projectClipPath,
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
            <div className="absolute top-0 left-0 right-0 mx-auto min-w-[420px] w-[40vw] h-[40vh] bg-black text-white project-item md:h-[60vh] lg:min-w-[600px] md:min-w-[480px] md:right-auto">
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
                <p className="body5">2025. WEB / UX JUYOUNG'S PORTFOLIO</p>
              </div>
            </div>
            <div className="absolute top-[80vh] left-0 right-0 mx-auto min-w-[420px] w-[40vw] h-[40vh] bg-black text-white project-item md:h-[60vh] md:top-[100vh] lg:min-w-[600px] md:min-w-[480px] md:left-auto">
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
                <p className="body5">2025. WEB / UX JUYOUNG'S PORTFOLIO</p>
              </div>
            </div>
            <div className="absolute top-[160vh] left-0 right-0 mx-auto min-w-[420px] w-[40vw] h-[40vh] bg-black text-white project-item md:h-[60vh] md:top-[200vh] lg:min-w-[600px] md:min-w-[480px] md:right-auto">
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
                <p className="body5">2025. WEB / UX JUYOUNG'S PORTFOLIO</p>
              </div>
            </div>
            <div className="absolute top-[240vh] left-0 right-0 mx-auto min-w-[420px] w-[40vw] h-[40vh] bg-black text-white project-item md:h-[60vh] md:top-[300vh] lg:min-w-[600px] md:min-w-[480px]">
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
                <p className="body5">2025. WEB / UX JUYOUNG'S PORTFOLIO</p>
              </div>
            </div>
          </section>
        </div>

        <section
          ref={processRef}
          className="w-full h-[205vh] overflow-hidden bg-black pt-[24vh] xl:px-[100px] xl:h-[280vh] md:h-[270vh] lg:h-[330vh]"
        >
          <h2 className="h1 text-white !font-medium flex flex-col items-center justify-center px-[70px]">
            <span className="body2 mb-8">(Built This Way)</span>
            <span
              className={`left-title ${
                screenWidth > 1000 ? "text-nowrap" : "text-center"
              }`}
            >
              CREATED THROUGH
            </span>
            <span
              className={`right-title flex ${
                screenWidth > 1000 ? "flex-row gap-4 items-center" : "flex-col"
              }`}
            >
              <div className="flex items-center gap-4">
                <span>THIS</span>
                <div className="w-[140px] h-[130px] relative xl:h-[170px] xl:w-[190px]">
                  <Image
                    src="/images/img-process.png"
                    alt="프로세스 이미지"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <span>PROCESS</span>
            </span>
          </h2>
          <p className="body1 text-center text-nowrap mt-[16vh] md:mt-[20vh]">
            <span>
              <span
                style={{
                  WebkitTextFillColor: "rgba(255, 255, 255, 0.2)",
                  WebkitBackgroundClip: "text",
                  backgroundImage: "linear-gradient(90deg, #FFFFFF, #FFFFFF)",
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
            className={`w-full h-[100vh] px-[70px] text-white relative bg-black overflow-hidden !pointer-events-auto !select-auto xl:px-[100px] md:h-[120vh] ${
              !(screenWidth > 1000) && "top-44"
            }`}
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
              className="fullSizeButton mt-16 gap-4 rounded-full xl:mt-36 xl:gap-9 lg:gap-7 md:mt-20"
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
            <div className="w-full h-[48vh] absolute bottom-0 left-0 border-t border-gray-40 px-[70px] py-[70px] xl:px-[100px] xl:py-[100px] lg:h-[36vh]">
              <div className="flex w-full h-full relative flex-col gap-[76px] lg:flex-row lg:gap-[12vw]">
                <div className="flex flex-col justify-between gap-4 lg:h-full lg:gap-0">
                  <div className="body2 flex flex-col text-gray-20">
                    <span>2025 : IMAGINE BEYOND</span>
                    <span className="font-bold">YOUNGFOLIO</span>
                  </div>
                  <span className="body4 text-gray-40">
                    © 2025 YOUNGFOLIO. All rights reserved.
                  </span>
                </div>
                <div className="flex flex-col justify-between gap-4 lg:h-full lg:gap-0">
                  <div className="h4 !font-semibold flex flex-col gap-1">
                    <span className="text-gray-10">THIS IS MY SPACE.</span>
                    <p className="flex gap-4 lg:ml-[-44px] lg:justify-center">
                      <span className="text-gray-10">[</span>
                      <span className="text-gray-30">JUYOUNG'S PORTFOLIO</span>
                      <span className="text-gray-10">]</span>
                    </p>
                  </div>
                  <div className="flex body4 text-gray-40 gap-8 text-nowrap md:gap-16">
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
    </div>
  );
}
