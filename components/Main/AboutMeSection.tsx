import Image from "next/image";

import Button from "@/components/Common/Button";
import Arrow from "@/components/Common/Arrow";

type AboutMeSectionProps = {
  sectionStyle: {
    horizontalPaddingStyle: string;
    verticalPaddingStyle: string;
  };
};

export default function AboutMeSection({ sectionStyle }: AboutMeSectionProps) {
  const { horizontalPaddingStyle, verticalPaddingStyle } = sectionStyle;

  const unHoveredTextStyle = "text-gray-20 group-hover:text-black";
  const transitionStyle = { transition: "0.5s" };

  return (
    <section
      className={`w-full bg-gray-10 text-black ${verticalPaddingStyle} ${horizontalPaddingStyle}`}
    >
      <h1 className="w-fit group h1 !font-normal text-center flex flex-col mx-auto">
        <span>
          W
          <span className={unHoveredTextStyle} style={transitionStyle}>
            OULD YOU LIK
          </span>
          E
        </span>
        <span>
          <span className={unHoveredTextStyle} style={transitionStyle}>
            TO KNOW{" "}
          </span>
          M
          <span className={unHoveredTextStyle} style={transitionStyle}>
            OR
          </span>
          E
        </span>
        <span className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8 xl:gap-10">
          <span>
            <span className={unHoveredTextStyle} style={transitionStyle}>
              ABOU
            </span>
            T
          </span>
          <div className="w-20 h-[46px] md:w-32 md:h-[68px] lg:w-[170px] lg:h-[94px] relative xl:w-[232px] xl:h-[116px]">
            <Image
              src="/images/img-about-me.jpg"
              alt="ABOUT ME 이미지"
              fill
              className="object-cover object-[50%_30%]"
            />
          </div>
          ?
        </span>
      </h1>
      <p className="body3 text-center mt-10 md:mt-12 xl:mt-14">
        저에 대해 더 자세히 알려드릴게요!
      </p>
      <Button
        variant="primary-outline"
        size="lg"
        circleButton={true}
        className="mx-auto flex items-center justify-center mt-16 md:mt-24 lg:mt-28 xl:mt-32"
        onClick={() => (window.location.href = "/about-me")}
      >
        <Arrow
          width={32}
          height={32}
          fill="currentColor"
          className="rotate-[225deg]"
        />
      </Button>
    </section>
  );
}
