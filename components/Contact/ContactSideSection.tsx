import ActivityStatus from "@/components/Contact/ActivityStatus";

type ContactSideSectionProps = {
  isWorkingHour: boolean;
};

export default function ContactSideSection({
  isWorkingHour,
}: ContactSideSectionProps) {
  return (
    <section className="flex flex-col justify-between sticky top-[14vh] h-[76vh]">
      <h1 className="h4 !font-semibold text-nowrap leading-[1.6]">
        궁금한 점이 있으신가요?
        <br />
        언제든 편하게 문의해주세요!
      </h1>
      <div className="body4 flex flex-col gap-6">
        <ActivityStatus isWorkingHour={isWorkingHour} />
        <span className="leading-[1.7]">
          매일 AM 9:00 - PM 8:00
          <br />
          최대한 빠르게 확인 후 연락드리겠습니다.
        </span>
      </div>
    </section>
  );
}
