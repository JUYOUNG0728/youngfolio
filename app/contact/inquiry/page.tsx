"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

import { fetchMessages, postMessage, postImage } from "@/utils/messageApi";
import { formatDateHeader, messageDisplayMeta } from "@/utils/messageUtils";
import { Message, SendMessageParams } from "@/types/inquiry";

import InquiryHeader from "@/components/Inquiry/InquiryHeader";
import MessageBubble from "@/components/Inquiry/MessageBubble";
import InquiryInput from "@/components/Inquiry/InquiryInput";

interface HandleSendParams {
  text: string;
  imageFile: File | null;
}

export default function InquiryPage() {
  const [userUid, setUserUid] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async ({ uid, text, imageUrl }: SendMessageParams) => {
    await postMessage({ uid, text, imageUrl });
  };

  const uploadImage = async (
    uid: string,
    file: File
  ): Promise<string | null> => {
    return await postImage({ uid, file });
  };

  const handleSend = async ({ text, imageFile }: HandleSendParams) => {
    if (!userUid) {
      alert(
        "새로고침 후 다시 시도해주시고, 계속해서 문제 발생 시 다른 방법으로 문의해주세요."
      );
      return;
    }

    const imageUrl = imageFile ? await uploadImage(userUid, imageFile) : null;
    if (imageFile && !imageUrl) return;

    await sendMessage({ uid: userUid, text, imageUrl });
  };

  useEffect(() => {
    const savedUid = localStorage.getItem("anonUid");
    if (savedUid) setUserUid(savedUid);
    else {
      const newUid = crypto.randomUUID();
      localStorage.setItem("anonUid", newUid);
      setUserUid(newUid);
    }
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      const data = await fetchMessages();
      if (data) setMessages(data);
    };
    loadMessages();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("realtime:messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
    <div className="w-full h-full bg-black relative">
      <InquiryHeader />
      <div className="absolute right-0 top-0 bg-white rounded-l-2xl h-full w-[75vw] xl:w-[77vw]">
        <div
          className="w-full h-[calc(100%-180px)] overflow-y-auto scrollbar pl-16 pr-32 pt-4 xl:pl-24 xl:pr-40 xl:h-[calc(100%-240px)]"
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
        <InquiryInput onSend={handleSend} />
      </div>
    </div>
  );
}
