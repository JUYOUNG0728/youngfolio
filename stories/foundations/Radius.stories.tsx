import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Cluster, Guide, GuideText, GuideTitle } from "../ui";

const meta = {
  title: "Design System/Foundations/Radius",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "버튼, 입력, 페이지네이션, 헤더 메뉴 버튼은 pill입니다. 카드와 패널만 고정 radius를 씁니다.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const radii = [
  ["--radius-sm", "4px", "rounded", "관리자 비밀번호 입력"],
  ["--radius-md", "6px", "rounded-md", "홈 프로젝트 호버 썸네일"],
  ["--radius-lg", "8px", "rounded-lg", "채팅 첨부 이미지"],
  ["--radius-xl", "12px", "rounded-xl", "프로젝트 카드, 유저 목록, 스킬 타일"],
  ["--radius-2xl", "16px", "rounded-2xl", "관리자 로그인 카드"],
  ["--radius-3xl", "24px", "rounded-3xl", "채팅 패널, 말풍선, 피드, About 이미지"],
  ["--radius-bubble", "30px", "rounded-[30px]", "xl 말풍선"],
  ["--radius-full", "9999px", "rounded-full", "버튼, 입력, 칩, 아이콘 버튼"],
] as const;

export const Scale: Story = {
  render: () => (
    <Guide>
      <GuideTitle eyebrow="Foundation">Radius</GuideTitle>
      <GuideText>
        Tailwind 기본 radius와 같습니다. 토큰은 그 값을 이름만 붙인 것이고,
        컴포넌트 클래스는 바꾸지 않았습니다. pill이 이 사이트의 기본 모서리입니다.
      </GuideText>
      <Cluster>
        {radii.map(([token, size, utility, usage]) => (
          <figure key={token} style={{ width: 180 }}>
            <div
              className="bg-gray-10"
              style={{
                height: token === "--radius-full" ? 72 : 96,
                borderRadius: `var(${token})`,
              }}
            />
            <figcaption style={{ display: "grid", gap: 4, marginTop: 10 }}>
              <span className="body6">{utility}</span>
              <span className="body6 text-gray-30">
                {size} · {usage}
              </span>
            </figcaption>
          </figure>
        ))}
      </Cluster>
    </Guide>
  ),
};
