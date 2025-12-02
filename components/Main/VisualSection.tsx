import Image from "next/image";
import useScreenWidth from "@/utils/useScreenWidth";

type VisualSectionProps = {
  sectionStyle: {
    horizontalPaddingStyle: string;
    verticalPaddingStyle: string;
  };
};

export default function VisualSection({ sectionStyle }: VisualSectionProps) {
  const { horizontalPaddingStyle } = sectionStyle;

  const screenWidth = useScreenWidth();

  return (
    <section className="w-full h-screen text-black bg-white pt-[120px] xl:pt-[150px]">
      <div className="h-full flex flex-col relative border-t border-gray-30 md:flex-row">
        <div
          className={`w-full h-full flex flex-col gap-10 py-[60px] md:gap-14 md:py-[80px] lg:w-1/2 lg:justify-between lg:h-full xl:py-[100px] ${horizontalPaddingStyle}`}
        >
          {screenWidth >= 768 && (
            <div className="absolute bottom-[5vh] left-[36px] flex flex-col items-center animate-bounce gap-9 lg:gap-11 lg:right-[51%] lg:left-auto xl:gap-14">
              <div className="-rotate-90">
                <span className="font-semibold body5">SCROLL TO</span>
              </div>
              <Image
                src="/images/icon-mouse-scroll.png"
                alt="마우스 스크롤"
                width={16}
                height={16}
              />
            </div>
          )}
          <h1 className="h1 leading-[0.9] flex flex-col gap-2 md:gap-4 lg:gap-6">
            <span>BEYOND</span>
            <span>LIMITS</span>
          </h1>
          <p className="body3 font-medium ">
            한계를 넘는 디자이너 최주영입니다.
            <br />
            디자이너의 감각, 개발자의 논리, 기획자의 구조를 함께 다루며,
            <br />
            경계를 넘는 경험과 더 나은 완성도를 추구하고 있습니다.
          </p>
        </div>
        <div className="w-full h-full relative md:h-full lg:w-1/2">
          <Image
            src="/images/img-visual.jpg"
            alt="비주얼 이미지"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
