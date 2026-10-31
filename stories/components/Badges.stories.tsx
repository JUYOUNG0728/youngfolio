import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Tag from "@/components/About/Tag";

import { GuideText } from "../ui";

const meta = {
  title: "Design System/Components/Badges",
  component: Tag,
  tags: ["autodocs"],
  args: {
    tag: "인터랙티브",
  },
  parameters: {
    docs: {
      description: {
        component: `
Badge 컴포넌트는 없습니다. 가까운 요소는 두 가지이고 규칙이 다릅니다.

Tag는 취미 섹션 전용입니다. \`# \` 접두사, body4, weight 500, \`text-black/75\`. 밝은 면(gray-10)에서만 읽힙니다.

히어로 칩은 컴포넌트가 아닙니다. 흰 1px 선, pill, 좌우 24px, 상하 16px, 흰 글자. 어두운 히어로 하단에서만 씁니다.
        `,
      },
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="bg-gray-10 text-black" style={{ padding: 24 }}>
      <Tag {...args} />
    </div>
  ),
};

export const HobbyTags: Story = {
  name: "Hobby tags",
  render: () => (
    <div className="bg-gray-10 text-black flex flex-col gap-2" style={{ padding: 24 }}>
      <Tag tag="듣는 걸 제일 좋아하고, 직접 연주하는 것도 좋아해요." />
      <Tag tag="에세이나 인문학 책을 즐겨 읽어요." />
    </div>
  ),
};

export const HeroChips: Story = {
  name: "Hero chips",
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <GuideText>
        VisualSection 하단 칩입니다. md 이상에서만 보이고, 여기에서는 항상
        보여 형태를 확인합니다.
      </GuideText>
      <div className="flex gap-3 flex-wrap">
        <span className="border border-white px-6 py-4 rounded-full">
          DESIGNER JUYOUNG
        </span>
        <span className="border border-white px-6 py-4 rounded-full">
          PORTFOLIO WEBSITE
        </span>
      </div>
    </div>
  ),
};
