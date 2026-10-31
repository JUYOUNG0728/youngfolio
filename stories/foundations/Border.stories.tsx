import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Cluster, Guide, GuideText, GuideTitle } from "../ui";

const meta = {
  title: "Design System/Foundations/Border",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "기본 선은 1px입니다. 채팅 패널만 2px white/20입니다. 구분선은 border-t로 그리고, 별도 Divider 컴포넌트는 없습니다.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const borders = [
  ["1px solid var(--gray-40)", "푸터 상단, 페이지네이션, 유저 목록"],
  ["1px solid var(--gray-50)", "프로젝트 카드 썸네일"],
  ["1px solid var(--white)", "히어로 칩, secondary outline 버튼"],
  ["1px solid var(--black)", "primary outline 버튼"],
  ["1px solid var(--overlay-white-15)", "About 정의 리스트"],
  ["1px solid var(--overlay-black-10)", "취미 섹션 행"],
  ["2px solid var(--overlay-white-20)", "채팅 패널"],
] as const;

export const Styles: Story = {
  render: () => (
    <Guide>
      <GuideTitle eyebrow="Foundation">Border</GuideTitle>
      <GuideText>
        선 색은 면의 밝기에 따라 gray-40, gray-50, white, black 중에서 고릅니다.
        outline 버튼의 선은 호버 시 면 색으로 채워지며 사라집니다.
      </GuideText>
      <Cluster>
        {borders.map(([border, usage]) => (
          <figure key={usage} style={{ width: 220 }}>
            <div style={{ height: 88, border, borderRadius: "var(--radius-xl)" }} />
            <figcaption className="body6 text-gray-30" style={{ marginTop: 10 }}>
              {usage}
            </figcaption>
          </figure>
        ))}
      </Cluster>
    </Guide>
  ),
};
