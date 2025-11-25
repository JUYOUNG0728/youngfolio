"use client";

import { useEffect, useRef } from "react";

import { formatDateHeader, messageDisplayMeta } from "@/utils/messageUtils";
import { Message, HandleSendParams } from "@/types/inquiry";

import MessageBubble from "@/components/Contact/MessageBubble";
import InquiryInput from "@/components/Contact/InquiryInput";

type InquiryChatProps = {
  messages: Message[];
  handleSend: ({ text, imageFile }: HandleSendParams) => Promise<void>;
  isAdminPage: boolean;
};

export default function InquiryChat({
  messages,
  handleSend,
  isAdminPage,
}: InquiryChatProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const el = scrollContainerRef.current;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <div className="w-full h-full flex flex-col bg-white/10 rounded-3xl border-2 border-white/20">
      <div
        className="w-full flex-1 overflow-y-auto scrollbar px-5 mb-8 lg:px-16 "
        ref={scrollContainerRef}
      >
        {messages.map((msg, index) => {
          const { showDate, showTime } = messageDisplayMeta({
            msg,
            messages,
            index,
          });

          return (
            <div key={msg.id} className="flex flex-col mt-4">
              {showDate && (
                <div className="messageBubble">
                  {formatDateHeader(new Date(msg.timestamp))}
                </div>
              )}
              <MessageBubble
                {...msg}
                showTime={showTime}
                isAdminPage={isAdminPage}
              />
            </div>
          );
        })}
      </div>
      <div className="my-7 mx-5 lg:my-12 lg:mx-16">
        <InquiryInput handleSend={handleSend} />
      </div>
    </div>
  );
}
