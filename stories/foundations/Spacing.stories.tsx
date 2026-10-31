import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Guide, GuideText, GuideTitle, SpecTable } from "../ui";

const meta = {
  title: "Design System/Foundations/Spacing",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "간격은 Tailwind 스케일과 페이지 좌우 패딩 두 층입니다. 본문 lg는 140px, 헤더 lg는 70px입니다.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const steps = [
  ["--space-1", "4px", "아주 작은 스택"],
  ["--space-2", "8px", "gap-2. 아이콘과 라벨"],
  ["--space-3", "12px", "gap-3. 카드 본문"],
  ["--space-4", "16px", "gap-4. 메뉴, 기본 스택"],
  ["--space-5", "20px", "gap-5. 섹션 내부"],
  ["--space-6", "24px", "gap-6. 프로젝트 카드"],
  ["--space-8", "32px", "gap-8. SubHeader, 푸터 메타"],
  ["--space-10", "40px", "gap-10"],
  ["--space-12", "48px", "gap-12. 문의 섹션"],
  ["--space-16", "64px", "섹션 간격"],
  ["--space-20", "80px", "py-20. About 섹션 sm"],
];

function Bar({ name, label }: { name: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div
        style={{
          width: `var(${name})`,
          height: 16,
          background: "var(--white)",
          borderRadius: "var(--radius-full)",
        }}
      />
      <span className="body6 text-gray-20">
        {name} · {label}
      </span>
    </div>
  );
}

export const Scale: Story = {
  render: () => (
    <div style={{ padding: 32 }}>
      <Guide>
        <GuideTitle eyebrow="Foundation">Spacing</GuideTitle>
        <GuideText>
          반복되는 px, gap, py를 토큰으로 적었습니다. 컴포넌트는 아직
          px-[16px] 같은 클래스를 그대로 씁니다.
        </GuideText>
        <div style={{ display: "grid", gap: 12 }}>
          {steps.map(([name, size, label]) => (
            <Bar key={name} name={name} label={`${size} — ${label}`} />
          ))}
        </div>
        <GuideTitle>페이지 거터</GuideTitle>
        <SpecTable
          headers={["토큰", "값", "적용"]}
          rows={[
            ["--page-x-sm", "16px", "기본 px-[16px]"],
            ["--page-x-md", "30px", "md:px-[30px]"],
            ["--page-x-header-lg", "70px", "헤더, 푸터 lg:px-[70px]"],
            ["--page-x-content-lg", "140px", "본문 lg:px-[140px], 푸터 xl"],
            ["--header-height-sm", "80px", "h-20"],
            ["--header-height-md", "100px", "md:h-[100px]"],
            ["--header-height-lg", "120px", "lg:h-[120px]"],
            ["--header-height-xl", "140px", "xl:h-[140px]"],
            ["--subheader-offset", "240px", "SubHeader pt-[240px]"],
          ]}
        />
        <GuideTitle>세로 리듬 두 가지</GuideTitle>
        <SpecTable
          headers={["리듬", "sm", "md", "lg", "xl"]}
          rows={[
            ["About / Contact", "80px py-20", "112px py-28", "144px py-36", "—"],
            ["Home 섹션", "96px py-24", "144px py-36", "176px py-44", "224px py-56"],
            ["Footer py", "36px", "48px", "70px", "70px"],
          ]}
        />
        <div style={{ display: "grid", gap: 16 }}>
          <p className="body6 text-gray-30">본문 거터. 뷰포트를 바꾸면 좌우 여백이 달라집니다.</p>
          <div className="bg-white/10 px-[16px] md:px-[30px] lg:px-[140px]" style={{ paddingTop: 24, paddingBottom: 24 }}>
            <div className="bg-white text-black body6" style={{ padding: 16 }}>
              content px 16 / 30 / 140
            </div>
          </div>
          <div className="bg-white/10 px-[16px] md:px-[30px] lg:px-[70px]" style={{ paddingTop: 24, paddingBottom: 24 }}>
            <div className="bg-white text-black body6" style={{ padding: 16 }}>
              header px 16 / 30 / 70
            </div>
          </div>
        </div>
      </Guide>
    </div>
  ),
};
