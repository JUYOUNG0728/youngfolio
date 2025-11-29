import Image from "next/image";
import useScreenWidth from "@/utils/useScreenWidth";

export default function PhotoSection() {
  const screenWidth = useScreenWidth();

  const xClipPath =
    screenWidth >= 1920
      ? "polygon(0 0, 100% 0, 100% 200%, 0 200%)"
      : screenWidth >= 1280
      ? "polygon(0 0, 100% 0, 100% 180%, 0 180%)"
      : screenWidth >= 768
      ? "polygon(0 0, 100% 0, 100% 140%, 0 140%)"
      : "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

  return (
    <section className="w-full h-screen sticky top-0 flex items-center justify-center overflow-hidden">
      <div className="h-full relative flex items-center justify-center zoom-photo">
        <Image
          src="/images/img-main-background.jpg"
          alt="배경 이미지"
          fill
          className="object-cover zoom-photo-img"
        />
        <h2 className="text-gray-10 text-center font-semibold relative flex flex-col items-center justify-center photo-words h1 text-wrap">
          <span className="transition-all duration-700 px-[70px]">
            IMAGINE BEYOND
          </span>
          <div className="flex flex-col items-center transition-all duration-700">
            <div
              className="flex relative my-5 bottom-[8px] md:bottom-[18px] md:my-8 lg:bottom-[28px] lg:my-12 xl:bottom-[40px] xl:my-14"
              style={{
                clipPath: xClipPath,
              }}
            >
              <span className="bouncing-loop h-10">x</span>
            </div>
            <span>SOME PROJECTS</span>
          </div>
        </h2>
      </div>
    </section>
  );
}
