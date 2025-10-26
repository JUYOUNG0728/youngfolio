import SnsItems from "@/components/Common/SnsItems";

export default function ProfileInfo() {
  return (
    <>
      <div className="w-full mb-12 xl:mb-16">
        <h1 className="h3 mb-6 inline-block mr-3 xl:mb-8">최주영</h1>
        <span className="inline-block h5">(CHOI JUYOUNG)</span>
        <p className="body3 mb-1 xl:mb-2">📍 Seongnam, South Korea</p>
        <p className="body3">💼 UI/UX Design | Front-end Dev</p>
      </div>
      <div className="rounded-full bg-gray-50/10 w-56 h-16 flex justify-center items-center xl:w-[270px] xl:h-20">
        <SnsItems />
      </div>
    </>
  );
}
