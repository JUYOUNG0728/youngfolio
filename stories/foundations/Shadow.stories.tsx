import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Cluster, Guide, GuideText, GuideTitle } from "../ui";

const meta = {
  title: "Design System/Foundations/Shadow",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "shadow-1과 glow-1, blur-1, blur-2는 globals에 있지만 컴포넌트 className에서는 쓰이지 않습니다. 실제로 보이는 흐림은 프로젝트 호버의 backdrop-filter blur(10px)입니다.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Elevation: Story = {
  render: () => (
    <Guide>
      <GuideTitle eyebrow="Foundation">Shadow</GuideTitle>
      <GuideText>
        현재 UI는 그림자로 깊이를 만들지 않고, 색 반전과 테두리로 층을 나눕니다.
        아래는 정의해 둔 값입니다. 카드에 이 그림자를 새로 넣지는 않았습니다.
      </GuideText>
      <Cluster>
        <figure>
          <div
            className="bg-gray-10"
            style={{
              width: 180,
              height: 120,
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-1)",
            }}
          />
          <figcaption className="body6 text-gray-30" style={{ marginTop: 16 }}>
            shadow-1 · 0 0 20px #00000040 · 미사용
          </figcaption>
        </figure>
        <figure>
          <div
            className="bg-black"
            style={{
              width: 180,
              height: 120,
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--glow-1)",
              border: "1px solid var(--gray-50)",
            }}
          />
          <figcaption className="body6 text-gray-30" style={{ marginTop: 16 }}>
            glow-1 · 0 0 40px 10px #ffffff40 · 미사용
          </figcaption>
        </figure>
        <figure>
          <div
            className="bg-white/30 text-black body6 flex items-center justify-center"
            style={{
              width: 180,
              height: 120,
              borderRadius: "var(--radius-xl)",
              backdropFilter: "var(--blur-overlay)",
            }}
          >
            blur 10px
          </div>
          <figcaption className="body6 text-gray-30" style={{ marginTop: 16 }}>
            홈 프로젝트 호버 오버레이
          </figcaption>
        </figure>
      </Cluster>
    </Guide>
  ),
};
