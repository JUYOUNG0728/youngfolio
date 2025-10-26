"use client";

import Image from "next/image";

import ContactHeader from "@/components/Contact/ContactHeader";
import SnsItems from "@/components/Common/SnsItems";

export default function InformationPage() {
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
    <div className="w-full h-full relative bg-black">
      <ContactHeader pageType="information" />
      <div className="h-full absolute top-0 right-0 border-l border-gray-50 text-white w-[75vw] xl:w-[77vw]">
        <div className="w-full pt-[184px] pl-24 pb-16">
          <div className="mb-12">
            <h1 className="h3 mb-6 inline-block mr-3">최주영</h1>
            <span className="inline-block h5">(CHOI JUYOUNG)</span>
            <p className="body3 mb-1">📍 Seongnam, South Korea</p>
            <p className="body3">💼 UI/UX Design | Front-end Dev</p>
          </div>
          <div className="rounded-full bg-gray-50/10 w-56 h-16 flex justify-center items-center">
            <SnsItems />
          </div>
        </div>
        <div className="w-full pt-28 pl-24 pb-16">
          <h2 className="h4 mb-12">Contact Information</h2>
          <ul className="flex gap-28">
            {snsList.map((sns) => (
              <li key={sns.name} className="flex flex-col gap-1">
                <h3 className="body3 text-gray-30">{sns.name}</h3>
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => handleCopy(sns.value)}
                >
                  <p className="body3">{sns.value}</p>
                  <Image
                    src="/images/icon-copy.png"
                    alt="복사"
                    width={16}
                    height={16}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
