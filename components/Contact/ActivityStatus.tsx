import Image from "next/image";

type ActivityStatusProps = {
  isWorkingHour: boolean;
};

export default function ActivityStatus({ isWorkingHour }: ActivityStatusProps) {
  return (
    <>
      <div
        className={`${
          isWorkingHour ? "bg-green-600" : "bg-gray-40"
        } px-2 py-[2px] rounded-xl absolute top-[-8px] left-8 text-white text-xs font-medium xl:left-9 xl:text-sm xl:top-[-10px]`}
      >
        <span>{isWorkingHour ? "ON" : "OFF"}</span>
      </div>
      <div className="mb-6 bg-gray-10 w-12 h-12 rounded-full pt-[5px] overflow-hidden xl:w-14 xl:h-14 xl:mb-7">
        <Image
          src="/images/icon-admin-avatar.png"
          alt="관리자 아바타"
          width={60}
          height={60}
        />
      </div>
    </>
  );
}
