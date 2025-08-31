"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CreatorPage() {
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const creatorImageSize =
    screenWidth < 1920
      ? { width: 1200, height: 1644 }
      : { width: 1640, height: 2248 };

  const snsItemsSize = screenWidth < 1920 ? 20 : 30;

  const snsItems = [
    {
      label: "GitHub",
      href: "https://github.com/JUYOUNG0728",
      size: snsItemsSize,
    },
    {
      label: "Behance",
      href: "https://www.behance.net",
      size: snsItemsSize,
    },
    {
      label: "Mail",
      href: "mailto: vilioite@naver.com",
      size: snsItemsSize,
    },
  ];

  const handleSnsNavigate = (href: string) => {
    window.open(href, "_blank");
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div className="bg-gray-50 w-full h-full flex flex-col items-center justify-end text-white relative">
        <div className="absolute top-8 h-[100%] xl:top-6">
          <h1 className="text-[12.2vw] font-extrabold xl:text-[12.4vw]">
            CHOI JUYOUNG
          </h1>
          <div className="mx-2">
            <h2 className="body2 flex justify-end mt-[-10px]">
              Igniting value in design!
            </h2>
            <div className="body3 absolute bottom-[120px] flex justify-between items-end w-full xl:bottom-[140px]">
              <div className="flex justify-end w-full flex-col gap-6 xl:gap-8">
                <h2 className="body2">More than just visuals.</h2>
                <p>
                  디자인은 단순한 시각적 아름다움이 아닌,
                  <br />
                  문제를 해결하고 가치를 전달하는 수단이라고 생각합니다.
                  <br />
                  사용자의 입장에서 생각하고,
                  <br />더 나은 경험을 만들기 위한 끊임없는 고민이 필요합니다.
                </p>
              </div>
              <div
                className="flex mr-10 gap-8
               xl:gap-10"
              >
                <Image
                  src="/images/icon-github.png"
                  alt="GitHub"
                  width={snsItems[0].size}
                  height={snsItems[0].size}
                  className="cursor-pointer"
                  onClick={() => handleSnsNavigate(snsItems[0].href)}
                  priority
                />
                <Image
                  src="/images/icon-behance.png"
                  alt="Behance"
                  width={snsItems[1].size}
                  height={snsItems[1].size}
                  className="cursor-pointer"
                  onClick={() => handleSnsNavigate(snsItems[1].href)}
                  priority
                />
                <Image
                  src="/images/icon-mail.png"
                  alt="Mail"
                  width={snsItems[2].size}
                  height={snsItems[2].size}
                  className="cursor-pointer"
                  onClick={() => handleSnsNavigate(snsItems[2].href)}
                  priority
                />
              </div>
            </div>
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
      <div className="bg-gray-30 w-full h-full text-white relative z-20"></div>
    </div>
  );
}
