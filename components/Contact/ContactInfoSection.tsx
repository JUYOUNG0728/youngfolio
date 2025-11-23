import Image from "next/image";
import useScreenWidth from "@/utils/useScreenWidth";
import SnsItems from "@/components/Common/SnsItems";

export default function ContactInfoSection() {
  const screenWidth = useScreenWidth();

  const iconSize = screenWidth >= 1280 ? 20 : 16;

  const snsList = [
    {
      name: "Mobile",
      value: "+82 10-8297-7649",
    },
    {
      name: "Email",
      value: "vilioite@naver.com",
    },
  ];

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <section className="flex flex-col gap-[72px] lg:gap-32">
      <div>
        <div className="w-full mb-12 xl:mb-16">
          <h1 className="h3 mb-6 inline-block mr-3 xl:mb-8">최주영</h1>
          <span className="inline-block h5">(CHOI JUYOUNG)</span>
          <p className="body3 mb-1 xl:mb-2">📍 Seongnam, South Korea</p>
          <p className="body3">💼 UI/UX Design | Front-end Dev</p>
        </div>
        <div className="rounded-full bg-gray-50/10 w-56 h-16 flex justify-center items-center xl:w-[270px] xl:h-20">
          <SnsItems />
        </div>
      </div>
      <ul className="flex text-nowrap gap-[10vw] lg:gap-28 xl:gap-40">
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
    </section>
  );
}
