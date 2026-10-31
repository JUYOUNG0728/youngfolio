import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Cluster, Guide, GuideText, GuideTitle, TokenValue } from "../ui";

const meta = {
  title: "Design System/Foundations/Colors",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "페이지 배경은 --black(#101010), 기본 글자는 --white입니다. Primary 액션도 검정입니다. blue와 green은 팔레트에만 있습니다.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const groups = [
  {
    title: "Primary / Secondary",
    note: "Button primary는 검정 면, secondary는 흰 면입니다. 호버에서 서로 반전됩니다.",
    items: [
      ["--color-primary", "Primary fill. Button primary"],
      ["--color-on-primary", "Primary 위의 글자"],
      ["--color-secondary", "Secondary fill. Button secondary"],
      ["--color-on-secondary", "Secondary 위의 글자"],
      ["--color-background", "body 배경"],
      ["--color-foreground", "어두운 면의 글자"],
    ],
  },
  {
    title: "Neutral",
    note: "gray-10은 입력과 About Me 배경, gray-30/40은 보조 글자, gray-50은 카드 테두리와 푸터 버튼입니다.",
    items: [
      ["--white", "면, 글자, 활성 페이지"],
      ["--gray-10", "입력, 받은 말풍선, 밝은 섹션"],
      ["--gray-20", "보조 글자, 진행 바"],
      ["--gray-30", "eyebrow, 타임스탬프, 흐린 제목"],
      ["--gray-40", "푸터 메타, 본문 보조, 테두리"],
      ["--gray-50", "더 흐린 글자, 카드 테두리"],
      ["--cool-gray", "보낸 사람(YOUNG) 말풍선"],
      ["--black", "페이지 배경, primary 버튼"],
    ],
  },
  {
    title: "Accent — 정의만 됨",
    note: "유틸리티 클래스는 globals.css에 있지만 tsx에서는 사용처가 없습니다.",
    items: [
      ["--blue-10", "Accent blue"],
      ["--blue-20", "Accent blue pressed"],
      ["--blue-30", "Accent blue deep"],
      ["--green-10", "Lime"],
      ["--green-20", "Green"],
    ],
  },
] as const;

function Swatch({ name, role }: { name: string; role: string }) {
  const needsEdge = name.includes("white") || name.includes("black") || name.includes("primary") || name.includes("secondary") || name.includes("background") || name.includes("foreground");

  return (
    <figure style={{ width: 180 }}>
      <div
        style={{
          height: 88,
          borderRadius: "var(--radius-xl)",
          background: `var(${name})`,
          border: needsEdge ? "1px solid var(--gray-40)" : undefined,
        }}
      />
      <figcaption style={{ display: "grid", gap: 4, marginTop: 10 }}>
        <span className="body6">{name}</span>
        <TokenValue name={name} />
        <span className="body6 text-gray-30">{role}</span>
      </figcaption>
    </figure>
  );
}

function OverlaySwatch({ name, role }: { name: string; role: string }) {
  return (
    <figure style={{ width: 180 }}>
      <div
        style={{
          height: 88,
          borderRadius: "var(--radius-xl)",
          background: "linear-gradient(90deg, #ffffff 50%, #101010 50%)",
          overflow: "hidden",
        }}
      >
        <div style={{ height: "100%", background: `var(${name})` }} />
      </div>
      <figcaption style={{ display: "grid", gap: 4, marginTop: 10 }}>
        <span className="body6">{name}</span>
        <span className="body6 text-gray-30">{role}</span>
      </figcaption>
    </figure>
  );
}

export const Palette: Story = {
  render: () => (
    <Guide>
      <GuideTitle eyebrow="Foundation">Colors</GuideTitle>
      <GuideText>
        시맨틱 이름은 기존 변수를 가리킵니다. --color-primary를 바꿔도 버튼
        클래스가 아직 var(--black)과 Tailwind 색을 직접 쓰므로 화면은 즉시
        바뀌지 않습니다. 적용은 이후 컴포넌트를 토큰으로 옮길 때 합니다.
      </GuideText>
      {groups.map((group) => (
        <section key={group.title} style={{ display: "grid", gap: 16 }}>
          <h3 className="h6">{group.title}</h3>
          <GuideText>{group.note}</GuideText>
          <Cluster>
            {group.items.map(([name, role]) => (
              <Swatch key={name} name={name} role={role} />
            ))}
          </Cluster>
        </section>
      ))}
      <section style={{ display: "grid", gap: 16 }}>
        <h3 className="h6">Overlay</h3>
        <GuideText>
          white/10 채팅 패널, white/15 구분선, white/20 아이콘 타일과 채팅
          테두리, white/30 진행 트랙, black/20 프로젝트 호버, black/80 메뉴
          스크림입니다.
        </GuideText>
        <Cluster>
          <OverlaySwatch name="--overlay-white-10" role="패널, 관리자 카드" />
          <OverlaySwatch name="--overlay-white-15" role="About 행 구분선" />
          <OverlaySwatch name="--overlay-white-20" role="채팅 테두리, 스킬 타일" />
          <OverlaySwatch name="--overlay-white-30" role="프로젝트 진행 트랙" />
          <OverlaySwatch name="--overlay-black-20" role="포스터 호버" />
          <OverlaySwatch name="--overlay-black-80" role="메뉴 배경" />
        </Cluster>
      </section>
    </Guide>
  ),
};
