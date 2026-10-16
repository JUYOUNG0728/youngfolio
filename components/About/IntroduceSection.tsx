import Image from "next/image";
import type { ReactNode } from "react";

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
  "컴퓨터그래픽스운용기능사",
  "Google Analytics Certification (GA4)",
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

const rowStyle =
  "grid grid-cols-1 gap-5 border-t border-white/15 py-8 md:grid-cols-[9.5rem_1fr] md:items-start md:gap-12 md:py-10 lg:grid-cols-[12rem_1fr] lg:gap-16 lg:py-12";

const labelStyle =
  "text-xs font-medium tracking-[0.2em] text-gray-30 md:pt-1 md:text-sm";

function ProfileRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className={rowStyle}>
      <h3 className={labelStyle}>{label}</h3>
      <div>{children}</div>
    </div>
  );
}

function SkillList({ items }: { items: { name: string; src: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-6 md:gap-x-6">
      {items.map((item) => (
        <li
          key={item.name}
          className="flex w-[4.5rem] flex-col items-center gap-2.5 md:w-20"
        >
          <div className="flex h-14 w-14 items-center justify-center bg-white/20 rounded-xl md:h-16 md:w-16">
            <Image
              src={item.src}
              alt={item.name}
              width={64}
              height={64}
              className="h-8 w-8 object-contain md:h-9 md:w-9"
            />
          </div>
          <span className="body6 text-center leading-snug text-gray-30">
            {item.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function IntroduceSection() {
  return (
    <section className="overflow-hidden px-[16px] pb-20 md:px-[30px] md:pb-28 lg:px-[140px] lg:pb-36">
      <div className="flex flex-col items-stretch gap-10">
        <div className="about-rise w-full">
          <p className="text-xs font-medium tracking-[0.22em] text-gray-30 md:text-sm">
            WHO IS YOUNG?
          </p>
          <h2 className="mt-8 flex flex-col gap-2 text-[2rem] font-semibold leading-[1.35] tracking-[-0.03em] text-gray-40 md:mt-12 md:gap-3 md:text-[2.5rem] lg:text-[3.25rem] xl:text-[3.75rem]">
            <span>안녕하세요.</span>
            <span>
              <span className="text-white">디자이너 최주영</span>
              <span>입니다.</span>
            </span>
          </h2>
        </div>
        <div
          className="about-rise relative aspect-[10/4] w-full overflow-hidden rounded-3xl"
          style={{ animationDelay: "120ms" }}
        >
          <Image
            src="/images/img-about-me-2.jpg"
            alt="프로필 사진"
            fill
            priority
            sizes="(min-width: 1024px) 34vw, 26rem"
            className="object-cover object-[center_85%] scale-150 brightness-110"
          />
        </div>
      </div>

      <div className="mt-16 overflow-hidden md:mt-24 lg:mt-28">
        <p
          aria-hidden="true"
          className="w-max text-[14vw] font-bold leading-[0.8] tracking-[-0.06em] text-white/10 lg:text-[9vw]"
        >
          {"I'M YOUNG"}
        </p>
      </div>

      <div className="mt-8 border-b border-white/15 md:mt-12">
        <ProfileRow label="EXPERIENCE">
          <ul className="body4 flex flex-col gap-2 text-gray-20">
            {experience.map((item) => (
              <li key={item.company}>
                <span className="text-gray-10">{item.company}</span>{" "}
                <span>{item.role}</span>
              </li>
            ))}
          </ul>
        </ProfileRow>
        <ProfileRow label="EDUCATION">
          <ul className="body4 flex flex-col gap-3 text-gray-20">
            {education.map((item) => (
              <li key={item.school}>
                <span className="text-gray-10">{item.school}</span>{" "}
                <span>{item.major}</span>
              </li>
            ))}
          </ul>
        </ProfileRow>
        <ProfileRow label="CERTIFICATE">
          <ul className="body4 flex flex-col gap-2 text-gray-20">
            {certificate.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ProfileRow>
        <ProfileRow label="DESIGN">
          <SkillList items={designSkills} />
        </ProfileRow>
        <ProfileRow label="CODING">
          <SkillList items={codingSkills} />
        </ProfileRow>
        <ProfileRow label="AI TOOLS">
          <SkillList items={aiTools} />
        </ProfileRow>
      </div>
    </section>
  );
}
