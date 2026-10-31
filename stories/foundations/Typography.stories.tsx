import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import useScreenWidth from "@/utils/useScreenWidth";

import { Guide, GuideText, GuideTitle, SpecTable } from "../ui";

const meta = {
  title: "Design System/Foundations/Typography",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "글꼴은 Pretendard입니다. h1–h7과 body1–body6가 스케일이고, 뷰포트를 바꾸면 max-width 규칙에 따라 크기가 줄어듭니다. 2048px 이상에서만 기본(가장 큰) 크기가 보입니다.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const scale = [
  ["h1", "10rem", "8rem", "6rem", "4rem", "700", "1"],
  ["h2", "5.5rem", "4.5rem", "3.5rem", "2.5rem", "700", "1"],
  ["h3", "3rem", "2.5rem", "2rem", "1.75rem", "700", "1"],
  ["h4", "2.25rem", "1.75rem", "1.5rem", "1.25rem", "700", "1"],
  ["h5", "1.875rem", "1.5rem", "1.25rem", "1.125rem", "700", "1"],
  ["h6", "1.75rem", "1.375rem", "1.125rem", "1rem", "700", "1"],
  ["h7", "1.5rem", "1.25rem", "1rem", "0.875rem", "700", "1"],
  ["body1", "5rem", "4.5rem", "3.5rem", "2.5rem", "400", "1.3"],
  ["body2", "1.5rem", "1.25rem", "1rem", "1rem", "400", "1.7"],
  ["body3", "1.375rem", "1.125rem", "1rem", "1rem", "400", "1.7"],
  ["body4", "1.25rem", "1rem", "0.875rem", "0.875rem", "400", "1.8"],
  ["body5", "1.125rem", "0.875rem", "0.75rem", "0.75rem", "400", "1.6"],
  ["body6", "0.875rem", "0.75rem", "0.75rem", "0.75rem", "400", "1.5"],
];

function LiveSample({ className }: { className: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [detail, setDetail] = useState("");
  const width = useScreenWidth();

  useEffect(() => {
    if (!ref.current) return;
    const computed = getComputedStyle(ref.current);
    setDetail(
      `${computed.fontSize} / line ${computed.lineHeight} / weight ${computed.fontWeight}`,
    );
  }, [width]);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p className="body6 text-gray-30">
        {className} · {detail || "measuring"}
      </p>
      <p ref={ref} className={className}>
        YOUNGFOLIO
      </p>
    </div>
  );
}

export const Scale: Story = {
  render: () => (
    <div style={{ padding: 32 }}>
      <Guide>
        <GuideTitle eyebrow="Foundation">Typography</GuideTitle>
        <GuideText>
          html은 Pretendard, 16px, letter-spacing -0.3px, line-height 1입니다.
          weight는 400, 500(menu, eyebrow), 600(섹션 제목), 700(h1–h7 기본값)이
          쓰입니다. h1–h7을 쓰는 곳 상당수가 !font-medium 또는 !font-semibold로
          굵기를 다시 지정합니다.
        </GuideText>
        <SpecTable
          headers={["Class", ">1920", "≤1920", "≤1280", "≤768", "Weight", "Line"]}
          rows={scale}
        />
        <GuideText>
          툴바에서 Site base 2048을 고르면 기본 크기가, xl 1920 이하는 한 단계
          작은 크기가 적용됩니다. 타입 스케일은 max-width이고 Tailwind sm/md/lg/xl은
          min-width입니다.
        </GuideText>
        <div style={{ display: "grid", gap: 28 }}>
          {scale.map(([name]) => (
            <LiveSample key={name} className={name} />
          ))}
        </div>
        <GuideTitle>스케일 밖의 글자</GuideTitle>
        <SpecTable
          headers={["이름", "크기", "쓰는 곳"]}
          rows={[
            ["menu", "3.5 / 2.75 / 2.5 / 2.25rem, weight 500", "전체 메뉴 링크. hover 밑줄"],
            ["visualText", "15 / 12 / 9 / 6rem, weight 700", "유틸리티. 현재 페이지 미사용"],
            ["hero clamp", "clamp(48px, 8.33vw, 180px), weight 400", "홈 BEYOND ORDINARY"],
            ["eyebrow", "12px → sm 14px, tracking 0.22em, weight 500", "About 섹션 라벨"],
            ["messageBubble", "1rem / 0.875rem, line 1.5rem / 1.25rem", "채팅 날짜 구분"],
          ]}
        />
      </Guide>
    </div>
  ),
};
