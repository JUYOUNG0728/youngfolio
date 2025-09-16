import InquiryBox from "@/components/Creator/InquiryBox";
import ExperienceList from "@/components/Creator/ExperienceList";

export default function IntroduceSection({
  grayDivRef,
}: {
  grayDivRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      className="bg-gray-10 w-full relative z-10 flex justify-center text-black min-h-[100vh]"
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
          <div className="w-full pl-[220px] mt-16 xl:pl-[340px]">
            <ExperienceList />
          </div>
        </div>
      </div>
    </div>
  );
}
