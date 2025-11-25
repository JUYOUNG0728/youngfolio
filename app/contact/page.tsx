"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";
import { fetchMessages, postMessage, postImage } from "@/utils/messageApi";
import { Message, HandleSendParams } from "@/types/inquiry";
import useScreenWidth from "@/utils/useScreenWidth";

import SubHeader from "@/components/Common/SubHeader";
import ContactInfoSection from "@/components/Contact/ContactInfoSection";
import ContactSideSection from "@/components/Contact/ContactSideSection";
import InquirySection from "@/components/Contact/InquirySection";

export default function ContactPage() {
  const [userUid, setUserUid] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isWorkingHour, setIsWorkingHour] = useState(false);

  const screenWidth = useScreenWidth();

  const userIdName = process.env.NEXT_PUBLIC_USERID_NAME as string;

  const handleSendMessage = async ({ text, imageFile }: HandleSendParams) => {
    if (!userUid) {
      alert(
        "새로고침 후 다시 시도해주시고, 계속해서 문제 발생 시 다른 방법으로 문의해주세요."
      );
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

  /* 활동 시간에 따른 상태 관리 (오전 9시 ~ 오후 8시) */
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
    <div className="w-full h-full bg-black text-white px-[30px] md:px-[70px]">
      <SubHeader page="Contact" />
      <div className="relative lg:flex lg:gap-[16vw]">
        {screenWidth >= 1280 && (
          <ContactSideSection isWorkingHour={isWorkingHour} />
        )}
        <div className="flex flex-col w-full gap-[16vh] lg:gap-[28vh]">
          <ContactInfoSection />
          <InquirySection messages={messages} handleSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
