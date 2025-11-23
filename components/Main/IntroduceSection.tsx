import Scene from "@/components/Main/Model/Scene";
import Arrow from "@/components/Common/Arrow";
import useScreenWidth from "@/utils/useScreenWidth";

type IntroduceSectionProps = {
  scrollRef: React.RefObject<HTMLDivElement>;
};

export default function IntroduceSection({ scrollRef }: IntroduceSectionProps) {
  const screenWidth = useScreenWidth();

  const iconScrollArrowSize =
    screenWidth >= 1920 ? 52 : screenWidth >= 768 ? 36 : 28;

  const contentsClipPath =
    screenWidth <= 768 ? undefined : "inset(0 0 0 0 round 50% 50% 0 0)";

  return (
    <section
      className="bg-black w-full h-[250vh] rounded-t-full"
      style={{
        clipPath: contentsClipPath,
      }}
    >
      <div className="w-full h-screen overflow-hidden flex flex-col items-center pt-16 pb-32 justify-between gap-10 sticky top-0 lg:pt-20 lg:top-10 xl:top-24 xl:pb-48">
        <p className="px-[30px] fullBody font-semibold text-outline-white text-justify md:px-[70px]">
          BLENDING TECHNOLOGY AND EMOTION, CREATING EXPERIENCES THAT GO BEYOND
          WORDS AND RESONATE WITH THE HEART.
        </p>
        <div className="flex flex-col items-center gap-12 lg:gap-20">
          <p className="body2 text-white text-center px-[40px]">
            현실과 감성의 경계를 넘나들며 마음에 닿는 경험과 공간을
            디자인합니다.
            <br />
            감성과 기술로 연결된 공간을 그리는 디자이너, 최주영입니다.
          </p>
          <div ref={scrollRef}>
            <Arrow
              width={iconScrollArrowSize}
              height={iconScrollArrowSize}
              fill="#ffffff"
              className="bouncing"
            />
          </div>
        </div>
        <div className="absolute flex justify-center items-center w-[600px] h-[600px] lg:w-[40vw] lg:h-[40vh] lg:mt-36">
          <Scene />
        </div>
      </div>
    </section>
  );
}
