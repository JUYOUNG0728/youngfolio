import SubHeader from "@/components/Common/SubHeader";

import IntroduceSection from "@/components/About/IntroduceSection";
import MarqueeTextSection from "@/components/About/MarqueeTextSection";
import HobbySection from "@/components/About/HobbySection";

export default function AboutPage() {
  return (
    <div className="w-full overflow-x-hidden bg-black text-white">
      <div className="px-[16px] md:px-[30px] lg:px-[140px]">
        <SubHeader page="About me" />
      </div>
      <IntroduceSection />
      <MarqueeTextSection />
      <HobbySection />
    </div>
  );
}
