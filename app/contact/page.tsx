"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";
import { fetchMessages, postMessage, postImage } from "@/utils/messageApi";
import { Message, HandleSendParams } from "@/types/inquiry";
import { executeRecaptcha } from "@/lib/executeRecaptcha";

import SubHeader from "@/components/Common/SubHeader";
import ContactInfoSection from "@/components/Contact/ContactInfoSection";
import InquirySection from "@/components/Contact/InquirySection";

export default function ContactPage() {
  const [userUid, setUserUid] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const userIdName = process.env.NEXT_PUBLIC_USERID_NAME as string;

  const handleSendMessage = async ({ text, imageFile }: HandleSendParams) => {
    if (!userUid) {
      alert(
        "새로고침 후 다시 시도해주시고, 계속해서 문제 발생 시 다른 방법으로 문의해주세요."
      );
      return;
    }

    const result = await executeRecaptcha("contact");

    if (!result?.success) {
      return;
    }

    const imageUrl = imageFile
      ? await postImage({ uid: userUid, file: imageFile })
      : null;

    await postMessage({ uid: userUid, text, imageUrl, sender: "user" });
  };

  /* 익명 사용자 UID 관리 */
  useEffect(() => {
    const savedUid = localStorage.getItem(userIdName);
    if (savedUid) setUserUid(savedUid);
    else {
      const newUid = crypto.randomUUID();
      localStorage.setItem(userIdName, newUid);
      setUserUid(newUid);
    }
  }, []);

  /* 초기 메시지 불러오기 */
  useEffect(() => {
    const loadMessages = async () => {
      if (!userUid) return;
      const data = await fetchMessages({ uid: userUid });
      if (data) setMessages(data);
    };
    loadMessages();
  }, [userUid]);

  /* 실시간 메시지 수신 */
  useEffect(() => {
    const channel = supabase
      .channel("realtime:messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `uid=eq.${userUid}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userUid]);

  return (
    <div className="w-full h-full bg-black text-white pb-24 px-[30px] md:px-[60px] lg:px-[140px] md:pb-36 lg:pb-44 xl:pb-56">
      <SubHeader page="Contact" />
      <div className="relative flex flex-col gap-[16vw] w-full lg:flex-row lg:gap-0 lg:justify-between">
        <ContactInfoSection />
        <div className="w-full lg:w-[60vw]">
          <InquirySection messages={messages} handleSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
