"use client";

import { useEffect, useRef } from "react";

export default function FollowCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useRef<number>(0);
  const mouseY = useRef<number>(0);
  const posX = useRef<number>(0);
  const posY = useRef<number>(0);
  const requestId = useRef<number>(0);

  const lerp = (start: number, end: number, amt: number) => {
    return (1 - amt) * start + amt * end;
  };

  const animate = (cursor: HTMLDivElement | null) => {
    if (!cursor) return;

    if (
      Math.abs(posX.current - mouseX.current) < 1 &&
      Math.abs(posY.current - mouseY.current) < 1
    ) {
      cancelAnimationFrame(requestId.current);
      requestId.current = 0;
      return;
    }

    posX.current = lerp(posX.current, mouseX.current, 0.04);
    posY.current = lerp(posY.current, mouseY.current, 0.04);

    cursor.style.left = `${posX.current - cursor.offsetWidth / 2}px`;
    cursor.style.top = `${posY.current - cursor.offsetHeight / 2}px`;

    requestId.current = requestAnimationFrame(() => animate(cursor));
  };

  const onMouseMove = (e: MouseEvent, cursor: HTMLDivElement | null) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;

    if (!requestId.current) {
      if (cursor) {
        requestId.current = requestAnimationFrame(() => animate(cursor));
      }
    }
  };

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    window.addEventListener("mousemove", (e) => onMouseMove(e, cursor));
    animate(cursor);

    return () => {
      window.removeEventListener("mousemove", (e) => onMouseMove(e, cursor));
      if (requestId.current) cancelAnimationFrame(requestId.current);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
