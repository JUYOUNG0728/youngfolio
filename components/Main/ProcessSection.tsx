import Image from "next/image";
import useScreenWidth from "@/utils/useScreenWidth";

type ProcessSectionProps = {
  processRef: React.RefObject<HTMLDivElement>;
};

export default function ProcessSection({ processRef }: ProcessSectionProps) {
  const screenWidth = useScreenWidth();
  return (
    <section
      ref={processRef}
      className="w-full h-[205vh] overflow-hidden bg-black pt-[24vh] xl:px-[100px] xl:h-[280vh] md:h-[270vh] lg:h-[330vh]"
    >
      <h2 className="h1 text-white !font-medium flex flex-col items-center justify-center px-[70px]">
        <span className="body2 mb-8">(Built This Way)</span>
        <span
          className={`left-title ${
            screenWidth > 1000 ? "text-nowrap" : "text-center"
          }`}
        >
          CREATED THROUGH
        </span>
        <span
          className={`right-title flex ${
            screenWidth > 1000 ? "flex-row gap-4 items-center" : "flex-col"
          }`}
        >
          <div className="flex items-center gap-4">
            <span>THIS</span>
            <div className="w-[140px] h-[130px] relative xl:h-[170px] xl:w-[190px]">
              <Image
                src="/images/img-process.png"
                alt="프로세스 이미지"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <span>PROCESS</span>
        </span>
      </h2>
      <p className="body1 text-center text-nowrap mt-[16vh] md:mt-[20vh]">
        <span>
          <span
            style={{
              WebkitTextFillColor: "rgba(255, 255, 255, 0.2)",
              WebkitBackgroundClip: "text",
              backgroundImage: "linear-gradient(90deg, #FFFFFF, #FFFFFF)",
            }}
            className="process-item bg-no-repeat"
          >
            사용자 설문조사
            <br />
            경쟁 서비스 분석
            <br />
            데이터/사용자 행동 분석
            <br />
            페르소나 작성
            <br />
            사용자 여정지도 작성
            <br />
            핵심 문제(HMW) 도출
            <br />
            IA/사이트맵 작성
            <br />
            와이어프레임 제작
            <br />
            하이파이 디자인
            <br />
            디자인 시스템 설계
            <br />
            인터랙션/애니메이션 설계
            <br />
            프로토타입 제작
            <br />
            사용성 테스트 진행
            <br />
            피드백 수집
            <br />
            성과 측정(KPI, UX metrics)
          </span>
        </span>
      </p>
    </section>
  );
}
