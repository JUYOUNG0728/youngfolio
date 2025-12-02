import Scene from "@/components/About/Model/Scene";
import Characteristics from "@/components/About/Characteristics";

type PersonalitySectionProps = {
  sectionStyle: {
    baseStyle: string;
    tagStyle: string;
    containerStyle: string;
    gapStyle: string;
  };
};

export default function PersonalitySection({
  sectionStyle,
}: PersonalitySectionProps) {
  const { baseStyle, tagStyle, containerStyle } = sectionStyle;

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

  return (
    <div className={`${baseStyle} ${sectionStyle.gapStyle}`}>
      <span
        className={`${tagStyle} bg-light-blue lg:left-[390px] xl:left-[420px]`}
      >
        PERSONALITY
      </span>
      <div className={`${containerStyle} bg-light-blue`}>
        <h1 className="aboutSectionTitle text-center font-semibold">
          <span className="text-white/20">MBTI IS? </span>
          <span>INTP</span>
        </h1>
        <div className="absolute w-[80vw] h-[40vh] left-0 right-0 mx-auto top-4 md:w-[90vh] md:h-[70vh] lg:top-44 lg:w-[44vw] lg:h-[44vh] xl:top-52">
          <Scene />
        </div>
        <div
          className={`grid grid-cols-1 gap-8 relative z-10 ${sectionStyle.gapStyle} lg:grid-cols-3`}
        >
          {strengths.map((strength, index) => (
            <Characteristics key={index} strength={strength} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
