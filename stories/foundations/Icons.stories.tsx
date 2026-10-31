import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Image from "next/image";

import Arrow from "@/components/Common/Arrow";
import Close from "@/components/Common/Close";
import Hamburger from "@/components/Common/Hamburger";
import Logo from "@/components/Common/Logo";
import Plus from "@/components/Common/Plus";
import Send from "@/components/Common/Send";
import SnsItems from "@/components/Contact/SnsItems";

import { Cluster, Guide, GuideText, GuideTitle } from "../ui";

const meta = {
  title: "Design System/Foundations/Icons",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "아이콘은 공용 SVG 컴포넌트와 public/images PNG 두 종류입니다. 크기와 색은 호출부에서 width, height, fill로 넘깁니다. 공통 Icon 래퍼는 없습니다.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function IconCard({
  name,
  size,
  children,
}: {
  name: string;
  size: string;
  children: ReactNode;
}) {
  return (
    <figure
      className="flex flex-col items-center gap-3"
      style={{ width: 120, padding: 16 }}
    >
      <div className="flex items-center justify-center" style={{ height: 48 }}>
        {children}
      </div>
      <figcaption className="body6 text-center text-gray-30">
        {name}
        <br />
        {size}
      </figcaption>
    </figure>
  );
}

const raster = [
  ["/images/icon-search.png", "search"],
  ["/images/icon-home.png", "home"],
  ["/images/icon-copy.png", "copy"],
  ["/images/icon-mouse-scroll.png", "scroll"],
  ["/images/icon-github.png", "github"],
  ["/images/icon-behance.png", "behance"],
  ["/images/icon-mail.png", "mail"],
];

export const Set: Story = {
  render: () => (
    <Guide>
      <GuideTitle eyebrow="Foundation">Icons</GuideTitle>
      <GuideText>
        헤더 아이콘은 20 / 24 / 30, 푸터 화살표도 같습니다. 채팅 plus는 13 / 16,
        send는 18 / 20, 첨부 삭제 Close는 14입니다. fill은 면 색의 반대로
        #000000 또는 #ffffff를 넘깁니다.
      </GuideText>
      <Cluster>
        <IconCard name="Logo" size="150×24">
          <Logo width={150} height={24} fill="#ffffff" />
        </IconCard>
        <IconCard name="Hamburger" size="24">
          <Hamburger width={24} height={24} fill="#ffffff" />
        </IconCard>
        <IconCard name="Close" size="24">
          <Close width={24} height={24} fill="#ffffff" />
        </IconCard>
        <IconCard name="Arrow" size="24">
          <Arrow width={24} height={24} fill="#ffffff" />
        </IconCard>
        <IconCard name="Plus" size="16">
          <Plus width={16} height={16} fill="#ffffff" stroke="3" />
        </IconCard>
        <IconCard name="Send" size="20">
          <Send width={20} height={20} fill="#ffffff" />
        </IconCard>
      </Cluster>
      <GuideTitle>PNG</GuideTitle>
      <GuideText>
        검색, 홈, 복사, SNS는 비트맵입니다. 스킬 로고도 public/images/skills의
        PNG를 쓰고, 흰 20% 타일 안에 넣습니다.
      </GuideText>
      <Cluster>
        {raster.map(([src, name]) => (
          <IconCard key={name} name={name} size="24">
            <Image src={src} alt={name} width={24} height={24} />
          </IconCard>
        ))}
        <IconCard name="skill tile" size="56">
          <div className="flex h-14 w-14 items-center justify-center bg-white/20 rounded-xl">
            <Image
              src="/images/skills/figma.png"
              alt="Figma"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
          </div>
        </IconCard>
      </Cluster>
      <GuideTitle>SNS row</GuideTitle>
      <div className="bg-gray-50/10 flex justify-center items-center" style={{ width: 270, height: 80, borderRadius: 9999 }}>
        <SnsItems />
      </div>
    </Guide>
  ),
};
