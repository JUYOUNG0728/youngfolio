"use client";

import { Timestamp } from "firebase/firestore";
import { formatTime } from "@/utils/messageUtils";

interface MessageBubbleProps {
  text: string;
  imageUrl?: string;
  sender: "admin" | "user";
  timestamp: Timestamp;
  showTime: boolean;
}

export default function MessageBubble({
  text,
  imageUrl,
  sender,
  timestamp,
  showTime,
}: MessageBubbleProps) {
  if (sender === "admin") {
    return (
      <div className="flex flex-col gap-2 xl:gap-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-black xl:w-[18px] xl:h-[18px]" />
          <span className="text-black font-medium text-base xl:text-lg xl:font-semibold">
            YOUNG
          </span>
        </div>
        <div className="w-fit flex items-end">
          <span className="break-words py-3 px-5 rounded-3xl bg-gray-10 text-black max-w-[600px] block text-base xl:text-lg xl:px-6 xl:max-w-[840px] xl:rounded-[30px]">
            {text}
          </span>
          {showTime && (
            <span className="text-gray-30 body6 ml-3">
              {formatTime(timestamp)}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end">
      <div className="flex flex-col gap-4 items-end">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="이미지 미리보기"
            className="max-w-[600px] max-h-[200px] rounded-lg object-contain mt-6"
          />
        )}
        <div className="w-fit flex items-end">
          {showTime && (
            <span className="text-gray-30 body6 mr-3">
              {formatTime(timestamp)}
            </span>
          )}
          <span className="break-words py-3 px-5 rounded-3xl bg-gray-40 text-white max-w-[600px] block text-base xl:text-lg xl:px-6 xl:max-w-[840px] xl:rounded-[30px]">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}
