import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SubHeader from "@/components/Common/SubHeader";
import UserListPanel from "@/components/Admin/UserListPanel";
import Header from "@/components/Layout/Header";
import Menu from "@/components/Layout/Menu";
import Pagination from "@/components/Projects/Pagination";

import { GuideText } from "../ui";

const meta = {
  title: "Design System/Components/Navigation",
  component: Pagination,
  tags: ["autodocs"],
  args: {
    activePage: 1,
    itemsCountPerPage: 6,
    totalItemsCount: 24,
    handlePageChange: () => undefined,
  },
  parameters: {
    docs: {
      description: {
        component: `
Tabs와 Breadcrumb 컴포넌트는 없습니다.

- Header: 로고와 흰 pill 메뉴 버튼. 버튼은 fixed, 바는 absolute.
- Menu: 전체 화면 스크림(black 80%, 0.8s). 항목 hover 시 밑줄. 번호는 body2 gray-20. 1680px 미만에서는 너비가 calc(100% - 1200px)라 좁은 화면에서 항목이 잘립니다.
- SubHeader: 홈 아이콘과 \`HOME > PAGE\`, 그 아래 h2. 위 240px은 고정 헤더를 비우는 값입니다.
- Pagination: pill, gray-40 선, 활성 항목만 흰 면 / 검정 글자. 첫·마지막 페이지 버튼은 숨깁니다.
- UserListPanel: 관리자 대화 목록. 선택 항목은 흰 면, 나머지는 white/5.
        `,
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

const framed = {
  layout: "fullscreen" as const,
  docs: { story: { inline: false, iframeHeight: 640 } },
};

function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={6}
      totalItemsCount={24}
      handlePageChange={setPage}
    />
  );
}

export const Pages: Story = {
  name: "Pagination",
  render: () => <PaginationDemo />,
};

export const PageTitle: Story = {
  name: "SubHeader",
  parameters: framed,
  render: () => (
    <div className="px-[16px] md:px-[30px] lg:px-[140px]">
      <GuideText>
        위쪽 빈 공간 240px은 헤더와 겹치지 않으려는 offset입니다.
      </GuideText>
      <SubHeader page="Projects" />
    </div>
  ),
};

export const SiteHeader: Story = {
  name: "Header",
  parameters: framed,
  render: () => (
    <div className="relative bg-black" style={{ minHeight: 640 }}>
      <Header />
      <p className="body4" style={{ padding: "160px 24px 24px" }}>
        오른쪽 버튼으로 메뉴를 엽니다. 로고는 홈으로 이동합니다.
      </p>
    </div>
  ),
};

export const MenuOverlay: Story = {
  name: "Menu",
  parameters: framed,
  render: () => <Menu setIsMenuOpen={() => undefined} />,
};

function UserListDemo() {
  const [activeUid, setActiveUid] = useState("guest-01");
  return (
    <div className="flex bg-black" style={{ height: 560 }}>
      <UserListPanel
        uids={["guest-01", "guest-02", "guest-03"]}
        activeUid={activeUid}
        setActiveUid={setActiveUid}
      />
    </div>
  );
}

export const ChatList: Story = {
  name: "User list",
  parameters: framed,
  render: () => <UserListDemo />,
};
