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

  return (
    <section
      className={`w-full bg-gray-10 text-black ${verticalPaddingStyle} ${horizontalPaddingStyle}`}
    >
      <h1 className="w-fit group h1 !font-normal text-center flex flex-col mx-auto">
        <span>
          W
          <span
            className="text-gray-20 group-hover:text-black"
            style={{ transition: "0.5s" }}
          >
            OULD YOU LIK
          </span>
          E
        </span>
        <span>
          <span
            className="text-gray-20 group-hover:text-black"
            style={{ transition: "0.5s" }}
          >
            TO KNOW{" "}
          </span>
          M
          <span
            className="text-gray-20 group-hover:text-black"
            style={{ transition: "0.5s" }}
          >
            OR
          </span>
          E
        </span>
        <span className="flex items-center justify-center gap-4 lg:gap-8">
          <span>
            <span
              className="text-gray-20 group-hover:text-black"
              style={{ transition: "0.5s" }}
            >
              ABOU
            </span>
            T
          </span>
          <div className="w-28 h-[52px] md:w-36 md:h-[68px] lg:w-[200px] lg:h-[94px] relative xl:w-[240px] xl:h-[120px]">
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
      <p className="body3 text-center mt-10 xl:mt-12">
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
