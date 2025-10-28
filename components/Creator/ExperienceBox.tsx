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
    <div className="w-full border-b border-gray-20 mb-7 pb-7 xl:pb-8 xl:mb-8 transition-all duration-500">
      <div className="flex justify-between items-center w-full">
        <h3
          className="h5 !font-semibold cursor-pointer ml-8"
          onClick={onToggle}
        >
          {title}
        </h3>
        <div className="mr-8 cursor-pointer" onClick={onToggle}>
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
          transition: "max-height 0.8s ease",
        }}
      >
        <p className="body4 text-gray-50 ml-8 mt-8 xl:mt-10]">{description}</p>
      </div>
    </div>
  );
}
