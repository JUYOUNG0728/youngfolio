"use client";

import { useEffect, useState } from "react";
import ActivityStatus from "@/components/Contact/ActivityStatus";

type ContactHeaderProps = {
  pageType: "inquiry" | "information";
};

export default function ContactHeader({ pageType }: ContactHeaderProps) {
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
    <div className="absolute ml-[70px] h-[calc(100%-272px)] flex flex-col justify-between top-48 xl:top-64 xl:h-[calc(100%-372px)]">
      <div>
        <p className="h5 text-white mb-8 xl:mb-10">
          궁금한 점이 있으신가요?
          <br />
          언제든지 편하게 문의 주세요!
        </p>
        <span
          className="body4 underline text-gray-30 cursor-pointer"
          onClick={() =>
            (window.location.href =
              pageType === "inquiry"
                ? "/contact/information"
                : "/contact/inquiry")
          }
        >
          다른 방법으로 문의하기
        </span>
      </div>
      <div className="relative text-white body4 flex flex-col">
        <ActivityStatus isWorkingHour={isWorkingHour} />
        <span>매일 AM 9:00 - PM 8:00 (평균 1시간 내 응답)</span>
        <span>
          {pageType === "inquiry"
            ? "답변은 페이지에 실시간으로 반영됩니다."
            : "최대한 빠르게 확인 후 연락드리겠습니다."}
        </span>
      </div>
    </div>
  );
}
