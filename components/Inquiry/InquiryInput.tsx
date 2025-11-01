"use client";

import { useState } from "react";
import Image from "next/image";

import useScreenWidth from "@/utils/useScreenWidth";
import Plus from "@/components/Common/Plus";

type InquiryInputProps = {
  onSend: ({
    text,
    imageFile,
  }: {
    text: string;
    imageFile: File | null;
  }) => void;
};

export default function InquiryInput({ onSend }: InquiryInputProps) {
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const screenWidth = useScreenWidth();

  const iconSize = {
    plus: screenWidth < 1920 ? 13 : 16,
    send: screenWidth < 1920 ? 18 : 20,
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 첨부할 수 있습니다.");
        return;
      }
      setImageFile(file);
    }
  };

  const handleSend = () => {
    if (!message.trim() && !imageFile) return;
    onSend({ text: message, imageFile });
    setMessage("");
    setImageFile(null);
  };

  return (
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
      <div className="flex gap-3 ml-8 xl:ml-4">
        <div className="flex items-center gap-4 relative">
          <input
            className="w-[600px] bg-gray-10 rounded-full placeholder-gray-50 body4 pl-7 pr-40 py-3 text-black xl:w-[800px] xl:pl-[38px] xl:pr-[200px] focus:outline-none xl:py-4"
            placeholder="메시지를 입력해주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <div className="h-[calc(100%-18px)] absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2 xl:gap-3 xl:h-[calc(100%-24px)] xl:right-8">
            <label className="bg-gray-40 rounded-full aspect-square h-full overflow-hidden cursor-pointer flex justify-center items-center">
              <input
                className="hidden"
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
              className={`w-[64px] h-full bg-black rounded-full flex items-center justify-center gap-2 xl:w-[80px] ${
                !message.trim() && !imageFile && "opacity-15 cursor-not-allowed"
              }`}
              onClick={handleSend}
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
  );
}
