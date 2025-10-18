"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function InquiryHeader() {
  const [isWorkingHour, setIsWorkingHour] = useState(false);

  useEffect(() => {
    const checkWorkingHour = () => {
      const now = new Date();
      const hour = now.getHours();

      if (hour >= 9 && hour < 20) {
        setIsWorkingHour(true);
      } else {
        setIsWorkingHour(false);
      }
    };

    checkWorkingHour();

    const interval = setInterval(checkWorkingHour, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute ml-[70px] h-[calc(100%-272px)] flex flex-col justify-between top-48 xl:top-60 xl:h-[calc(100%-340px)]">
      <div>
        <p className="h5 text-white mb-8 xl:mb-10">
          궁금한 점이 있으신가요?
          <br />
          언제든지 편하게 문의 주세요!
        </p>
        <span
          className="body4 underline text-gray-30 cursor-pointer"
          onClick={() => (window.location.href = "/contact")}
        >
          다른 방법으로 문의하기
        </span>
      </div>
      <div className="relative text-white body4 flex flex-col">
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
        <span>매일 AM 9:00 - PM 8:00 (평균 1시간 내 응답)</span>
        <span>답변은 페이지에 실시간으로 반영됩니다.</span>
      </div>
    </div>
  );
}
