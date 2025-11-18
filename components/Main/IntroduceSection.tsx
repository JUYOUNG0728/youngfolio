import Scene from "@/components/Main/Model/Scene";
import Arrow from "@/components/Common/Arrow";
import useScreenWidth from "@/utils/useScreenWidth";

type IntroduceSectionProps = {
  scrollRef: React.RefObject<HTMLDivElement>;
};

export default function IntroduceSection({ scrollRef }: IntroduceSectionProps) {
  const screenWidth = useScreenWidth();

  const iconScrollArrowSize = screenWidth > 1920 ? 52 : 36;
  const contentsClipPath =
    screenWidth < 768 ? undefined : "inset(0 0 0 0 round 50% 50% 0 0)";

  return (
    <section
      className="bg-black w-full h-[200vh] rounded-t-full"
      style={{
        clipPath: contentsClipPath,
      }}
    >
      <div className="w-full h-screen overflow-hidden flex flex-col items-center justify-center sticky top-8 xl:top-16">
        <p
          className="absolute px-12 top-20 left-0 fullBody font-semibold text-outline-white
                          text-justify xl:top-16"
        >
          BLENDING TECHNOLOGY AND EMOTION, CREATING EXPERIENCES THAT GO BEYOND
          WORDS AND RESONATE WITH THE HEART.
        </p>
        <p
          className="body2 text-white
                          absolute bottom-56 text-center px-[40px] text-wrap xl:bottom-80"
        >
          현실과 감성의 경계를 넘나들며 마음에 닿는 경험과 공간을 디자인합니다.
          <br />
          감성과 기술로 연결된 공간을 그리는 디자이너, 최주영입니다.
        </p>
        <div className="w-[600px] h-[600px] lg:w-[40vw] lg:h-[40vh]">
          <Scene />
        </div>
        <div className="absolute bottom-28 xl:bottom-40" ref={scrollRef}>
          <Arrow
            width={iconScrollArrowSize}
            height={iconScrollArrowSize}
            fill="#ffffff"
            className="bouncing"
          />
        </div>
      </div>
    </section>
  );
}
