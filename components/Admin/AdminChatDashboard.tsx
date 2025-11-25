"use client";

import { useEffect, useState } from "react";

import { Message, HandleSendParams } from "@/types/inquiry";
import { fetchMessages, postImage, postMessage } from "@/utils/messageApi";
import { supabase } from "@/lib/supabaseClient";

import UserListPanel from "@/components/Admin/UserListPanel";
import InquiryChat from "@/components/Contact/InquiryChat";

export default function AdminChatDashboard() {
  const [uids, setUids] = useState<string[]>([]);
  const [activeUid, setActiveUid] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async ({ text, imageFile }: HandleSendParams) => {
    if (!activeUid) return;

    const imageUrl = imageFile
      ? await postImage({ uid: activeUid, file: imageFile })
      : null;

    await postMessage({ uid: activeUid, text, imageUrl, sender: "admin" });
  };

  /* 전체 uid 목록 가져오기 */
  useEffect(() => {
    const loadUids = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("uid")
        .order("timestamp", { ascending: false });

      if (data) {
        const unique = Array.from(new Set(data.map((m) => m.uid)));
        setUids(unique);
      } else {
        console.error(error);
      }
    };

    loadUids();
  }, []);

  /* 선택된 uid 메시지 가져오기 */
  useEffect(() => {
    if (!activeUid) return;

    const loadMessages = async () => {
      const data = await fetchMessages({ uid: activeUid });
      if (data) setMessages(data);
    };

    loadMessages();
  }, [activeUid]);

  /* 실시간 메시지 수신 */
  useEffect(() => {
    if (!activeUid) return;

    const channel = supabase
      .channel("admin-realtime-messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `uid=eq.${activeUid}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeUid]);

  return (
    <div className="w-full h-screen flex bg-black text-white">
      <UserListPanel
        uids={uids}
        activeUid={activeUid}
        setActiveUid={setActiveUid}
      />

      <div className="flex-1 p-10">
        {activeUid ? (
          <InquiryChat
            messages={messages}
            handleSend={handleSendMessage}
            isAdminPage={true}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-20">
            채팅방을 선택하세요.
          </div>
        )}
      </div>
    </div>
  );
}
