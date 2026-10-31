import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import Arrow from "@/components/Common/Arrow";
import Button from "@/components/Common/Button";

import { GuideText } from "../ui";

const meta = {
  title: "Design System/Components/Buttons",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "About Me",
    variant: "primary",
    size: "lg",
    circleButton: false,
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "primary-outline", "secondary-outline"],
    },
    size: {
      control: "select",
      options: ["xl", "lg", "md", "sm"],
    },
    circleButton: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component: `
공통 Button입니다. pill(\`rounded-full\`), weight 600, hover 300ms에 면과 글자가 반전됩니다.

| Variant | 기본 | Hover | 실제 사용 |
| --- | --- | --- | --- |
| primary | 검정 면, 흰 글자 | 흰 면, 검정 글자 | 정의됨. 페이지에서는 outline을 씀 |
| secondary | 흰 면, 검정 글자 | 검정 면, 흰 글자 | 관리자 로그인. className으로 radius를 덮어씀 |
| primary-outline | 투명, 검정 선 | 검정 면 | About Me 원형 화살표. gray-10 위 |
| secondary-outline | 투명, 흰 선 | 흰 면 | 어두운 면용. 현재 페이지 미사용 |

크기 xl / lg / md / sm은 글자 단계(h3, h4, body2, body4)와 패딩이 같이 커집니다. 원형일 때는 가로 패딩 대신 너비와 높이가 커지고, sm부터 xl 브레이크포인트마다 다시 커집니다.

Disabled, error, active 스타일은 없습니다. focus ring도 없습니다. 키보드 포커스는 브라우저 기본 outline에 맡깁니다. 전송 버튼의 disabled는 InquiryInput 안에만 있습니다.
        `,
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <GuideText>
        왼쪽은 gray-10(About Me), 오른쪽은 black(기본 페이지)입니다. outline은
        같은 색 면 위에 두면 선이 사라집니다.
      </GuideText>
      <div className="bg-gray-10 text-black flex flex-wrap gap-4" style={{ padding: 24 }}>
        <Button variant="primary" size="md">Primary</Button>
        <Button variant="secondary" size="md">Secondary</Button>
        <Button variant="primary-outline" size="md">Primary outline</Button>
        <Button variant="secondary-outline" size="md">Secondary outline</Button>
      </div>
      <div className="bg-black text-white flex flex-wrap gap-4" style={{ padding: 24 }}>
        <Button variant="primary" size="md">Primary</Button>
        <Button variant="secondary" size="md">Secondary</Button>
        <Button variant="primary-outline" size="md">Primary outline</Button>
        <Button variant="secondary-outline" size="md">Secondary outline</Button>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="bg-gray-10 text-black flex flex-wrap items-center gap-4" style={{ padding: 24 }}>
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <Button key={size} variant="primary" size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

export const Hover: Story = {
  name: "Hover",
  render: () => (
    <div className="bg-gray-10 text-black flex flex-wrap items-center gap-8" style={{ padding: 24 }}>
      <div style={{ display: "grid", gap: 8 }}>
        <span className="body6 text-gray-40">Default</span>
        <Button variant="primary-outline" size="lg">View</Button>
      </div>
      <div className="force-hover" style={{ display: "grid", gap: 8 }}>
        <style>{`
          .force-hover button {
            background: #101010 !important;
            color: #ffffff !important;
            border-color: #101010 !important;
          }
        `}</style>
        <span className="body6 text-gray-40">Hover / Active 대용</span>
        <Button variant="primary-outline" size="lg">View</Button>
      </div>
    </div>
  ),
};

export const Circle: Story = {
  name: "Circle / About Me",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "About Me에서 쓰는 형태입니다. 뷰포트를 바꾸면 원 크기가 16→20→24→28 단위로 커집니다. lg 기준 32px 화살표가 들어갑니다.",
      },
    },
  },
  render: () => (
    <div className="bg-gray-10 text-black flex items-center justify-center" style={{ minHeight: 320 }}>
      <Button variant="primary-outline" size="lg" circleButton>
        <Arrow width={32} height={32} fill="currentColor" className="rotate-[225deg]" />
      </Button>
    </div>
  ),
};

export const Focus: Story = {
  name: "Focus",
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <GuideText>
        Tab으로 포커스를 옮겨 보세요. 컴포넌트에 focus-visible 스타일은 없고,
        브라우저 기본 outline만 보일 수 있습니다.
      </GuideText>
      <Button variant="secondary" size="md">Focus me</Button>
    </div>
  ),
};
