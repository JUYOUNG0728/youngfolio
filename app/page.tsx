"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import VisualSection from "@/components/Main/VisualSection";
import ProcessSection from "@/components/Main/ProcessSection";
import ProjectSection from "@/components/Main/ProjectSection";
import AboutMeSection from "@/components/Main/AboutMeSection";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const sectionStyle = {
    horizontalPaddingStyle:
      "px-[16px] md:px-[30px] lg:px-[120px] xl:px-[140px]",
    verticalPaddingStyle: "py-24 md:py-36 lg:py-44 xl:py-56",
  };

  return (
    <div className="w-full">
      <VisualSection sectionStyle={sectionStyle} />
      <ProcessSection sectionStyle={sectionStyle} />
      <ProjectSection sectionStyle={sectionStyle} />
      <AboutMeSection sectionStyle={sectionStyle} />
    </div>
  );
}
