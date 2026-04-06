import Image from "next/image";
import useScreenWidth from "@/utils/useScreenWidth";

type IntroduceSectionProps = {
  sectionStyle: {
    baseStyle: string;
    tagStyle: string;
    containerStyle: string;
    gapStyle: string;
  };
};

export default function IntroduceSection({
  sectionStyle,
}: IntroduceSectionProps) {
  const { baseStyle, tagStyle, containerStyle } = sectionStyle;

  const screenWidth = useScreenWidth();

  const titleStyle = "h6 text-gray-10 !font-semibold xl:mb-8";

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

  const designSkills = [
    { name: "Figma", src: "/images/skills/figma.png" },
    { name: "XD", src: "/images/skills/xd.png" },
    { name: "PS", src: "/images/skills/ps.png" },
    { name: "AI", src: "/images/skills/ai.png" },
  ];

  const codingSkills = [
    { name: "HTML", src: "/images/skills/html.png" },
    { name: "CSS", src: "/images/skills/css.png" },
    { name: "JS", src: "/images/skills/js.png" },
    { name: "TS", src: "/images/skills/ts.png" },
    { name: "React", src: "/images/skills/react.png" },
    { name: "Next.js", src: "/images/skills/next.js.png" },
    { name: "GSAP", src: "/images/skills/gsap.png" },
    { name: "Three.js", src: "/images/skills/three.js.png" },
  ];

  const aiTools = [
    { name: "ChatGPT", src: "/images/skills/chatGPT.png" },
    { name: "Google Gemini", src: "/images/skills/gemini.png" },
    { name: "Ruiten AI", src: "/images/skills/wrtn.png" },
    { name: "Claude AI", src: "/images/skills/claude.png" },
    { name: "Adobe Firefly", src: "/images/skills/firefly.png" },
    { name: "Meshy AI", src: "/images/skills/meshy.png" },
    { name: "Flamel", src: "/images/skills/flamel.png" },
  ];

  const contents = [
    { listName: "Experience", items: experience },
    { listName: "Education", items: education },
    { listName: "Certificate", items: certificate },
    { listName: "Design", items: designSkills },
    { listName: "Coding", items: codingSkills },
    { listName: "AI Tools", items: aiTools },
  ];

  return (
    <div className={baseStyle}>
      <span
        className={`${tagStyle} bg-black border-t border-x border-gray-40 top-[1px]`}
      >
        WHO IS YOUNG?
      </span>
      <div className={`${containerStyle} bg-black border-t border-gray-40`}>
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
              디자인 에이전시에서 기획-디자인-이관의 전 과정을 경험하였으며,
              <br />
              현재는 프론트엔드 개발까지 배워 올인원 인재로 성장하고 있습니다.
            </p>
          </div>
          <h1 className="hidden aboutSectionTitle font-bold text-white/10 absolute right-0 leading-[-3] md:inline-block">
            I'M YOUNG
          </h1>
        </div>
        <div className="mt-12 flex flex-col md:mt-20 lg:mt-40 md:flex-row md:gap-x-20 md:flex-wrap lg:flex-nowrap lg:gap-0 lg:justify-between xl:mr-8">
          <div className="w-full h-[30vh] bg-white relative rounded-xl overflow-hidden md:h-[70vh] md:w-[40vw] lg:w-[24vw] xl:h-[60vh]">
            <Image
              src="/images/img-about-me.jpg"
              alt="프로필 사진"
              fill
              className="w-full h-full object-cover object-[0%_30%] lg:object-center"
            />
          </div>
          <div className="flex flex-col gap-12 mt-12 md:mt-0 md:gap-16 lg:gap-32">
            {contents.slice(0, 3).map((content, contentIndex) => (
              <div key={contentIndex}>
                <h2 className={`${titleStyle} mb-5 lg:mb-7`}>
                  {content.listName.toUpperCase()}
                </h2>
                <ul className="body4 text-gray-30 flex flex-col lg:gap-1">
                  {content.items.map((item: any, index: number) => (
                    <li key={index}>
                      {content.listName === "Experience"
                        ? `${item.company} ${item.role}`
                        : content.listName === "Education"
                          ? `${item.school} ${item.major}`
                          : item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col mt-12 gap-12 md:flex-row md:gap-20 md:flex-wrap md:mt-28 lg:flex-nowrap lg:flex-col lg:mt-0 lg:gap-32">
            {contents.slice(3).map((content, contentIndex) => (
              <div key={contentIndex}>
                <h2 className={`${titleStyle} mb-7`}>
                  {content.listName.toUpperCase()}
                </h2>
                <ul
                  className={`${content.items.length >= 6 ? " grid-cols-6" : "grid-cols-4"} body4 font-medium text-gray-30 w-fit grid gap-3 md:gap-4`}
                >
                  {content.items.map((item: any, index: number) => (
                    <li
                      key={index}
                      style={{
                        width: `${0.03 * screenWidth}px`,
                        height: `${0.03 * screenWidth}px`,
                      }}
                      className="relative min-w-9 min-h-9"
                    >
                      <Image src={item.src} alt={item.name} fill />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
