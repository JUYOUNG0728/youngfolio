import Image from "next/image";

type SubHeaderProps = {
  page: string;
};

export default function SubHeader({ page }: SubHeaderProps) {
  return (
    <div className="flex flex-col gap-6 pt-[240px] mb-20 md:mb-28 lg:mb-36">
      <span className="body4 flex items-center gap-4 ml-1">
        <Image
          src="/images/icon-home.png"
          alt="홈 아이콘"
          width={16}
          height={16}
        />
        <span>HOME　&gt;　{page}</span>
      </span>
      <h1 className="h2 !font-semibold">{page}</h1>
    </div>
  );
}
