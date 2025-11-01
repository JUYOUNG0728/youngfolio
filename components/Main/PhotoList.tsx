"use client";

import { useState, useRef, useEffect } from "react";
import Photo from "@/components/Main/Photo";

type PhotoListProps = {
  photos: string[];
};

export default function PhotoList({ photos }: PhotoListProps) {
  const [focusPhoto, setFocusPhoto] = useState<number>(0);

  const dragStartX = useRef<number | null>(null);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;

    const deltaX = e.clientX - dragStartX.current;

    const threshold = 240;

    if (deltaX > threshold) {
      setFocusPhoto((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
      dragStartX.current = e.clientX;
    } else if (deltaX < -threshold) {
      setFocusPhoto((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
      dragStartX.current = e.clientX;
    }
  };

  const onMouseUp = () => {
    dragStartX.current = null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFocusPhoto((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <div className="h-full w-full absolute top-0 items-end flex gap-8">
      {photos.map((photo, index) => (
        <Photo
          key={index}
          image={photo}
          focus={focusPhoto === index}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        />
      ))}
    </div>
  );
}
