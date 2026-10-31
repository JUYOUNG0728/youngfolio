import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import useScreenWidth from "@/utils/useScreenWidth";

import { Guide, GuideText, GuideTitle, SpecTable } from "../ui";

const meta = {
  title: "Design System/Foundations/Breakpoints",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Tailwind screens는 sm 480, md 768, lg 1280, xl 1920이고 min-width입니다. 글자 유틸리티는 768 / 1280 / 1920 max-width로 줄어듭니다.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function Readout() {
  const width = useScreenWidth();
  const tailwind =
    width >= 1920 ? "xl" : width >= 1280 ? "lg" : width >= 768 ? "md" : width >= 480 ? "sm" : "base";
  const typeStep =
    width > 1920 ? "base type" : width > 1280 ? "≤1920 type" : width > 768 ? "≤1280 type" : "≤768 type";

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p className="h4">{width || "…"}px</p>
      <p className="body4 text-gray-20">
        Tailwind {tailwind} · {typeStep}
      </p>
    </div>
  );
}

export const Screens: Story = {
  render: () => (
    <div style={{ padding: 32 }}>
      <Guide>
        <GuideTitle eyebrow="Foundation">Breakpoints</GuideTitle>
        <GuideText>
          뷰포트 툴바에서 Site sm, md, lg, xl, base를 고르면 아래 숫자가 바뀝니다.
          iframe 너비가 window.innerWidth입니다.
        </GuideText>
        <Readout />
        <SpecTable
          headers={["이름", "값", "Tailwind", "비고"]}
          rows={[
            ["base", "<480", "기본", "타입은 ≤768 규칙"],
            ["sm", "480px", "min-width", "홈 인트로만 640px을 따로 씀"],
            ["md", "768px", "min-width", "타입 max-width 768과 같은 경계"],
            ["lg", "1280px", "min-width", "프로젝트 3열, 푸터 가로 배치"],
            ["xl", "1920px", "min-width", "타입 기본 크기는 1920 초과에서만"],
            ["menu", "1680px", "컴포넌트 내부", "Menu 간격만 사용"],
          ]}
        />
      </Guide>
    </div>
  ),
};
