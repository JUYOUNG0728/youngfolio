import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import MessageBubble from "@/components/Contact/MessageBubble";

import { GuideText } from "../ui";

const meta = {
  title: "Design System/Components/Feedback",
  component: MessageBubble,
  tags: ["autodocs"],
  args: {
    text: "안녕하세요. 프로젝트 문의드립니다.",
    image_url: null,
    sender: "admin",
    timestamp: "2026-10-31T02:12:00.000Z",
    showTime: true,
    isAdminPage: false,
    showProfile: true,
  },
  argTypes: {
    sender: {
      control: "select",
      options: ["admin", "user"],
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Modal, Toast, Alert, Spinner 컴포넌트는 없습니다. 오류는 \`window.alert\`입니다.

메시지 피드백은 MessageBubble입니다. 방문자가 보면 관리자 글은 왼쪽 cool-gray, 내 글은 오른쪽 gray-10입니다. 프로필은 12px(xl 14px) 점과 이름입니다. 말풍선 radius는 24px, xl에서 30px. 타임스탬프는 body6 gray-30.

날짜 구분은 \`.messageBubble\` 클래스입니다. 로딩에 가까운 모션은 \`.bouncing\`과 홈 인트로의 점 세 개뿐이고, 공통 Spinner는 아닙니다. 메뉴가 열릴 때의 어두운 면은 \`.bg-fade-in\`입니다.
        `,
      },
    },
  },
} satisfies Meta<typeof MessageBubble>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FromYoung: Story = {
  args: { sender: "admin", showProfile: true },
};

export const FromVisitor: Story = {
  args: {
    sender: "user",
    text: "카카오 웹 작업 과정이 궁금합니다.",
    showProfile: true,
  },
};

export const ImageOnly: Story = {
  name: "Image",
  args: {
    text: "",
    image_url: "/images/img-book1.jpg",
    sender: "user",
    showProfile: false,
  },
};

export const Thread: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 720 }}>
      <div className="messageBubble">2026년 10월 31일</div>
      <MessageBubble
        text="안녕하세요. 프로젝트 문의드립니다."
        image_url={null}
        sender="user"
        timestamp="2026-10-31T02:12:00.000Z"
        showTime
        showProfile
        isAdminPage={false}
      />
      <MessageBubble
        text="안녕하세요. 어떤 작업이 궁금하신가요?"
        image_url={null}
        sender="admin"
        timestamp="2026-10-31T02:14:00.000Z"
        showTime
        showProfile
        isAdminPage={false}
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <GuideText>
        bounce 유틸리티입니다. 공통 스피너로 쓰지 않고, 홈의 일부 모션에만
        연결되어 있습니다.
      </GuideText>
      <div className="flex gap-3 items-center">
        <div className="bouncing w-3 h-3 rounded-full bg-white" />
        <span className="body6 text-gray-30">.bouncing</span>
      </div>
    </div>
  ),
};

export const Scrim: Story = {
  name: "Menu scrim",
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <GuideText>
        메뉴 배경입니다. 0.8초 동안 투명에서 black 80%로 채워집니다.
      </GuideText>
      <div className="bg-fade-in relative" style={{ height: 160, borderRadius: 16 }} />
    </div>
  ),
};
