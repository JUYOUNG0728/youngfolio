import Image from "next/image";
import useScreenWidth from "@/utils/useScreenWidth";

export default function ProfileInfo() {
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
    { name: "KakaoTalk", value: "vilioite" },
  ];

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <>
      <h2 className="h4 mb-12 xl:mb-16">Contact Information</h2>
      <ul className="flex gap-28 xl:gap-40">
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
    </>
  );
}
