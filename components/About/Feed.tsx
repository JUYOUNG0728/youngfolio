import Image from "next/image";

import useScreenWidth from "@/utils/useScreenWidth";
import Send from "@/components/Common/Send";

type FeedProps = {
  hobby: {
    name: string;
    icon: string;
    iconAlt: string;
    tags: string[];
    video: boolean;
    links: string[];
  };
};

export default function Feed({ hobby }: FeedProps) {
  const screenWidth = useScreenWidth();

  const snsIconSize = screenWidth > 1920 ? 28 : screenWidth > 1280 ? 24 : 20;

  return (
    <div className="bg-white rounded-3xl p-4 flex flex-col gap-4 md:p-8 lg:p-12 xl:gap-5">
      <div className="flex gap-3 items-center ml-2">
        <div className="w-10 h-10 rounded-full relative">
          <Image
            src="/images/img-about-me.jpg"
            alt="프로필 이미지"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="body3 font-semibold">undojinx</span>
      </div>
      <div className="flex flex-col gap-2 lg:flex-row">
        {hobby.links.map((link) => (
          <div className="relative w-full h-[50vh] md:h-[70vh] lg:h-[50vh] lg:w-[24vw]">
            {hobby.video ? (
              <video
                src={link}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <Image
                src={link}
                alt={`${hobby.name} link`}
                fill
                className="object-cover"
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center ml-2 gap-4 xl:gap-5">
        <Image
          src="/images/icon-heart.png"
          alt="하트 아이콘"
          width={snsIconSize}
          height={snsIconSize}
        />
        <Image
          src="/images/icon-bubble.png"
          alt="말풍선 아이콘"
          width={snsIconSize}
          height={snsIconSize}
        />
        <Send width={snsIconSize} height={snsIconSize} fill="#000000" />
      </div>
    </div>
  );
}
