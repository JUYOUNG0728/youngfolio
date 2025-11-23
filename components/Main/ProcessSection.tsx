import Image from "next/image";
import useScreenWidth from "@/utils/useScreenWidth";

type ProcessSectionProps = {
  processRef: React.RefObject<HTMLDivElement>;
};

export default function ProcessSection({ processRef }: ProcessSectionProps) {
  const screenWidth = useScreenWidth();

  const processText = [
    "사용자 설문조사",
    "경쟁 서비스 분석",
    "데이터/사용자 행동 분석",
    "페르소나 작성",
    "사용자 여정지도 작성",
    "핵심 문제(HMW) 도출",
    "IA/사이트맵 작성",
    "와이어프레임 제작",
    "하이파이 디자인",
    "디자인 시스템 설계",
    "인터랙션/애니메이션 설계",
    "프로토타입 제작",
    "사용성 테스트 진행",
    "피드백 수집",
    "성과 측정(KPI, UX metrics)",
  ];

  return (
    <section
      ref={processRef}
      className="w-full overflow-hidden bg-black pt-[30vh] pb-[40vh] text-white"
    >
      <div className="flex flex-col gap-8">
        <span className="body2 text-center">(Built This Way)</span>
        <h2 className="h1 !font-medium flex flex-col items-center justify-center px-[70px]">
          <span
            className={`left-title ${
              screenWidth >= 1000 ? "text-nowrap" : "text-center"
            }`}
          >
            CREATED THROUGH
          </span>
          <span
            className={`right-title flex ${
              screenWidth >= 1000 ? "flex-row gap-4 items-center" : "flex-col"
            }`}
          >
            <div className="flex items-center gap-4">
              <span>THIS</span>
              <div className="relative w-[140px] h-[130px] xl:w-[190px] xl:h-[170px]">
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
      </div>
      <p className="body1 text-center px-[30px] mt-[16vh] md:mt-[20vh]">
        <span>
          <span
            style={{
              WebkitTextFillColor: "rgba(255, 255, 255, 0.2)",
              WebkitBackgroundClip: "text",
              backgroundImage: "linear-gradient(90deg, #FFFFFF, #FFFFFF)",
            }}
            className="process-item bg-no-repeat"
          >
            {processText.map((item, index) => (
              <span key={index}>
                {item}
                {index !== processText.length - 1 && <br />}
              </span>
            ))}
          </span>
        </span>
      </p>
    </section>
  );
}
