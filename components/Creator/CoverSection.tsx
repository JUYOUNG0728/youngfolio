"use client";

import Image from "next/image";
import SnsItems from "@/components/Common/SnsItems";
import useScreenWidth from "@/utils/useScreenWidth";

export default function CoverSection() {
  const screenWidth = useScreenWidth();

  const getNameFontSize = () => {
    const baseSize = (screenWidth - 140) / 7.45;
    const currentWidth = screenWidth - 1;
    const fontSize = baseSize * ((currentWidth / screenWidth) * 10 - 9);

    return `${fontSize}px`;
  };

  const creatorImageSize =
    screenWidth <= 1920
      ? { width: 1200, height: 1644 }
      : { width: 1640, height: 2248 };

  return (
    <div className="bg-black w-full h-[calc(100vh+160px)] flex justify-center text-white relative overflow-hidden">
      <div
        className="w-[1000px] h-[1000px] rounded-full absolute blur-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 xl:w-[1400px] xl:h-[1400px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      />
      <div className="relative w-[calc(100%-140px)] h-full top-14">
        <h1
          className="font-bold whitespace-nowrap !tracking-normal ml-[-5px] lg:ml-[-8px]"
          style={{ fontSize: `${getNameFontSize()}` }}
        >
          CHOI JUYOUNG
        </h1>
        <h3 className="h4 mt-[-16px] text-right">
          디자인의 가치를 재점화하다.
        </h3>
        <div className="body3 absolute w-full bottom-[320px] flex justify-between items-end xl:bottom-[340px]">
          <div className="flex justify-end flex-col gap-5 xl:gap-7">
            <h3 className="h4">디자인이 지닌 본래의 의미는?</h3>
            <p>
              디자인은 단순한 시각적 아름다움이 아닌,
              <br />
              문제를 해결하고 가치를 전달하는 수단이라고 생각합니다.
              <br />
              사용자의 입장에서 생각하고,
              <br />더 나은 경험을 만들기 위한 끊임없는 고민이 필요합니다.
            </p>
          </div>
          <SnsItems />
        </div>
      </div>
      <Image
        src="/images/img-creator.png"
        alt="Creator"
        width={creatorImageSize.width}
        height={creatorImageSize.height}
        className="absolute top-[170px] xl:top-[210px]"
        priority
      />
    </div>
  );
}
