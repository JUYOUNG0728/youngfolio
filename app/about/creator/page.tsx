"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SnsItems from "@/components/Creator/SnsItems";
import getScreenWidth from "@/utils/useScreenWidth";
import InquiryBox from "@/components/Creator/InquiryBox";

gsap.registerPlugin(ScrollTrigger);

export default function CreatorPage() {
  const grayDivRef = useRef<HTMLDivElement>(null);

  const screenWidth = getScreenWidth();

  const getNameFontSize = () => {
    const baseSize = (screenWidth - 140) / 7.45;
    const currentWidth = screenWidth - 1;
    const fontSize = baseSize * ((currentWidth / screenWidth) * 10 - 9);

    return `${fontSize}px`;
  };

  const creatorImageSize =
    screenWidth < 1920
      ? { width: 1200, height: 1644 }
      : { width: 1640, height: 2248 };

  const handleResize = () => {
    ScrollTrigger.refresh();
  };

  useEffect(() => {
    if (!grayDivRef.current) return;

    gsap.fromTo(
      grayDivRef.current,
      { y: "0%" },
      {
        y: "-100%",
        scrollTrigger: {
          trigger: grayDivRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        ease: "power4.out",
      }
    );
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      ScrollTrigger.killAll();
      window.removeEventListener("resize", handleResize);
    };
  }, [getScreenWidth]);

  return (
    <div className="w-full h-full">
      <div className="bg-black w-full h-[calc(100vh+160px)] flex justify-center text-white relative overflow-hidden">
        <div
          className="w-[1000px] h-[1000px] rounded-full absolute blur-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 xl:w-[1400px] xl:h-[1400px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
          }}
        />
        <div className="relative w-[calc(100%-140px)] h-full top-12 xl:top-10">
          <h1
            className="font-bold whitespace-nowrap !tracking-normal ml-[-5px] lg:ml-[-8px]"
            style={{ fontSize: `${getNameFontSize()}` }}
          >
            CHOI JUYOUNG
          </h1>
          <h3 className="h4 mt-[-16px] text-right">
            디자인의 가치를 재점화하다.
          </h3>
          <div className="body3 absolute w-full bottom-[300px] flex justify-between items-end xl:bottom-[320px]">
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
      <div
        className="bg-gray-10 w-full h-[100vh] relative z-10 flex justify-center text-black"
        ref={grayDivRef}
      >
        <div className="w-[calc(100%-140px)] h-full py-[90px]">
          <div className="flex justify-between w-full h-full">
            <div className="flex flex-col gap-[80px] xl:gap-[100px]">
              <div className="flex flex-col gap-8 xl:gap-10">
                <h3 className="h5 !font-semibold">Experience .</h3>
                <h2 className="h3">
                  꾸준한 배움과 경험으로 성장하여
                  <br />
                  가치를 더하고 끊임없이 나아갑니다.
                </h2>
                <p className="body3 mt-4">
                  끊임없는 배움과 도전을 통해 빠르게 성장하는 디자이너,
                  <br />
                  스스로 주도적으로 일하고, 팀과 협력해 가치를 만들어가는
                  디자이너,
                  <br />
                  문제 해결력과 커뮤니케이션 능력을 갖춘 디자이너,
                  <br />
                  직접 유저가 되어 경험하는 디자이너, 최주영입니다.
                </p>
              </div>
              <InquiryBox />
            </div>
            <div className="w-full pl-80 mt-16">
              <div className="flex justify-between items-center w-full border-b border-gray-30 mb-6 pb-6 xl:pb-8 xl:mb-8">
                <div className="flex items-center gap-5">
                  <h3 className="h3 font-semibold text-gray-10 text-outline">
                    01
                  </h3>
                  <h3 className="h4">작지만 강한 디자이너의 A to Z</h3>
                </div>
                <p className="h3 mt-[-4px] text-gray-30 !font-medium">+</p>
              </div>

              <div className="flex justify-between items-center w-full border-b border-gray-30 mb-6 pb-6 xl:pb-8 xl:mb-8">
                <div className="flex items-center gap-5">
                  <h3 className="h3 font-semibold text-gray-10 text-outline">
                    02
                  </h3>
                  <h3 className="h4">
                    효율적인 핸드오프 : 개발자가 칭찬한 디자이너
                  </h3>
                </div>
                <p className="h3 mt-[-4px] text-gray-30 !font-medium">+</p>
              </div>

              <div className="flex justify-between items-center w-full border-b border-gray-30 mb-6 pb-6 xl:pb-8 xl:mb-8">
                <div className="flex items-center gap-5">
                  <h3 className="h3 font-semibold text-gray-10 text-outline">
                    03
                  </h3>
                  <h3 className="h4">코드를 그리는 디자이너</h3>
                </div>
                <p className="h3 mt-[-4px] text-gray-30 !font-medium">+</p>
              </div>

              <div className="w-full border-b border-gray-30 mb-6 pb-6 xl:pb-8 xl:mb-8">
                <div className="flex justify-between items-center w-full ">
                  <div className="flex items-center gap-5">
                    <h3 className="h3 font-semibold text-gray-10 text-outline">
                      04
                    </h3>
                    <h3 className="h4">
                      유저가 묻다 : 그 디자인, 기능, 왜 바꾸셨나요?
                    </h3>
                  </div>
                  <p className="h3 mt-[-4px] text-gray-30 !font-medium">-</p>
                </div>
                <p className="body4 ml-[72px] mt-7 xl:mt-9 xl:ml-[84px]">
                  최근, 익숙했던 서비스들이 하나둘 새로워졌습니다. 디자인과
                  기능이 바뀌고 이동했으며, 인터페이스는 한층 더 깔끔해졌죠.
                  <br />
                  하지만 사용자들의 반응은 개발진들의 기대와는 달랐습니다.
                  <br />
                  익숙함은 낯설어졌고, 빠르게 사용할 수 있었던 기능은
                  느려졌으며, 자주 쓰던 기능은 어디론가 사라졌습니다.
                  <br />
                  분명 더 나은 경험을 만들기 위한 변화였을 겁니다.
                  <br />
                  <br />
                  하지만 우리는 묻고 싶습니다. 그 디자인, 그 기능… 왜
                  바꾸셨나요?
                  <br />
                  사용자의 맥락과 습관을 충분히 관찰했는지, '예쁘게',
                  '다르게'보다 '익숙하게', '편리하게'를 먼저 고민했는지,
                  <br />
                  그리고 그 변화가 정말 사용자에게 필요했는지.
                  <br />
                  <br />
                  디자인은 곧 경험이며, 경험은 기억 위에 쌓입니다. 변화는
                  필요하지만, 사용자와 함께 움직여야 합니다.
                  <br />
                  그렇지 않으면, 한 번의 개편은 한 번의 이탈로 이어지게 됩니다.
                  <br />
                  지금, 유저는 조용히 떠나고 있습니다.
                  <br />
                  그리고 디자이너는, 유저의 목소리를 듣고 있나요?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
