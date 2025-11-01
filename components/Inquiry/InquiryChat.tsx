"use client";

import { useEffect, useRef } from "react";

import { formatDateHeader, messageDisplayMeta } from "@/utils/messageUtils";
import { Message, HandleSendParams } from "@/types/inquiry";

import MessageBubble from "@/components/Inquiry/MessageBubble";
import InquiryInput from "@/components/Inquiry/InquiryInput";

type InquiryChatProps = {
  messages: Message[];
  handleSend: ({ text, imageFile }: HandleSendParams) => Promise<void>;
};

export default function InquiryChat({
  messages,
  handleSend,
}: InquiryChatProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const el = scrollContainerRef.current;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const handleWheelOutside = (e: WheelEvent) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop += e.deltaY;
      }
    };
    window.addEventListener("wheel", handleWheelOutside, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheelOutside);
    };
  }, []);

  return (
    <div className="bg-white/10 rounded-3xl h-[90vh] w-[67vw] border-2 border-white/20">
      <div
        className="w-full h-[calc(100%-180px)] overflow-y-auto scrollbar px-20 pt-4 xl:px-24 xl:h-[calc(100%-240px)]"
        ref={scrollContainerRef}
      >
        {messages.map((msg, index) => {
          const { showDate, showTime, showProfile } = messageDisplayMeta({
            msg,
            messages,
            index,
          });

          return (
            <div key={msg.id} className="flex flex-col mt-4">
              {showDate && (
                <div className="text-center text-sm text-gray-30 my-8 xl:text-base">
                  {formatDateHeader(new Date(msg.timestamp))}
                </div>
              )}
              <MessageBubble
                {...msg}
                showTime={showTime}
                showProfile={showProfile}
              />
            </div>
          );
        })}
      </div>
      <div className="absolute flex justify-center w-[calc(100%-214px)] bottom-16 z-20 xl:bottom-20 ml-16 xl:w-[calc(100%-278px)] xl:ml-24">
        <InquiryInput onSend={handleSend} />
      </div>
    </div>
  );
}
