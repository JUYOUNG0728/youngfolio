"use client";

import SubHeader from "@/components/Common/SubHeader";

import IntroduceSection from "@/components/About/IntroduceSection";
import MarqueeTextSection from "@/components/About/MarqueeTextSection";
import PersonalitySection from "@/components/About/PersonalitySection";
import HobbySection from "@/components/About/HobbySection";

export default function AboutPage() {
  const sectionStyle = {
    baseStyle: "w-screen overflow-x-hidden relative",
    tagStyle:
      "body2 !font-medium px-8 py-4 inline-block relative z-10 rounded-t-2xl left-[30px] md:left-[60px] lg:px-12 lg:rounded-t-3xl lg:py-5 lg:left-[140px]",
    containerStyle:
      "w-full h-full relative py-24 px-[30px] md:px-[60px] md:py-36 lg:py-44 lg:px-[160px] xl:py-56",
    gapStyle: "mt-24 md:mt-36 lg:mt-44 xl:mt-56",
  };

  return (
    <div className="w-full h-full bg-black text-white overflow-x-hidden">
      <div className="px-[30px] md:px-[60px] lg:px-[140px]">
        <SubHeader page="About me" />
      </div>
      <IntroduceSection sectionStyle={sectionStyle} />
      <MarqueeTextSection />
      <PersonalitySection sectionStyle={sectionStyle} />
      <HobbySection sectionStyle={sectionStyle} />
    </div>
  );
}
