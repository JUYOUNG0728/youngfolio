"use client";

import { Timestamp } from "firebase/firestore";
import { formatTime } from "@/utils/messageUtils";

interface MessageBubbleProps {
  text: string;
  imageUrl: string | null;
  sender: "admin" | "user";
  timestamp: Timestamp;
  showTime: boolean;
  showProfile?: boolean;
}

export default function MessageBubble({
  text,
  imageUrl,
  sender,
  timestamp,
  showTime,
  showProfile = true,
}: MessageBubbleProps) {
  const isAdmin = sender === "admin";
  const isOnlyImageWithTimeStamp = !text && imageUrl && showTime;

  const baseStyle = "flex flex-col gap-4";
  const baseClass = {
    admin: {
      base: "items-start",
      onlyImageWithTimeStamp: "!flex-row !items-end",
    },
    user: {
      base: "items-end",
      onlyImageWithTimeStamp: "!flex-row-reverse",
    },
  };
  const bubbleStyle =
    "break-words py-3 px-5 rounded-3xl max-w-[600px] block text-base xl:text-lg xl:px-6 xl:max-w-[840px] xl:rounded-[30px]";
  const imageStyle = "max-w-[600px] max-h-[200px] rounded-lg object-contain";
  const timestampStyle = "text-gray-30 body6";

  {
    return (
      <div className={`${isAdmin ? "flex flex-col" : "flex justify-end"}`}>
        {isAdmin && showProfile && (
          <div className="flex items-center gap-2 my-4">
            <div className="w-4 h-4 rounded-full bg-black xl:w-[18px] xl:h-[18px]" />
            <span className="text-black font-medium text-base xl:text-lg xl:font-semibold">
              YOUNG
            </span>
          </div>
        )}
        <div
          className={`${baseStyle} ${
            isAdmin ? baseClass.admin.base : baseClass.user.base
          } ${
            isOnlyImageWithTimeStamp
              ? isAdmin
                ? baseClass.admin.onlyImageWithTimeStamp
                : baseClass.user.onlyImageWithTimeStamp
              : ""
          }`}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt={isAdmin ? "관리자 첨부 이미지" : "사용자 첨부 이미지"}
              className={`${imageStyle}`}
            />
          )}
          {!text && showTime && (
            <span className={`${timestampStyle}`}>{formatTime(timestamp)}</span>
          )}
          {text && (
            <div className="w-fit flex items-end">
              {!isAdmin && showTime && (
                <span className={`${timestampStyle} mr-3`}>
                  {formatTime(timestamp)}
                </span>
              )}
              <span
                className={`${bubbleStyle} ${
                  isAdmin ? "bg-gray-10 text-black" : "bg-gray-40 text-white"
                }`}
              >
                {text}
              </span>
              {isAdmin && showTime && (
                <span className={`${timestampStyle} ml-3`}>
                  {formatTime(timestamp)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
