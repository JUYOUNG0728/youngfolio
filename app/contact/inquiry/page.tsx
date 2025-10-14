"use client";

import { useState, useEffect, useRef } from "react";
import { db } from "@/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import useScreenWidth from "@/utils/useScreenWidth";
import uploadImage from "@/utils/uploadImage";
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
  imageUrl?: string;
  timestamp: Timestamp;
  sender: "admin" | "user";
}

export default function InquiryPage() {
  const [userUid, setUserUid] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const screenWidth = useScreenWidth();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async (text: string, imageFile: File | null) => {
    if (!userUid) return alert("새로고침 후 다시 시도해주세요.");

    let imageUrl = null;
    if (imageFile) {
      try {
        imageUrl = await uploadImage(userUid, imageFile);
      } catch {
        alert("이미지 업로드에 실패했습니다.");
        return;
      }
    }

    await addDoc(collection(db, "messages"), {
      sender: "user",
      uid: userUid,
      text,
      imageUrl,
      timestamp: Timestamp.now(),
    });
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

            return (
              <div key={msg.id} className="flex flex-col mt-4">
                {showDate && (
                  <div className="text-center text-sm text-gray-30 my-8 xl:text-base">
                    {formatDateHeader(msg.timestamp)}
                  </div>
                )}
                <MessageBubble {...msg} showTime={showTime} />
              </div>
            );
          })}
        </div>
        <InquiryInput onSend={handleSend} />
      </div>
    </div>
  );
}
