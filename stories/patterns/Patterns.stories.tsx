import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Arrow from "@/components/Common/Arrow";
import Close from "@/components/Common/Close";
import Hamburger from "@/components/Common/Hamburger";
import Plus from "@/components/Common/Plus";
import Send from "@/components/Common/Send";
import InquiryChat from "@/components/Contact/InquiryChat";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import ProjectItem from "@/components/Projects/ProjectItem";
import { projects } from "@/data/projects";
import type { Message } from "@/types/inquiry";

import { Guide, GuideText, GuideTitle } from "../ui";

const meta = {
  title: "Design System/Patterns",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "페이지에 반복되지만 컴포넌트로 분리되지 않은 조합입니다. 마크업은 기존 클래스를 그대로 사용합니다.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const framed = {
  docs: { story: { inline: false, iframeHeight: 720 } },
};

const seed: Message[] = [
  {
    id: "1",
    uid: "guest",
    text: "안녕하세요. 포트폴리오 보고 연락드립니다.",
    image_url: null,
    timestamp: "2026-10-31T02:00:00.000Z",
    sender: "user",
  },
  {
    id: "2",
    uid: "guest",
    text: "안녕하세요. 어떤 프로젝트가 궁금하신가요?",
    image_url: null,
    timestamp: "2026-10-31T02:01:00.000Z",
    sender: "admin",
  },
];

export const PagePadding: Story = {
  name: "Page padding",
  parameters: framed,
  render: () => (
    <div style={{ display: "grid", gap: 24, padding: 24 }}>
      <Guide>
        <GuideTitle eyebrow="Pattern">Page padding</GuideTitle>
        <GuideText>
          본문은 16 / 30 / 140입니다. 헤더와 푸터의 lg는 70입니다. 뷰포트를
          바꾸면 안쪽 흰 막대의 여유가 달라집니다.
        </GuideText>
      </Guide>
      <div className="bg-white/10 px-[16px] md:px-[30px] lg:px-[140px]" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <div className="bg-white text-black body6" style={{ padding: 16 }}>
          Content
        </div>
      </div>
      <div className="bg-white/10 px-[16px] md:px-[30px] lg:px-[70px]" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <div className="bg-white text-black body6" style={{ padding: 16 }}>
          Header / Footer lg
        </div>
      </div>
    </div>
  ),
};

export const IconButtons: Story = {
  name: "Icon buttons",
  render: () => (
    <Guide>
      <GuideTitle eyebrow="Pattern">Icon buttons</GuideTitle>
      <GuideText>
        공통 IconButton은 없습니다. 아래는 헤더, 푸터, 첨부 삭제, 채팅 전송에
        각각 들어간 원형 버튼입니다. 크기 체계가 서로 다릅니다.
      </GuideText>
      <div className="flex flex-wrap items-center gap-8">
        <div style={{ display: "grid", gap: 8, justifyItems: "center" }}>
          <button className="bg-white rounded-full p-4 flex justify-center items-center" type="button" aria-label="메뉴">
            <Hamburger width={24} height={24} fill="#000000" />
          </button>
          <span className="body6 text-gray-30">Header p-4</span>
        </div>
        <div style={{ display: "grid", gap: 8, justifyItems: "center" }}>
          <button className="rounded-full w-12 h-12 bg-gray-50 flex justify-center items-center lg:w-16 lg:h-16 xl:w-20 xl:h-20" type="button" aria-label="맨 위로">
            <Arrow width={24} height={24} fill="#ffffff" className="rotate-180" />
          </button>
          <span className="body6 text-gray-30">Footer 48–80</span>
        </div>
        <div style={{ display: "grid", gap: 8, justifyItems: "center" }}>
          <button className="bg-black w-7 h-7 rounded-full flex justify-center items-center border border-gray-40" type="button" aria-label="첨부 삭제">
            <Close width={14} height={14} fill="#ffffff" />
          </button>
          <span className="body6 text-gray-30">Remove 28</span>
        </div>
        <div className="flex items-center gap-2" style={{ height: 48 }}>
          <div className="bg-gray-40 rounded-full flex justify-center items-center" style={{ width: 36, height: 36 }}>
            <Plus width={13} height={13} fill="#ffffff" stroke="3" />
          </div>
          <button className="w-16 h-full bg-black rounded-full flex items-center justify-center" type="button" aria-label="전송">
            <Send width={18} height={18} fill="#ffffff" />
          </button>
        </div>
      </div>
    </Guide>
  ),
};

export const SectionIntro: Story = {
  name: "Section intro",
  render: () => (
    <div style={{ display: "grid", gap: 40, padding: 8 }}>
      <div>
        <p className="text-xs font-medium tracking-[0.22em] text-gray-30">
          PROFILE
        </p>
        <h2 className="mt-5 text-[2.25rem] font-semibold leading-[0.95] tracking-[-0.04em] md:text-[3rem] lg:text-[3.75rem]">
          About the work
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-5 border-t border-white/15 py-8 md:grid-cols-[9.5rem_1fr] md:gap-12">
        <h3 className="text-xs font-medium tracking-[0.2em] text-gray-30">
          FOCUS
        </h3>
        <p className="body4 text-gray-20">
          About 페이지의 eyebrow와 정의 리스트 행입니다. eyebrow tracking은
          0.22em, 행 라벨은 0.2em으로 살짝 다릅니다.
        </p>
      </div>
    </div>
  ),
};

function ChatDemo() {
  const [messages, setMessages] = useState(seed);

  return (
    <div style={{ height: "100vh", padding: 24 }}>
      <InquiryChat
        messages={messages}
        isAdminPage={false}
        handleSend={async ({ text }) => {
          setMessages((current) => [
            ...current,
            {
              id: String(current.length + 1),
              uid: "guest",
              text,
              image_url: null,
              timestamp: new Date().toISOString(),
              sender: "user",
            },
          ]);
        }}
      />
    </div>
  );
}

export const ChatThread: Story = {
  name: "Chat thread",
  parameters: framed,
  render: () => <ChatDemo />,
};

export const ProjectGrid: Story = {
  name: "Project grid",
  parameters: framed,
  render: () => (
    <div className="w-full text-white px-[16px] gap-y-10 gap-x-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-[30px] lg:px-[140px]" style={{ paddingTop: 32, paddingBottom: 48 }}>
      {projects.slice(0, 3).map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  ),
};

export const SiteChrome: Story = {
  name: "Site chrome",
  parameters: framed,
  render: () => (
    <div className="relative bg-black text-white" style={{ minHeight: "100vh" }}>
      <Header />
      <div className="px-[16px] md:px-[30px] lg:px-[140px]" style={{ paddingTop: 180, paddingBottom: 80 }}>
        <p className="body2">페이지 내용</p>
        <p className="body4 text-gray-30" style={{ marginTop: 12 }}>
          헤더 버튼으로 메뉴를 열 수 있습니다. 푸터의 화살표는 맨 위로 스크롤합니다.
        </p>
      </div>
      <Footer />
    </div>
  ),
};
