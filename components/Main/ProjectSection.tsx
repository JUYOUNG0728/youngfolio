"use client";

import Image from "next/image";
import { useLayoutEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import useScreenWidth from "@/utils/useScreenWidth";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

type ProjectSectionProps = {
  sectionStyle: {
    horizontalPaddingStyle: string;
    verticalPaddingStyle: string;
  };
};

export default function ProjectSection({ sectionStyle }: ProjectSectionProps) {
  const [projectHover, setProjectHover] = useState<boolean[]>(
    Array(5).fill(false),
  );
  const [projectProgress, setProjectProgress] = useState<number>(0);

  const projectRef = useRef<HTMLDivElement | null>(null);

  const { horizontalPaddingStyle } = sectionStyle;

  const screenWidth = useScreenWidth();

  const projectOffset =
    (screenWidth / 2 - screenWidth * 0.15 - (screenWidth >= 768 ? 140 : 30)) *
    2;

  const projectList = projects.slice(1, 5);

  const handleProjectHover = (index: number) => {
    setProjectHover((prev) =>
      prev.map((item, i) => (i === index ? true : item)),
    );
  };

  const handleProjectUnHover = (index: number) => {
    setProjectHover((prev) =>
      prev.map((item, i) => (i === index ? false : item)),
    );
  };

  useLayoutEffect(() => {
    if (screenWidth < 1280) return;
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
    <section
      className={`relative flex flex-col justify-between py-24 text-white overflow-x-hidden md:py-36 lg:h-screen lg:py-[7vh] ${horizontalPaddingStyle}`}
    >
      <Image
        src="/images/img-project-background.jpg"
        alt="배경 이미지"
        fill
        className="object-cover opacity-50 z-[-1]"
      />
      <h1 className="h7 !font-medium text-center lg:text-left">
        (SOME PROJECTS)
      </h1>
      <div
        className="w-full mt-16 flex flex-col gap-24 lg:ml-[calc(50vw-15vw-140px)] lg:flex-row lg:gap-[22vw] lg:mt-0"
        ref={projectRef}
      >
        {projectList.map((project, index) => (
          <div
            key={project.id}
            className="w-full h-[50vh] rounded-xl overflow-hidden bg-white flex-shrink-0 relative cursor-pointer lg:w-[30vw] lg:h-[76vh]"
            onMouseOver={() => handleProjectHover(index)}
            onMouseOut={() => handleProjectUnHover(index)}
            onClick={() => window.open(project.link, "_blank")}
          >
            <Image
              src={project.posterSrc}
              alt={`프로젝트 이미지 ${project.id}`}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 text-nowrap flex flex-col gap-3.5">
              <h2 className="h5 !font-medium text-white">{project.title}</h2>
              <span className="body5 !leading-none text-gray-20">
                {project.description}
              </span>
            </div>
            <div
              className={`absolute inset-0 bg-opacity-50 flex flex-col justify-center items-center text-center px-4 bg-black/20 pointer-events-none select-none ${
                projectHover[index] ? "opacity-100" : "opacity-0"
              }`}
              style={{ backdropFilter: "blur(10px)", transition: "0.5s" }}
            >
              <div className="relative rounded-md overflow-hidden w-[70vw] h-[44vw] md:w-[60vw] md:h-[36vw] lg:w-[22vw] lg:h-[14vw]">
                <Image
                  src={project.imageSrc}
                  alt={`${project.title} 프로젝트 썸네일`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {screenWidth >= 1280 && (
        <div className="w-[8vw] min-w-[100px] bg-white/30 rounded-full overflow-hidden relative mx-auto">
          <div
            className="h-1 bg-gray-20"
            style={{ width: `${projectProgress * 100}%` }}
          />
        </div>
      )}
    </section>
  );
}
