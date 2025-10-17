"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import useScreenWidth from "@/utils/useScreenWidth";

import Plus from "@/components/Common/Plus";

interface ExperienceBoxProps {
  number: string;
  title: string;
  description: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ExperienceBox({
  number,
  title,
  description,
  isOpen,
  onToggle,
}: ExperienceBoxProps) {
  const screenWidth = useScreenWidth();
  const [maxHeight, setMaxHeight] = useState<string | number>("0px");

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen, description]);

  return (
    <div className="w-full border-b border-gray-30 mb-6 pb-6 xl:pb-8 xl:mb-8 transition-all duration-500">
      <div className="flex justify-between items-center w-full">
        <div
          className={`flex items-center cursor-pointer ${
            number === "01" ? "gap-[26px] xl:gap-9" : "gap-5 xl:gap-7"
          }`}
          onClick={onToggle}
        >
          <h3 className="h3 font-semibold text-gray-10 text-outline">
            {number}
          </h3>
          <h3 className="h4">{title}</h3>
        </div>
        <div className="mr-3 cursor-pointer" onClick={onToggle}>
          {!isOpen ? (
            <Plus />
          ) : (
            <Image
              src={"/images/icon-minus.png"}
              alt={"minus"}
              width={screenWidth < 1920 ? 20 : 24}
              height={screenWidth < 1920 ? 20 : 24}
            />
          )}
        </div>
      </div>

      <div
        ref={contentRef}
        style={{
          maxHeight: maxHeight,
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        <p className="body4 ml-[72px] mt-7 xl:mt-9 xl:ml-[84px]">
          {description}
        </p>
      </div>
    </div>
  );
}
