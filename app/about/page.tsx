"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef, useEffect } from "react";

import SubHeader from "@/components/Common/SubHeader";
import useScreenWidth from "@/utils/useScreenWidth";
import Scene from "@/components/Main/Model/Scene";

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
        <span className="bg-black border-t border-x border-gray-40 body2 !font-medium px-12 py-5 text-white inline-block relative top-[1px] z-10 rounded-t-3xl left-[30px] md:left-[70px]">
          WHO IS YOUNG?
        </span>
        <div className="bg-black border-t border-gray-40 relative w-full h-full pt-48 pb-56 px-[60px] md:px-[140px]">
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
        className="w-screen bg-white text-blue overflow-x-hidden relative h2 !font-medium flex gap-12 py-8 ml-[-30px] md:ml-[-70px]"
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
        className="w-screen bg-blue text-white overflow-x-hidden relative h2 !font-medium flex gap-12 py-8 ml-[-30px] md:ml-[-70px]"
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
        <span className="bg-light-blue body2 !font-medium px-12 py-5 text-white inline-block relative z-10 rounded-t-3xl left-[200px] md:left-[360px]">
          PERSONALITY
        </span>
        <div className="bg-light-blue w-full h-full pt-48 pb-56 relative">
          <h2 className="text-center text-nowrap font-semibold text-[220pt]">
            <span className="text-white/15">MBTI IS? </span>
            <span>INTP</span>
          </h2>
          <div className="w-[60vw] h-[60vh] absolute left-0 right-0 top-28 mx-auto">
            <Scene />
          </div>
          <div className="grid grid-cols-3 gap-8 relative z-10 mt-64 px-[60px] md:px-[140px]">
            {strengths.map((strength, index) => (
              <div
                key={index}
                className="group bg-black/20 rounded-3xl flex justify-between w-full items-center gap-8 px-14 py-8 relative hover:scale-105 hover:bg-black/30"
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
                <span className="flex flex-col gap-5">
                  <span className="h5 text-white">{strength.name}</span>
                  <span
                    className="body4 text-cool-gray-20 font-medium !leading-none group-hover:text-white"
                    style={{ transition: "color 0.3s ease" }}
                  >
                    {strength.eng}
                  </span>
                </span>
                <span
                  className="h2 text-white/35 group-hover:text-white"
                  style={{ transition: "color 0.3s ease" }}
                >
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-screen overflow-x-hidden relative mt-36 ml-[-30px] md:ml-[-70px]">
        <span className="bg-yellow-green body2 !font-medium px-12 py-5 text-black inline-block relative z-10 rounded-t-3xl left-[400px] md:left-[720px]">
          IN DAILY LIFE
        </span>
        <div className="bg-yellow-green w-full h-screen pt-28 pb-64"></div>
      </div>
      <div className="w-full h-[30vh] bg-white absolute left-0" />
    </div>
  );
}
