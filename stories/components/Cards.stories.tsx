import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Feed from "@/components/About/Feed";
import ProjectItem from "@/components/Projects/ProjectItem";
import { projects } from "@/data/projects";

import { GuideText } from "../ui";

const project = projects[0];

const meta = {
  title: "Design System/Components/Cards",
  component: ProjectItem,
  tags: ["autodocs"],
  args: {
    project,
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
프로젝트 목록 카드입니다. 썸네일은 40vh, \`rounded-xl\`, \`border-gray-50\`. 제목은 h6에 weight를 500으로 덮어씁니다. 설명은 text-sm. 클릭하면 프로젝트 링크가 새 탭으로 열립니다.

홈의 가로 스크롤 카드는 ProjectSection 안에 있고, 호버 시 blur(10px) 오버레이가 뜹니다. 그 카드는 컴포넌트로 분리되어 있지 않습니다.

피드 타일은 \`rounded-3xl\`, 정사각, 2열입니다. 취미 섹션에서만 씁니다.
        `,
      },
    },
  },
} satisfies Meta<typeof ProjectItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Project: Story = {
  render: (args) => (
    <div style={{ width: "min(100%, 420px)", padding: 24 }}>
      <ProjectItem {...args} />
    </div>
  ),
};

export const ProjectGrid: Story = {
  name: "Project grid",
  parameters: {
    docs: {
      description: {
        story:
          "Projects 페이지와 같은 그리드입니다. 1열, md 2열, lg 3열. 좌우 패딩은 16 / 30 / 140. 뷰포트 툴바로 열 수를 바꿀 수 있습니다.",
      },
    },
  },
  render: () => (
    <div className="w-full text-white px-[16px] gap-y-10 gap-x-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-[30px] lg:px-[140px]" style={{ paddingTop: 32, paddingBottom: 32 }}>
      {projects.slice(0, 3).map((item) => (
        <ProjectItem key={item.id} project={item} />
      ))}
    </div>
  ),
};

export const Empty: Story = {
  name: "Empty search",
  render: () => (
    <div style={{ padding: 32 }}>
      <GuideText>검색 결과가 없을 때 Projects 페이지가 보여주는 문장입니다.</GuideText>
      <p className="text-center body4" style={{ marginTop: 40 }}>
        검색 결과가 없습니다.
      </p>
    </div>
  ),
};

export const FeedTiles: Story = {
  name: "Feed tiles",
  render: () => (
    <div style={{ width: "min(100%, 640px)", padding: 24 }}>
      <Feed
        hobby={{
          name: "BOOKS",
          tags: [],
          video: false,
          links: ["/images/img-book1.jpg", "/images/img-book2.jpg"],
        }}
      />
    </div>
  ),
};
