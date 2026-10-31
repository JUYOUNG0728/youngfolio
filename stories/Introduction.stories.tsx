import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Guide, GuideText, GuideTitle, SpecTable } from "./ui";

const meta = {
  title: "Design System/Introduction",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "youngfolio에서 실제로 쓰이는 색, 글자, 간격, 컴포넌트를 추출한 디자인 시스템입니다. 새 팔레트나 없는 컴포넌트는 추가하지 않았습니다.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  name: "Overview",
  render: () => (
    <Guide>
      <GuideTitle eyebrow="YOUNGFOLIO">Design System</GuideTitle>
      <GuideText>
        Next.js 14, React 18, Tailwind CSS 3 위에 올린 포트폴리오입니다. 공통
        스타일은 styles/globals.css의 유틸리티 클래스이고, 값은
        styles/tokens.css의 CSS 변수로 모아 두었습니다. 페이지 마크업은 그대로라
        기존 화면의 클래스와 동작은 바뀌지 않습니다.
      </GuideText>
      <GuideText>
        화면의 기본 톤은 검정 배경(#101010)과 흰 글자입니다. 버튼과 입력은
        pill(rounded-full)이고, 제목은 Pretendard 700으로 크게 잡습니다. 밝은
        면은 About의 취미 섹션과 About Me 블록(gray-10)에만 나옵니다.
      </GuideText>

      <GuideTitle>토큰</GuideTitle>
      <GuideText>
        Primary는 파랑이 아닙니다. Button variant primary가 검정 면 / 흰
        글자이므로 primary는 #101010입니다. blue, green, shadow-1, glow-1은
        변수로만 있고 컴포넌트에서는 쓰이지 않습니다. 에러, 성공, 경고용 시맨틱
        색은 없습니다.
      </GuideText>
      <SpecTable
        headers={["항목", "기준"]}
        rows={[
          [
            "Colors",
            "gray 10–50, cool gray, black, white. blue/green은 미사용",
          ],
          [
            "Typography",
            "Pretendard. h1–h7, body1–body6. 기본 16px, tracking -0.3px",
          ],
          ["Spacing", "페이지 좌우 16 / 30 / 140. 헤더 lg만 70"],
          ["Radius", "pill이 기본. 카드 12, 패널 24, 말풍선 24–30"],
          ["Border", "1px gray-40/50 또는 white. 채팅 패널만 2px white/20"],
          ["Shadow", "shadow-1, glow-1 정의됨. 화면에서는 미사용"],
          ["Breakpoints", "sm 480, md 768, lg 1280, xl 1920 (min-width)"],
          ["Z-index", "페이지 10, 푸터 30, 메뉴 40, 헤더 50, 인트로 10000"],
        ]}
      />

      <GuideTitle>컴포넌트</GuideTitle>
      <SpecTable
        headers={["분류", "있는 것", "없는 것"]}
        rows={[
          ["Actions", "Button, 아이콘은 SVG 컴포넌트", "공통 Icon Button"],
          [
            "Forms",
            "SearchBar, InquiryInput",
            "Textarea, Select, Checkbox, Radio, Switch",
          ],
          ["Data", "Tag, MessageBubble의 점 아바타", "Badge, Avatar, Tooltip"],
          [
            "Navigation",
            "Header, Menu, SubHeader, Pagination",
            "Tabs, Breadcrumb",
          ],
          [
            "Feedback",
            "말풍선, 날짜 구분, bounce",
            "Modal, Toast, Alert, Spinner",
          ],
          [
            "Layout",
            "페이지 패딩과 카드 패턴",
            "Container, Grid, Divider 컴포넌트",
          ],
        ]}
      />

      <GuideTitle>맞춰 두면 좋은 곳</GuideTitle>
      <GuideText>추후 내용이 들어갑니다.</GuideText>
    </Guide>
  ),
};
