import Image from "next/image";
import useScreenWidth from "@/utils/useScreenWidth";
import SnsItems from "@/components/Contact/SnsItems";

export default function ContactInfoSection() {
  const screenWidth = useScreenWidth();

  const iconSize = screenWidth >= 1280 ? 20 : 16;

  const snsList = [
    {
      name: "Mobile",
      value: "010-8297-7649",
    },
    {
      name: "Email",
      value: "vilioite@naver.com",
    },
  ];

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    alert("클립보드에 복사되었습니다.");
  };

  return (
    <section className="h-full text-nowrap flex gap-x-24 gap-y-12 flex-wrap md:gap-y-16 lg:sticky lg:top-[30vh] lg:flex-col lg:gap-24">
      <ul className="flex gap-[10vw] lg:gap-16 lg:flex-col">
        {snsList.map((sns) => (
          <li key={sns.name} className="flex flex-col gap-2 xl:gap-[10px]">
            <h3 className="body3 text-gray-30">{sns.name}</h3>
            <div
              className="flex items-center gap-3 cursor-pointer xl:gap-4"
              onClick={() => handleCopy(sns.value)}
            >
              <p className="body3">{sns.value}</p>
              <Image
                src="/images/icon-copy.png"
                alt="복사"
                width={iconSize}
                height={iconSize}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="rounded-full bg-gray-50/10 w-full h-16 flex justify-center items-center md:w-56 xl:w-[270px] xl:h-20">
        <SnsItems />
      </div>
    </section>
  );
}
