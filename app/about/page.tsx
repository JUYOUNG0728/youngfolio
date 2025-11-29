"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef, useEffect } from "react";

import SubHeader from "@/components/Common/SubHeader";
import useScreenWidth from "@/utils/useScreenWidth";
import Scene from "@/components/Main/Model/Scene";
import Send from "@/components/Common/Send";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const marquee1Ref = useRef<HTMLHeadingElement>(null);
  const marquee2Ref = useRef<HTMLHeadingElement>(null);

  const screenWidth = useScreenWidth();

  const marqueeText1 = Array(4).fill("GROWTH MINDSET 🚀");
  const marqueeText2 = Array(4).fill("A COMPLETE CREATOR ✨");
  const marqueeTextStyle = "flex gap-12 whitespace-nowrap marquee";

  const experience = [
    {
      company: "웹사이트 (WebSite.co.kr)",
      role: "Design Dept. 주임",
    },
  ];

  const education = [
    {
      school: "성보경영고등학교",
      major: "기업홍보디자인과 졸업",
    },
    {
      school: "동양미래대학교",
      major: "시각디자인과 졸업",
    },
  ];

  const certificate = [
    "GTQ그래픽기술자격 1급",
    "컴퓨터그래픽기능사",
    "코드잇 스프린트 프론트엔드 11기 수료",
  ];

  const skills = [
    { name: "Figma", color: "#F24E1E" },
    { name: "XD", color: "#FF61F6" },
    { name: "PS", color: "#31A8FF" },
    { name: "AI", color: "#FF9A00" },
    { name: "HTML/CSS", color: "#1572B6" },
    { name: "JS", color: "#F7DF1E" },
    { name: "TS", color: "#3178C6" },
    { name: "React", color: "#61DAFB" },
    { name: "Next.js", color: "#CCCCCC" },
    { name: "GSAP", color: "#88CE02" },
    { name: "Three.js", color: "#AAAAAA" },
  ];

  const aiTools = [
    { name: "ChatGPT", color: "#10A37F" },
    { name: "Google Bard", color: "#4285F4" },
    { name: "Ruiten AI", color: "#6C5DD3" },
    { name: "Claude AI", color: "#008080" },
    { name: "Adobe Firefly", color: "#FF6200" },
    { name: "Meshy AI", color: "#C5F955" },
    { name: "Flamel", color: "#7F56D9" },
  ];

  const strengths = [
    {
      name: "문제 정의 및 구조화 능력",
      eng: "Problem Definition & Structuring",
      icon: "icon-structure.png",
    },
    {
      name: "아이디어 창출 능력",
      eng: "Idea Generation",
      icon: "icon-idea.png",
    },
    {
      name: "협업 및 커뮤니케이션 능력",
      eng: "Collaboration & Communication",
      icon: "icon-collaboration.png",
    },
    { name: "논리적 UX 설계", eng: "Logical UX Design", icon: "icon-ux.png" },
    {
      name: "객관적인 판단과 사고",
      eng: "Objective Judgment and Thinking",
      icon: "icon-thinking.png",
    },
    {
      name: "빠른 학습 능력",
      eng: "Rapid Learning Ability",
      icon: "icon-time.png",
    },
    {
      name: "분석과 개선의 몰입",
      eng: "Immersion in Analysis and Improvement",
      icon: "icon-analytics.png",
    },
    {
      name: "창의적 문제 해결 능력",
      eng: "Creative Problem Solving",
      icon: "icon-creative.png",
    },

    {
      name: "트렌드 이해 및 적용 능력",
      eng: "Trend Awareness & Application",
      icon: "icon-trend.png",
    },
  ];

  useEffect(() => {
    if (!marquee1Ref.current) return;

    const marqueeText = marquee1Ref.current.querySelectorAll(".marquee");

    const ctx = gsap.context(() => {
      gsap.to(marqueeText, {
        xPercent: -100,
        ease: "linear",
        repeat: -1,
        duration: 40,
      });
    }, marquee1Ref);

    return () => ctx.revert();
  }, [screenWidth]);

  useEffect(() => {
    if (!marquee2Ref.current) return;

    const marqueeText = marquee2Ref.current.querySelectorAll(".marquee");

    const ctx = gsap.context(() => {
      gsap.set(marqueeText, { xPercent: -100 });
      gsap.to(marqueeText, {
        xPercent: 0,
        ease: "linear",
        repeat: -1,
        duration: 40,
      });
    }, marquee2Ref);

    return () => ctx.revert();
  }, [screenWidth]);

  return (
    <div className="w-full h-full bg-black text-white overflow-x-hidden px-[30px] md:px-[70px]">
      <SubHeader page="About" />
      <div className="w-screen ml-[-30px] md:ml-[-70px]">
        <span className="bg-black border-t border-x border-gray-40 body2 !font-medium px-12 py-5 inline-block relative top-[1px] z-10 rounded-t-3xl left-[30px] md:left-[70px]">
          WHO IS YOUNG?
        </span>
        <div className="bg-black border-t border-gray-40 relative w-full h-full pt-36 pb-44 px-[60px] md:px-[140px] xl:pt-48 xl:pb-56">
          <div className="flex justify-between">
            <div className="flex flex-col gap-12">
              <h1 className="h3 flex flex-col gap-4 text-gray-40">
                <span>안녕하세요.</span>
                <div className="flex">
                  <span className="text-white">디자이너 최주영</span>
                  <span>입니다.</span>
                </div>
              </h1>
              <p className="body4 text-gray-20">
                어릴 때부터 새로운 도전에 앞장서며 성장하고 배우는 것을 즐겼고,
                <br />
                학창 시절 UI/UX 디자인을 접한 뒤 자연스럽게 흥미를 갖게
                되었습니다.
                <br />
                첫 직장이었던 디자인 에이전시에서는 기획부터 디자인까지
                경험하였으며,
                <br />
                현재는 프론트엔드 개발까지 배우며 올인원 인재로 성장하고
                있습니다.
              </p>
            </div>
            <h1
              className="font-bold text-white/10 absolute right-0 leading-[-3]"
              style={{ fontSize: screenWidth / 8.7 }}
            >
              I'M YOUNG
            </h1>
          </div>
          <div className="mt-40 flex justify-between xl:mr-8">
            <div className="w-[24vw] h-[70vh] bg-white relative rounded-xl overflow-hidden xl:w-[24vw] xl:h-[60vh]">
              <Image
                src="/images/img-about-me.jpg"
                alt="프로필 사진"
                fill
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-32">
              <div>
                <h2 className="h6 text-gray-10 !font-semibold mb-7 xl:mb-8">
                  EXPERIENCE
                </h2>
                <ul className="body4 text-gray-30">
                  {experience.map((item, index) => (
                    <li key={index}>
                      {item.company} {item.role}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="h6 text-gray-10 !font-semibold mb-7 xl:mb-8">
                  EDUCATION
                </h2>
                <ul className="body4 text-gray-30 flex flex-col gap-1">
                  {education.map((item, index) => (
                    <li key={index}>
                      {item.school} {item.major}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="h6 text-gray-10 !font-semibold mb-7 xl:mb-8">
                  CERTIFICATE
                </h2>
                <ul className="body4 text-gray-30 flex flex-col gap-1">
                  {certificate.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-32">
              <div>
                <h2 className="h6 text-gray-10 !font-semibold mb-7 xl:mb-8">
                  SKILLS
                </h2>
                <ul className="body4 font-medium text-gray-30 w-fit grid grid-cols-3 gap-4">
                  {skills.map((skill, index) => (
                    <li
                      key={index}
                      className="py-3 rounded-full text-center"
                      style={{
                        color: skill.color,
                        backgroundColor: `${skill.color}25`,
                        width: `${0.08 * screenWidth - 1.6}px`,
                      }}
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="h6 text-gray-10 !font-semibold mb-7 xl:mb-8">
                  AI TOOLS
                </h2>
                <ul className="body4 font-medium text-gray-30 w-fit grid grid-cols-3 gap-4">
                  {aiTools.map((tool, index) => (
                    <li
                      key={index}
                      className="py-3 rounded-full text-center"
                      style={{
                        color: tool.color,
                        backgroundColor: `${tool.color}25`,
                        width: `${0.08 * screenWidth}px`,
                      }}
                    >
                      {tool.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span
        className="w-screen bg-white text-navy-blue overflow-x-hidden relative h2 !font-medium flex gap-12 py-8 ml-[-30px] md:ml-[-70px]"
        ref={marquee1Ref}
      >
        <ul className={marqueeTextStyle}>
          {marqueeText1.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
        <ul aria-hidden="true" className={marqueeTextStyle}>
          {marqueeText1.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </span>
      <span
        className="w-screen bg-navy-blue text-white overflow-x-hidden relative h2 !font-medium flex gap-12 py-8 ml-[-30px] md:ml-[-70px]"
        ref={marquee2Ref}
      >
        <ul className={marqueeTextStyle}>
          {marqueeText2.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
        <ul aria-hidden="true" className={marqueeTextStyle}>
          {marqueeText2.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </span>

      <div className="w-screen overflow-x-hidden relative mt-36 ml-[-30px] md:ml-[-70px]">
        <span className="bg-light-blue body2 !font-medium px-12 py-5 inline-block relative z-10 rounded-t-3xl left-[200px] md:left-[360px]">
          PERSONALITY
        </span>
        <div className="bg-light-blue w-full h-full relative pt-36 pb-44 px-[60px] md:px-[140px] xl:pt-48 xl:pb-56">
          <h1
            className="text-center text-nowrap font-semibold"
            style={{ fontSize: screenWidth / 8.7 }}
          >
            <span className="text-white/20">MBTI IS? </span>
            <span>INTP</span>
          </h1>
          <div className="w-[60vw] h-[60vh] absolute left-0 right-0 top-36 mx-auto">
            <Scene />
          </div>
          <div className="grid grid-cols-3 gap-8 relative z-10 mt-56 xl:mt-64">
            {strengths.map((strength, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl flex w-full items-center gap-8 px-10 py-9 relative xl:gap-12 xl:px-12 xl:py-10 hover:scale-105 hover:bg-marine-blue hover:glow-1"
                style={{ transition: "transform 0.3s ease" }}
              >
                {index < 2 && (
                  <Image
                    src="/images/icon-crown.png"
                    alt="왕관"
                    width={60}
                    height={60}
                    className="absolute top-[-30px] left-0"
                  />
                )}
                <span className="h2 tracking-tight text-black !font-semibold group-hover:text-white">
                  0{index + 1}
                </span>
                <div className="flex flex-col gap-5">
                  <h2 className="h4 text-black group-hover:text-white">
                    {strength.name}
                  </h2>
                  <span className="body3 text-cool-gray-20 font-medium !leading-none group-hover:text-white">
                    {strength.eng}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-screen overflow-x-hidden relative text-black mt-36 ml-[-30px] md:ml-[-70px]">
        <span className="bg-yellow-green body2 !font-medium px-12 py-5 inline-block relative z-10 rounded-t-3xl left-[400px] md:left-[720px]">
          IN DAILY LIFE
        </span>
        <div className="bg-yellow-green w-full flex flex-col gap-44 pt-36 px-[60px] md:px-[140px] xl:pt-48">
          <h1
            className="text-center text-nowrap font-semibold"
            style={{ fontSize: screenWidth / 8.7 }}
          >
            <span className="text-black/20">DAILY </span>
            <span>HOBBY</span>
          </h1>
          <div className="flex flex-col gap-20">
            <div className="flex gap-16 justify-between">
              <div className="flex flex-col gap-10 xl:gap-14">
                <div className="flex flex-col gap-4">
                  <span className="h3 text-green">#1</span>
                  <div className="flex gap-6 items-center">
                    <h2 className="h2 text-nowrap">PIANO</h2>
                    <Image
                      src="/images/icon-piano.png"
                      alt="피아노"
                      width={80}
                      height={80}
                      className="rounded-xl object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 w-[20vw]">
                  <span className="rounded-full bg-black text-white body4 font-medium w-fit px-5 py-2 xl:px-6">
                    # Spring
                  </span>
                  <span className="rounded-full bg-black text-white body4 font-medium w-fit px-5 py-2 xl:px-6">
                    # Kiki's Delivery Service
                  </span>
                  <span className="rounded-full bg-black text-white body4 font-medium w-fit px-5 py-2 xl:px-6">
                    # MapleStory
                  </span>
                  <span className="rounded-full bg-black text-white body4 font-medium w-fit px-5 py-2 xl:px-6">
                    # Crazy Arcade
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-12 flex flex-col gap-4">
                <div className="flex gap-3 items-center ml-2">
                  <div className="w-10 h-10 rounded-full relative">
                    <Image
                      src="/images/img-about-me.jpg"
                      alt="프로필 이미지"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <span className="body3 font-semibold">undojinx</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-[24vw] h-[50vh]">
                    <iframe
                      src="https://drive.google.com/file/d/1wGl9lp-LQDnAm_e6i418pA9j8BuJ8b1x/preview"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                  <div className="w-[24vw] h-[50vh]">
                    <iframe
                      src="https://drive.google.com/file/d/1HP_twSA-xEKqXX4LWpZNDja57RWC73UA/preview"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="flex gap-4 items-center ml-2">
                  <Image
                    src="/images/icon-heart.png"
                    alt="하트 아이콘"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/images/icon-bubble.png"
                    alt="말풍선 아이콘"
                    width={24}
                    height={24}
                  />
                  <Send width={24} height={24} fill="#000000" />
                </div>
              </div>
            </div>

            <div className="flex gap-16 justify-between">
              <div className="flex flex-col gap-10 xl:gap-14">
                <div className="flex flex-col gap-4">
                  <span className="h3 text-green">#2</span>
                  <div className="flex gap-6 items-center">
                    <h2 className="h2 text-nowrap">BOOKS</h2>
                    <Image
                      src="/images/icon-book.png"
                      alt="책"
                      width={80}
                      height={80}
                      className="rounded-xl object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 w-[20vw]">
                  <span className="rounded-full bg-black text-white body4 font-medium w-fit px-5 py-2 xl:px-6">
                    # Book Newbie
                  </span>
                  <span className="rounded-full bg-black text-white body4 font-medium w-fit px-5 py-2 xl:px-6">
                    # Interactive Developer
                  </span>
                  <span className="rounded-full bg-black text-white body4 font-medium w-fit px-5 py-2 xl:px-6">
                    # Nexus
                  </span>
                  <span className="rounded-full bg-black text-white body4 font-medium w-fit px-5 py-2 xl:px-6">
                    # On Not Draining Myself
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-12 flex flex-col gap-4">
                <div className="flex gap-3 items-center ml-2">
                  <div className="w-10 h-10 rounded-full relative">
                    <Image
                      src="/images/img-about-me.jpg"
                      alt="프로필 이미지"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <span className="body3 font-semibold">undojinx</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-[24vw] h-[50vh] relative">
                    <Image
                      src="/images/img-book1.jpg"
                      alt="책 이미지 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-[24vw] h-[50vh] relative">
                    <Image
                      src="/images/img-book2.jpg"
                      alt="책 이미지 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex gap-4 items-center ml-2">
                  <Image
                    src="/images/icon-heart.png"
                    alt="하트 아이콘"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/images/icon-bubble.png"
                    alt="말풍선 아이콘"
                    width={24}
                    height={24}
                  />
                  <Send width={24} height={24} fill="#000000" />
                </div>
              </div>
            </div>

            <div className="flex gap-16 justify-between">
              <div className="flex flex-col gap-10 xl:gap-14">
                <div className="flex flex-col gap-4">
                  <span className="h3 text-green">#3</span>
                  <div className="flex gap-6 items-center">
                    <h2 className="h2 text-nowrap">GAMES</h2>
                    <Image
                      src="/images/icon-game.png"
                      alt="게임"
                      width={80}
                      height={80}
                      className="rounded-xl object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 w-[20vw]">
                  <span className="rounded-full bg-black text-white body4 font-medium w-fit px-5 py-2 xl:px-6">
                    # League of Legends
                  </span>
                  <span className="rounded-full bg-black text-white body4 font-medium w-fit px-5 py-2 xl:px-6">
                    # Lost Ark
                  </span>
                  <span className="rounded-full bg-black text-white body4 font-medium w-fit px-5 py-2 xl:px-6">
                    # Pocket Monsters
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-12 flex flex-col gap-4">
                <div className="flex gap-3 items-center ml-2">
                  <div className="w-10 h-10 rounded-full relative">
                    <Image
                      src="/images/img-about-me.jpg"
                      alt="프로필 이미지"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <span className="body3 font-semibold">undojinx</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-[24vw] h-[50vh]">
                    <iframe
                      src="https://drive.google.com/file/d/1KiTP33LhmlQSLSf5PVqr87Ds0DTVLE8s/preview"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                  <div className="w-[24vw] h-[50vh]">
                    <iframe
                      src="https://drive.google.com/file/d/1euyGoF1QYktTxQK8HQ3OStKn7JFX-iid/preview"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="flex gap-4 items-center ml-2">
                  <Image
                    src="/images/icon-heart.png"
                    alt="하트 아이콘"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/images/icon-bubble.png"
                    alt="말풍선 아이콘"
                    width={24}
                    height={24}
                  />
                  <Send width={24} height={24} fill="#000000" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[30vh] bg-yellow-green absolute left-0" />
    </div>
  );
}
