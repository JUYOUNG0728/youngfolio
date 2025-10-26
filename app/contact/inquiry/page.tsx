"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

import { fetchMessages, postMessage, postImage } from "@/utils/messageApi";
import { Message, SendMessageParams, HandleSendParams } from "@/types/inquiry";

import ContactHeader from "@/components/Contact/ContactHeader";
import InquiryChat from "@/components/Inquiry/InquiryChat";

export default function InquiryPage() {
  const [userUid, setUserUid] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

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

  return (
    <div className="w-full h-full bg-black relative">
      <ContactHeader pageType="inquiry" />
      <InquiryChat messages={messages} handleSend={handleSend} />
    </div>
  );
}
