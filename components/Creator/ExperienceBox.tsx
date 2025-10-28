"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import useScreenWidth from "@/utils/useScreenWidth";

type ExperienceBoxProps = {
  number: string;
  title: string;
  description: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
};

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
            number === "01" ? "gap-[30px] xl:gap-10" : "gap-6 xl:gap-8"
          }`}
          onClick={onToggle}
        >
          <h3 className="h3 font-semibold text-gray-10 text-outline">
            {number}
          </h3>
          <h3 className="h4 !font-semibold">{title}</h3>
        </div>
        <div className="mr-3 cursor-pointer" onClick={onToggle}>
          {!isOpen ? (
            <Image
              src={"/images/icon-arrow-down.png"}
              alt={"펼치기"}
              width={screenWidth < 1920 ? 32 : 40}
              height={screenWidth < 1920 ? 32 : 40}
            />
          ) : (
            <Image
              src={"/images/icon-arrow-up.png"}
              alt={"접기"}
              width={screenWidth < 1920 ? 32 : 40}
              height={screenWidth < 1920 ? 32 : 40}
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
        <p className="body4 text-gray-50 ml-[78px] mt-5 xl:mt-7 xl:ml-[96px]">
          {description}
        </p>
      </div>
    </div>
  );
}
