import Feed from "@/components/About/Feed";
import Tag from "@/components/About/Tag";

const hobbyList = [
  {
    name: "PIANO",
    tags: [
      "듣는 걸 제일 좋아하고, 직접 연주하는 것도 좋아해요.",
      "게임이나 애니메이션 OST부터 클래식까지 다양하게 들어요.",
      "지금은 Deemo-Oceanus 라는 곡을 연습해보고 있어요.",
    ],
    video: true,
    links: [
      "https://www.youtube.com/watch?v=bTtZ600zer0",
      "https://www.youtube.com/watch?v=Wp7Pa_v0BJM",
    ],
  },
  {
    name: "BOOKS",
    tags: [
      "제가 제일 좋아하는 책은 인터랙티브 디벨로퍼예요.",
      "평소에 자주 읽진 않지만, 꾸준히 읽으려고 노력해요.",
      "에세이나 인문학 책을 즐겨 읽어요.",
    ],
    video: false,
    links: ["/images/img-book1.jpg", "/images/img-book2.jpg"],
  },
  {
    name: "GAMES",
    tags: [
      "포켓몬스터나 로스트아크를 주로 해요.",
      "가끔 증바람이나 배그 같은 게임도 해요.",
      "제일 좋아하는 포켓몬은 딜리버드예요.",
    ],
    video: true,
    links: [
      "/images/img-game1.png",
      "https://moygiia7bzcdvhjq.public.blob.vercel-storage.com/video-game1.mp4",
    ],
  },
  {
    name: "BICYCLE",
    tags: [
      "카카오바이크 같은 전기자전거를 타요.",
      "가볍게 바람 쐬러 나갈 때 집 앞에 있는 탄천에서 타요.",
      "예전에 출퇴근할 때도 항상 타고 다녔어요.",
    ],
    video: false,
    links: ["/images/img-bicycle1.png", "/images/img-bicycle2.png"],
  },
];

export default function HobbySection() {
  return (
    <section className="bg-gray-10 px-[16px] py-20 text-black md:px-[30px] md:py-28 lg:px-[140px] lg:py-36">
      <header className="max-w-[18rem] md:max-w-none">
        <p className="text-xs font-medium tracking-[0.22em] text-gray-50 md:text-sm">
          IN DAILY LIFE
        </p>
        <h2 className="mt-5 text-[2.25rem] font-semibold leading-[0.95] tracking-[-0.04em] md:mt-6 md:text-[3rem] lg:text-[3.75rem]">
          <span className="text-black/20">DAILY </span>
          <span>HOBBY</span>
        </h2>
      </header>

      <div className="mt-12 border-t border-black/10 md:mt-16 lg:mt-20">
        {hobbyList.map((hobby, index) => (
          <article
            key={hobby.name}
            className="grid items-start gap-10 border-b border-black/10 py-12 md:gap-12 md:py-16 lg:grid-cols-12 lg:gap-16 lg:py-20"
          >
            <div className="flex flex-col gap-6 md:gap-8 lg:col-span-4">
              <div className="flex flex-col gap-3 md:gap-4">
                <span className="text-lg font-medium tracking-[-0.03em] text-black md:text-xl">
                  #{index + 1}
                </span>
                <h3 className="text-[2.25rem] font-semibold leading-none tracking-[-0.04em] md:text-[3rem] lg:text-[3.5rem]">
                  {hobby.name}
                </h3>
              </div>
              <div className="flex flex-col gap-2">
                {hobby.tags.map((tag) => (
                  <Tag key={tag} tag={tag} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-8">
              <Feed hobby={hobby} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
