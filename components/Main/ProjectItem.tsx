"use client";

import Image from "next/image";
import { useState } from "react";

type ProjectItemProps = {
  imageSrc: string;
  title: string;
  description: string;
  link: string;
};

export default function ProjectItem({
  imageSrc,
  title,
  description,
  link,
}: ProjectItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="project-item"
      onClick={() => {
        window.open(`https://${link}`, "_blank");
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-[calc(100%-120px)] h-[40vh] md:min-w-[340px] md:w-[24vw] md:h-[30vh]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover border border-gray-40 rounded-xl"
        />
        {isHovered && (
          <div className="relative z-10 bg-black/70 w-full h-full flex flex-col justify-center items-center gap-3 md:gap-4 xl:gap-5">
            <h1 className="h6">{title}</h1>
            <p className="body6">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
