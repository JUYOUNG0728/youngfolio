import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Guide, GuideText, GuideTitle, SpecTable } from "../ui";

const meta = {
  title: "Design System/Foundations/Z-Index",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "전역 스택은 홈 섹션, 히어로, 푸터, 메뉴, 헤더, 커서, 인트로 순서입니다. Growth Journey의 z-index 1–3은 그 섹션 안에서만 의미 있습니다.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const layers = [
  ["--z-base", "0", "홈 sticky 섹션"],
  ["--z-hero", "1", "히어로 텍스트"],
  ["--z-hero-glass", "2", "HeroGlass"],
  ["--z-hero-front", "3", "히어로 칩, 카피"],
  ["--z-page", "10", "홈에서 히어로 위에 올라오는 섹션"],
  ["--z-footer", "30", "Footer"],
  ["--z-overlay", "40", "Menu 스크림"],
  ["--z-header", "50", "Header"],
  ["--z-cursor", "9999", "FollowCursor"],
  ["--z-intro", "10000", "HomeIntro"],
];

export const Stack: Story = {
  render: () => (
    <Guide>
      <GuideTitle eyebrow="Foundation">Z-Index</GuideTitle>
      <GuideText>
        컴포넌트는 z-10, z-30처럼 Tailwind 클래스를 직접 씁니다. 토큰은 그 숫자를
        문서로 고정한 값이고, 클래스에 연결하지는 않았습니다.
      </GuideText>
      <div style={{ position: "relative", height: 280 }}>
        {layers.slice(0, 6).map(([token, value], index) => (
          <div
            key={token}
            className="body6"
            style={{
              position: "absolute",
              left: index * 28,
              top: index * 36,
              zIndex: Number(value),
              minWidth: 220,
              padding: "12px 16px",
              borderRadius: "var(--radius-xl)",
              background: index % 2 === 0 ? "var(--gray-50)" : "var(--white)",
              color: index % 2 === 0 ? "var(--white)" : "var(--black)",
            }}
          >
            {token} · {value}
          </div>
        ))}
      </div>
      <SpecTable headers={["Token", "값", "쓰는 곳"]} rows={layers} />
    </Guide>
  ),
};
