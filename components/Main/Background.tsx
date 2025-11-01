"use client";

import { useEffect, useState } from "react";
import useScreenWidth from "@/utils/useScreenWidth";

export default function Background() {
  const [screenHeight, setScreenHeight] = useState(0);

  const screenWidth = useScreenWidth();

  const BOUNDARY = 500;

  const initialVelocity = () => ({
    x: Math.random() * 4,
    y: Math.random() * 4,
  });

  const [circle1Position, setCircle1Position] = useState({ x: 900, y: 300 });
  const [circle2Position, setCircle2Position] = useState({ x: 100, y: 600 });
  const [circle3Position, setCircle3Position] = useState({ x: 1800, y: 100 });

  const [circle1Velocity, setCircle1Velocity] = useState(initialVelocity);
  const [circle2Velocity, setCircle2Velocity] = useState(initialVelocity);
  const [circle3Velocity, setCircle3Velocity] = useState(initialVelocity);

  const handleResize = () => {
    setScreenHeight(window.innerHeight);
  };

  const updatePosition = (pos: any, vel: any, setPos: any, setVel: any) => {
    let newX = pos.x + vel.x;
    let newY = pos.y + vel.y;

    if (newX <= 0 || newX >= screenWidth - BOUNDARY) {
      vel.x *= -1;
      newX = Math.max(0, Math.min(newX, screenWidth - BOUNDARY));
    }

    if (newY <= 0 || newY >= screenHeight - BOUNDARY) {
      vel.y *= -1;
      newY = Math.max(0, Math.min(newY, screenHeight - BOUNDARY));
    }

    setVel({ ...vel });
    setPos({ x: newX, y: newY });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenHeight]);

  useEffect(() => {
    const interval = setInterval(() => {
      updatePosition(
        circle1Position,
        circle1Velocity,
        setCircle1Position,
        setCircle1Velocity
      );
      updatePosition(
        circle2Position,
        circle2Velocity,
        setCircle2Position,
        setCircle2Velocity
      );
      updatePosition(
        circle3Position,
        circle3Velocity,
        setCircle3Position,
        setCircle3Velocity
      );
    }, 16);

    return () => clearInterval(interval);
  }, [screenHeight, circle1Position, circle2Position, circle3Position]);

  return (
    <div className="bg-dark-blue w-screen h-screen relative overflow-hidden">
      <div className="h-full w-full blur-1 relative">
        {/* Circle 1 */}
        <div
          className="w-[600px] h-[600px] rounded-full absolute z-10 xl:w-[800px] xl:h-[800px]"
          style={{
            background:
              "conic-gradient(from 175deg at 67.53% 36.82%, #F4F6FE 0deg, #3715FD 130deg, #1E253A 360deg)",
            left: circle1Position.x,
            top: circle1Position.y,
          }}
        />
        {/* Circle 2 */}
        <div
          className="w-[1000px] h-[1000px] rounded-full absolute xl:w-[800px] xl:h-[800px]"
          style={{
            background: "radial-gradient(circle, #1556FD 0%, #1E253A 70%)",
            left: circle2Position.x,
            top: circle2Position.y,
          }}
        />
        {/* Circle 3 */}
        <div
          className="w-[600px] h-[600px] rounded-full absolute xl:w-[1200px] xl:h-[1200px]"
          style={{
            background:
              "radial-gradient(ellipse 66.87% 66.87% at 67.53% 36.82%, #F4F6FE 0%, #1543FD 36%, #1E253A 100%)",
            left: circle3Position.x,
            top: circle3Position.y,
          }}
        />
      </div>
    </div>
  );
}
