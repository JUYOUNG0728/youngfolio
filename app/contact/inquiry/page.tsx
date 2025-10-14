"use client";

import { useState, useEffect, useRef } from "react";
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
  imageUrl?: string;
  timestamp: Timestamp;
  sender?: "admin" | "user";
}

export default function InquiryPage() {
  const [userUid, setUserUid] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const screenWidth = useScreenWidth();

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const iconSize = {
    plus: screenWidth < 1920 ? 13 : 16,
    send: screenWidth < 1920 ? 16 : 20,
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
      e.target.value = "";
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() && !imageFile) return;
    if (!userUid) return alert("사용자 정보가 없습니다.");

    let imageUrl = null;

    if (imageFile) {
      try {
        imageUrl = await uploadImage(imageFile);
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        alert("이미지 업로드에 실패했습니다.");
        return;
      }
    }

    await addDoc(collection(db, "messages"), {
      sender: "user",
      uid: userUid,
      text: message,
      imageUrl,
      timestamp: Timestamp.now(),
    });

    setMessage("");
    setImageFile(null);
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

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop =
          scrollContainerRef.current.scrollHeight;
      }
    };

    const images = scrollContainerRef.current?.querySelectorAll("img") ?? [];
    if (images.length === 0) {
      scrollToBottom();
    } else {
      let loadedCount = 0;
      images.forEach((img) => {
        if (img.complete) {
          loadedCount++;
          if (loadedCount === images.length) scrollToBottom();
        } else {
          img.onload = () => {
            loadedCount++;
            if (loadedCount === images.length) scrollToBottom();
          };
        }
      });
    }
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

  // utils/messageUtils.ts에 추후 옮길 예정
  const formatDateHeader = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isSameMinute = (a: Timestamp, b: Timestamp) => {
    const aDate = a.toDate();
    const bDate = b.toDate();
    return (
      aDate.getFullYear() === bDate.getFullYear() &&
      aDate.getMonth() === bDate.getMonth() &&
      aDate.getDate() === bDate.getDate() &&
      aDate.getHours() === bDate.getHours() &&
      aDate.getMinutes() === bDate.getMinutes()
    );
  };

  const isSameDay = (a: Timestamp, b: Timestamp) => {
    const aDate = a.toDate();
    const bDate = b.toDate();
    return (
      aDate.getFullYear() === bDate.getFullYear() &&
      aDate.getMonth() === bDate.getMonth() &&
      aDate.getDate() === bDate.getDate()
    );
  };

  return (
    <div className="w-full h-full bg-black">
      {!userUid && <div>Loading...</div>}
      <div className="absolute ml-[70px] h-[calc(100%-272px)] flex flex-col justify-between top-48 xl:top-60 xl:h-[calc(100%-340px)]">
        <div>
          <p className="h5 text-white mb-8 xl:mb-10">
            궁금한 점이 있으신가요?
            <br />
            언제든지 편하게 문의 주세요!
          </p>
          <span
            className="body4 underline text-gray-30 cursor-pointer"
            onClick={() => {
              window.location.href = "/contact";
            }}
          >
            다른 방법으로 문의하기
          </span>
        </div>
        <div className="text-white body4 flex flex-col">
          <div className="mb-6 bg-gray-10 w-12 h-12 rounded-full pt-[5px] overflow-hidden xl:w-14 xl:h-14 xl:mb-7">
            <Image
              src="/images/icon-admin-avatar.png"
              alt="관리자 아바타"
              width={60}
              height={60}
            />
          </div>
          <span>매일 AM 9:00 - PM 8:00 (평균 1시간 내 응답)</span>
          <span>답변은 페이지에 실시간으로 반영됩니다.</span>
        </div>
      </div>
      <div className="absolute right-0 top-0 bg-white rounded-l-2xl h-full w-[75vw] xl:w-[77vw]">
        <div
          className="w-full h-[calc(100%-180px)] overflow-y-auto scrollbar pl-16 pr-32 pt-4 xl:pl-24 xl:pr-40 xl:h-[calc(100%-240px)]"
          ref={scrollContainerRef}
        >
          {messages.map((msg, index) => {
            const prevMsg = messages[index - 1];
            const nextMsg = messages[index + 1];
            const showDateHeader =
              index === 0 || !isSameDay(msg.timestamp, prevMsg.timestamp);
            const showTime =
              !nextMsg ||
              !isSameMinute(msg.timestamp, nextMsg.timestamp) ||
              msg.sender !== nextMsg.sender;
            return (
              <div key={msg.id} className="flex flex-col mt-4">
                {showDateHeader && (
                  <div className="text-center text-sm text-gray-30 my-8 xl:text-base">
                    {formatDateHeader(msg.timestamp)}
                  </div>
                )}

                {msg.sender === "admin" ? (
                  <div className="flex flex-col gap-2 xl:gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-black xl:w-[18px] xl:h-[18px]" />
                      <span className="text-black font-medium text-base xl:text-lg xl:font-semibold">
                        YOUNG
                      </span>
                    </div>
                    <div className="w-fit flex items-end">
                      <span className="break-words py-3 px-5 rounded-3xl bg-gray-10 text-black max-w-[600px] block text-base xl:text-lg xl:px-6 xl:max-w-[840px] xl:rounded-[30px]">
                        {msg.text}
                      </span>
                      {showTime && (
                        <span className="text-gray-30 body6 ml-3">
                          {formatTime(msg.timestamp)}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="flex flex-col gap-4 items-end">
                      {msg.imageUrl && (
                        <img
                          src={msg.imageUrl}
                          alt="이미지 미리보기"
                          className="max-w-[600px] max-h-[200px] rounded-lg object-contain mt-6"
                        />
                      )}
                      <div className="w-fit flex items-end">
                        {showTime && (
                          <span className="text-gray-30 body6 mr-3">
                            {formatTime(msg.timestamp)}
                          </span>
                        )}
                        <span className="break-words py-3 px-5 rounded-3xl bg-gray-40 text-white max-w-[600px] block text-base xl:text-lg xl:px-6 xl:max-w-[840px] xl:rounded-[30px]">
                          {msg.text}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="absolute flex justify-center w-[calc(100%-214px)] bottom-[80px] z-20 xl:bottom-[100px] ml-16 xl:w-[calc(100%-278px)] xl:ml-24">
          <div>
            {imageFile && (
              <div className="mb-8 relative inline-block">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="첨부 이미지 미리보기"
                  className="max-w-[600px] max-h-[200px] rounded-lg object-contain"
                />
                <button
                  className="absolute top-2 right-2 bg-black w-7 h-7 rounded-full flex justify-center items-center"
                  onClick={() => setImageFile(null)}
                >
                  <Image
                    src="/images/icon-close.png"
                    alt="close"
                    width={14}
                    height={14}
                  />
                </button>
              </div>
            )}
            <div className="flex gap-3">
              <div className="flex items-center gap-4 relative">
                <input
                  className="w-[600px] bg-white border border-gray-20 rounded-full placeholder-gray-40 body4 pl-7 pr-40 py-3 text-black xl:w-[800px] xl:pl-[38px] xl:pr-[200px] focus:outline-none xl:py-4"
                  style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
                  placeholder="메시지를 입력해주세요."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                />
                <div className="h-[calc(100%-18px)] absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2 xl:gap-3 xl:h-[calc(100%-24px)] xl:right-8">
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
                      !message.trim() && !imageFile
                        ? "opacity-15 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={handleSendMessage}
                    disabled={!message.trim() && !imageFile}
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
