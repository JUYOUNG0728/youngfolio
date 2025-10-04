"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { db } from "@/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";

import Plus from "@/components/Common/Plus";
import useScreenWidth from "@/utils/useScreenWidth";

interface Message {
  id: string;
  uid: string;
  text: string;
  timestamp: Timestamp;
  sender?: "admin" | "user";
}

export default function InquiryPage() {
  const [userUid, setUserUid] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const screenWidth = useScreenWidth();

  const iconSize = {
    plus: screenWidth < 1920 ? 14 : 16,
    send: screenWidth < 1920 ? 18 : 20,
  };

  const formatTime = (timestamp: Timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const uploadImage = async (file: File) => {
    const imageRef = ref(
      storage,
      `chatImages/${userUid}/${Date.now()}_${file.name}`
    );
    const snapshot = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 첨부할 수 있습니다.");
        e.target.value = "";
        return;
      }
      setImageFile(file);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    if (!userUid) return alert("사용자 정보가 없습니다.");

    await addDoc(collection(db, "messages"), {
      sender: "user",
      uid: userUid,
      text: message,
      timestamp: new Date(),
    });
    setMessage("");
  };

  useEffect(() => {
    const savedUid = localStorage.getItem("anonUid");
    if (savedUid) {
      setUserUid(savedUid);
    } else {
      const newUid = crypto.randomUUID();
      localStorage.setItem("anonUid", newUid);
      setUserUid(newUid);
    }
  }, []);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Message, "id">),
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  return (
    <div
      className="w-full h-full"
      style={{
        background: "linear-gradient(180deg, #EDEEED 0%, #CDE0F2 100%)",
      }}
    >
      {!userUid && <div>Loading...</div>}
      <div className="relative w-[calc(100%-140px)] left-1/2 -translate-x-1/2 top-60 xl:top-80">
        <div className="absolute">
          <p className="h4">
            궁금한 점이 있으신가요?
            <br />
            언제든지 편하게 문의 주세요!
          </p>
          <p className="body4 underline text-gray-40 mt-8 cursor-pointer xl:mt-10">
            다른 방법으로 문의하기
          </p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 xl:gap-8">
          <div className="bg-white p-4 rounded-lg w-[600px] max-h-[300px] overflow-y-auto xl:w-[800px]">
            {messages.map((msg) => (
              <div key={msg.id} className="mb-2">
                <strong>{msg.sender === "admin" ? "관리자" : "나"}:</strong>{" "}
                {msg.text}
                <span className="text-gray-400 text-xs ml-2">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute top-[300px]">
            {imageFile && (
              <div className="mb-8">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="첨부 이미지 미리보기"
                  className="max-w-[600px] max-h-[200px] rounded-lg object-contain"
                />
              </div>
            )}
            <div className="flex gap-3">
              <div className="flex items-center gap-4 relative">
                <input
                  className="w-[600px] bg-gray-20 rounded-full placeholder-white body4 pl-7 pr-24 py-3 text-gray-40 xl:w-[800px] xl:px-9 focus:outline-none"
                  placeholder="메시지를 입력해주세요."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                />
                <div className="h-[calc(100%-16px)] absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2 xl:gap-3">
                  <label className="bg-gray-30 rounded-full aspect-square h-full overflow-hidden cursor-pointer flex justify-center items-center">
                    <input
                      className="w-full h-full hidden"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <Plus
                      width={iconSize.plus}
                      height={iconSize.plus}
                      fill="#ffffff"
                      stroke="3"
                    />
                  </label>
                  <button
                    className={`w-[64px] h-full bg-black  rounded-full text-white text-lg font-semibold flex items-center justify-center gap-2 xl:w-[80px] ${
                      message.trim() ? "" : "opacity-15 cursor-not-allowed"
                    }`}
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <Image
                      src="/images/icon-send.png"
                      alt="send"
                      width={iconSize.send}
                      height={iconSize.send}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
