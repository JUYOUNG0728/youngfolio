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
      "body2 !font-medium px-8 py-4 inline-block relative z-10 rounded-t-2xl left-[60px] md:left-[140px] lg:px-12 lg:rounded-t-3xl lg:py-5",
    containerStyle:
      "w-full h-full relative pt-36 pb-44 px-[60px] md:px-[140px] xl:pt-48 xl:pb-56",
  };

  return (
    <div className="w-full h-full bg-black text-white overflow-x-hidden">
      <div className="px-[60px] md:px-[140px]">
        <SubHeader page="About" />
      </div>
      <IntroduceSection sectionStyle={sectionStyle} />
      <MarqueeTextSection />
      <PersonalitySection sectionStyle={sectionStyle} />
      <HobbySection sectionStyle={sectionStyle} />
      <div className="w-full h-[30vh] bg-yellow-green absolute left-0" />
    </div>
  );
}
