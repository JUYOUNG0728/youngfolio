"use client";

import { useState, useEffect, useRef } from "react";
import { db } from "@/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { postMessageImage, postMessage } from "@/utils/postMessage";
import {
  formatDateHeader,
  isSameDay,
  isSameMinute,
} from "@/utils/messageUtils";

import InquiryHeader from "@/components/Inquiry/InquiryHeader";
import MessageBubble from "@/components/Inquiry/MessageBubble";
import InquiryInput from "@/components/Inquiry/InquiryInput";

interface Message {
  id: string;
  uid: string;
  text: string;
  imageUrl: string | null;
  timestamp: Timestamp;
  sender: "admin" | "user";
}

export default function InquiryPage() {
  const [userUid, setUserUid] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async ({
    uid,
    text,
    imageUrl,
  }: {
    uid: string;
    text: string;
    imageUrl: string | null;
  }) => {
    try {
      await postMessage({ uid, text, imageUrl });
    } catch (error) {
      console.error("메시지 전송 실패 : ", error);
      alert("메시지 전송에 실패했습니다.");
    }
  };

  const uploadImage = async (
    uid: string,
    file: File
  ): Promise<string | null> => {
    try {
      return await postMessageImage({ uid, file });
    } catch (error) {
      console.error("이미지 업로드 실패 : ", error);
      alert("이미지 업로드에 실패했습니다.");
      return null;
    }
  };

  const handleSend = async (text: string, imageFile: File | null) => {
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
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => {
          const data = doc.data() as Omit<Message, "id">;

          return {
            id: doc.id,
            ...data,
            sender: data.sender ?? "user",
          };
        })
      );
    });
    return () => unsubscribe();
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
            const prev = messages[index - 1];
            const next = messages[index + 1];
            const showDate =
              index === 0 || !isSameDay(msg.timestamp, prev.timestamp);
            const showTime =
              !next ||
              !isSameMinute(msg.timestamp, next.timestamp) ||
              msg.sender !== next.sender;
            const showProfile =
              msg.sender === "admin" &&
              (!prev ||
                prev.sender !== "admin" ||
                !isSameMinute(msg.timestamp, prev.timestamp));

            return (
              <div key={msg.id} className="flex flex-col mt-4">
                {showDate && (
                  <div className="text-center text-sm text-gray-30 my-8 xl:text-base">
                    {formatDateHeader(msg.timestamp)}
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
