"use client";

import { useState, useRef } from "react";

import useScreenWidth from "@/utils/useScreenWidth";
import Plus from "@/components/Common/Plus";
import Send from "@/components/Common/Send";
import Close from "@/components/Common/Close";

type InquiryInputProps = {
  handleSend: ({
    text,
    imageFile,
  }: {
    text: string;
    imageFile: File | null;
  }) => void;
};

export default function InquiryInput({ handleSend }: InquiryInputProps) {
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const screenWidth = useScreenWidth();

  const iconSize = {
    plus: screenWidth <= 1920 ? 13 : 16,
    send: screenWidth <= 1920 ? 18 : 20,
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of Array.from(items)) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        const blob = item.getAsFile();
        if (blob) {
          const ext = blob.type.split("/")[1] || "png";
          const file = new File([blob], `pasted-image.${ext}`, {
            type: blob.type,
          });
          setImageFile(file);
        }
        break;
      }
    }
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 첨부할 수 있습니다.");
        return;
      }
      setImageFile(file);
    }
    e.target.value = "";
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = () => {
    if (!message.trim() && !imageFile) return;
    handleSend({ text: message, imageFile });
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
            className="min-w-[100px] min-h-[100px] max-w-[600px] max-h-[200px] rounded-lg object-contain"
          />
          <button
            className="absolute top-2 right-2 bg-black w-7 h-7 rounded-full flex justify-center items-center"
            onClick={handleRemoveImage}
          >
            <Close width={14} height={14} fill="#ffffff" />
          </button>
        </div>
      )}
      <div className="flex items-center justify-center gap-4 relative">
        <input
          className="w-full bg-gray-10 rounded-full placeholder-gray-50 body4 pl-6 pr-40 py-3 text-black lg:pl-8 xl:pl-10 xl:pr-[200px] focus:outline-none xl:py-4"
          placeholder="메시지를 입력해주세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          onPaste={handlePaste}
        />
        <div className="h-[calc(100%-18px)] absolute right-5 my-auto flex items-center gap-2 xl:gap-3 xl:h-[calc(100%-24px)] xl:right-8">
          <label className="bg-gray-40 rounded-full aspect-square h-full overflow-hidden cursor-pointer flex justify-center items-center">
            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleUploadImage}
            />
            <Plus
              width={iconSize.plus}
              height={iconSize.plus}
              fill="#ffffff"
              stroke="3"
            />
          </label>
          <button
            className={`w-16 h-full bg-black rounded-full flex items-center justify-center gap-2 xl:w-[80px] ${
              !message.trim() && !imageFile && "opacity-15 cursor-not-allowed"
            }`}
            onClick={handleSendMessage}
            disabled={!message.trim() && !imageFile}
          >
            <Send width={iconSize.send} height={iconSize.send} fill="#ffffff" />
          </button>
        </div>
      </div>
    </div>
  );
}
