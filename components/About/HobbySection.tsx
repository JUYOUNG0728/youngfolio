import Image from "next/image";

import useScreenWidth from "@/utils/useScreenWidth";
import Feed from "@/components/About/Feed";
import Tag from "@/components/About/Tag";

type HobbySectionProps = {
  sectionStyle: {
    baseStyle: string;
    tagStyle: string;
    containerStyle: string;
  };
};

export default function HobbySection({ sectionStyle }: HobbySectionProps) {
  const screenWidth = useScreenWidth();

  const hobbyIconSize = screenWidth > 1400 ? 80 : screenWidth > 768 ? 60 : 48;

  const hobbyList = [
    {
      name: "PIANO",
      icon: "icon-piano.png",
      iconAlt: "피아노 아이콘",
      tags: ["Spring", "Kiki's Delivery Service", "MapleStory", "Crazy Arcade"],
      video: true,
      links: [
        "https://moygiia7bzcdvhjq.public.blob.vercel-storage.com/video-spring.mp4",
        "https://moygiia7bzcdvhjq.public.blob.vercel-storage.com/video-kiki.mp4",
      ],
    },
    {
      name: "BOOKS",
      icon: "icon-book.png",
      iconAlt: "책 아이콘",
      tags: [
        "Book Newbie",
        "Interactive Developer",
        "Nexus",
        "On Not Draining Myself",
      ],
      video: false,
      links: ["/images/img-book1.jpg", "/images/img-book2.jpg"],
    },
    {
      name: "GAMES",
      icon: "icon-game.png",
      iconAlt: "게임 아이콘",
      tags: ["League of Legends", "Lost Ark", "Pocket Monsters"],
      video: true,
      links: [
        "https://moygiia7bzcdvhjq.public.blob.vercel-storage.com/video-game1.mp4",
        "https://moygiia7bzcdvhjq.public.blob.vercel-storage.com/video-game2.mp4",
      ],
    },
  ];

  return (
    <div className={`${sectionStyle.baseStyle} text-black mt-36`}>
      <span
        className={`${sectionStyle.tagStyle} bg-yellow-green lg:left-[620px] xl:left-[680px]`}
      >
        IN DAILY LIFE
      </span>
      <div
        className={`${sectionStyle.containerStyle} bg-yellow-green flex flex-col gap-24 md:gap-36 lg:gap-44`}
      >
        <h1 className="aboutSectionTitle text-center font-bold">
          <span className="text-black/20">DAILY </span>
          <span>HOBBY</span>
        </h1>
        <div className="flex flex-col gap-20">
          {hobbyList.map((hobby, index) => (
            <div
              key={index}
              className="flex flex-col gap-12 lg:gap-16 lg:flex-row justify-between"
            >
              <div className="flex flex-col gap-6 md:gap-8 lg:gap-12 xl:gap-14">
                <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
                  <span className="h3 text-green">#{index + 1}</span>
                  <div className="flex gap-3 items-center md:gap-4 lg:gap-6">
                    <h2 className="h2 text-nowrap">{hobby.name}</h2>
                    <Image
                      src={`/images/${hobby.icon}`}
                      alt={hobby.iconAlt}
                      width={hobbyIconSize}
                      height={hobbyIconSize}
                      className="rounded-xl object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 lg:gap-4 lg:w-[20vw]">
                  {hobby.tags.map((tag) => (
                    <Tag key={tag} tag={tag} />
                  ))}
                </div>
              </div>
              <Feed hobby={hobby} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
