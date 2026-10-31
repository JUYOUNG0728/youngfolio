import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import InquiryInput from "@/components/Contact/InquiryInput";
import SearchBar from "@/components/Projects/SearchBar";

import { GuideText } from "../ui";

const meta = {
  title: "Design System/Components/Inputs",
  component: SearchBar,
  tags: ["autodocs"],
  args: {
    searchTerm: "",
    handleSearch: () => undefined,
  },
  parameters: {
    docs: {
      description: {
        component: `
입력은 두 컴포넌트와 한 개의 인라인 필드입니다. Textarea, Select, Checkbox, Radio, Switch는 없습니다.

검색과 채팅 입력은 같은 규칙입니다. gray-10 면, pill, 검정 글자, placeholder gray-50, body4, focus outline 없음. 높이는 py-3, xl에서 py-4. 왼쪽 패딩은 24 / 32 / 40px.

에러 스타일은 없습니다. 이미지가 아닌 파일을 올리면 \`window.alert\`가 뜹니다. 관리자 비밀번호 오류도 alert입니다.

채팅 전송 버튼은 글자와 이미지가 없을 때 disabled입니다. 클래스 \`opacity-15\`는 Tailwind 기본 스케일에 없어서 투명도는 적용되지 않고, \`cursor-not-allowed\`와 disabled 속성만 동작합니다.
        `,
      },
    },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

function SearchDemo() {
  const [value, setValue] = useState("");
  return (
    <div style={{ width: "min(100%, 420px)" }}>
      <SearchBar
        searchTerm={value}
        handleSearch={(event) => setValue(event.target.value)}
      />
    </div>
  );
}

export const Search: Story = {
  render: () => <SearchDemo />,
};

export const SearchFilled: Story = {
  name: "Search filled",
  render: () => (
    <div style={{ width: "min(100%, 420px)" }}>
      <SearchBar searchTerm="카카오" handleSearch={() => undefined} />
    </div>
  ),
};

function ChatInputDemo() {
  const [log, setLog] = useState<string[]>([]);

  return (
    <div style={{ display: "grid", gap: 16, width: "min(100%, 720px)" }}>
      <InquiryInput
        handleSend={({ text }) => {
          setLog((prev) => [...prev, text]);
        }}
      />
      {log.length > 0 ? (
        <ul className="body6 text-gray-20" style={{ display: "grid", gap: 8 }}>
          {log.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="body6 text-gray-30">
          비어 있으면 전송이 막힙니다. 글을 입력하고 Enter 또는 전송을 눌러 보세요.
        </p>
      )}
    </div>
  );
}

export const Chat: Story = {
  name: "Chat input",
  render: () => <ChatInputDemo />,
};

export const AdminPassword: Story = {
  name: "Admin password",
  render: () => (
    <div style={{ display: "grid", gap: 12, width: "min(100%, 420px)" }}>
      <GuideText>
        관리자 로그인만 다른 입력입니다. pill이 아니고, 검정 면, gray-40 1px 선,
        radius 4px, 패딩 16px입니다. 공통 Input으로 빼지 않았습니다.
      </GuideText>
      <div className="flex flex-col gap-5 bg-white/10 p-10 rounded-2xl">
        <h1 className="h6">관리자 로그인</h1>
        <input
          type="password"
          className="p-4 rounded bg-black text-white border border-gray-40"
          placeholder="비밀번호 입력"
          aria-label="비밀번호"
        />
      </div>
    </div>
  ),
};
