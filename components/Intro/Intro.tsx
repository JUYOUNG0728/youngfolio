"use client";

import { useState, useEffect } from "react";
import WelcomeBox from "./WelcomeBox";

export default function Intro() {
  const [showHello, setShowHello] = useState(false);
  const [showWelcomeBox, setShowWelcomeBox] = useState(false);
  const [showThisSpace, setShowThisSpace] = useState(false);
  const [hideWelcomeBox, setHideWelcomeBox] = useState(false);
  const [hideThisSpace, setHideThisSpace] = useState(false);

  const WelcomeBoxMessage = [
    { message: "Welcome", left: "28%", top: "32%" },
    { message: "欢迎", left: "40%", top: "25%" },
    { message: "bienvenido", left: "46%", top: "29%" },
    { message: "được hoan nghênh", left: "56%", top: "25%" },
    { message: "مرحبا بكم", left: "31%", top: "43%" },
    { message: "ようこそ", left: "27%", top: "55%" },
    { message: "환영합니다", left: "35%", top: "64%" },
    { message: "bem-vindo", left: "46%", top: "69%" },
    { message: "Bienvenue.", left: "59%", top: "63%" },
    { message: "Willkommen", left: "63%", top: "38%" },
    { message: "приветствуем", left: "65%", top: "51%" },
  ];

  useEffect(() => {
    const showHelloTimer = setTimeout(() => {
      setShowHello(true);
    }, 1000);

    const showWelcomeBoxTimer = setTimeout(() => {
      setShowWelcomeBox(true);
    }, 2500);

    const hideWelcomeBox = setTimeout(() => {
      setHideWelcomeBox(true);
    }, 5000);

    const hideHelloWelcomeBoxTimer = setTimeout(() => {
      setShowHello(false);
      setShowWelcomeBox(false);
    }, 5300);

    const showThisSpaceTimer = setTimeout(() => {
      setShowThisSpace(true);
    }, 5500);

    const hideThisSpaceTimer1 = setTimeout(() => {
      setHideThisSpace(true);
    }, 7700);

    const hideThisSpaceTimer2 = setTimeout(() => {
      setShowThisSpace(false);
    }, 8000);

    return () => {
      clearTimeout(showHelloTimer);
      clearTimeout(showWelcomeBoxTimer);
      clearTimeout(hideWelcomeBox);
      clearTimeout(hideHelloWelcomeBoxTimer);
      clearTimeout(showThisSpaceTimer);
      clearTimeout(hideThisSpaceTimer1);
      clearTimeout(hideThisSpaceTimer2);
    };
  }, []);

  return (
    <div className="w-full h-full absolute top-0 left-0">
      <h1 className={`introText ${showHello ? "opacity-100" : "opacity-0"}`}>
        HELLO!
      </h1>
      {WelcomeBoxMessage.map((message, index) => (
        <WelcomeBox
          key={index}
          message={message.message}
          style={{
            position: "absolute",
            left: showWelcomeBox || hideWelcomeBox ? message.left : "50%",
            top: showWelcomeBox || hideWelcomeBox ? message.top : "50%",
            transform:
              showWelcomeBox || hideWelcomeBox
                ? "none"
                : "translate(-50%, -50%)",
            transition: !hideWelcomeBox
              ? "left 0.5s ease-in-out, top 0.5s ease-in-out, transform 0.5s ease-in-out, opacity 0.5s ease-in-out"
              : "opacity 0.5s ease-in-out",
            opacity: showWelcomeBox ? 1 : 0,
          }}
        />
      ))}
      <h1
        className={`introText`}
        style={{
          top: showThisSpace || hideThisSpace ? "50%" : "45%",
          transition: "top 0.5s ease-in-out, opacity 0.5s ease-in-out",
          opacity: showThisSpace ? 1 : 0,
        }}
      >
        THIS IS MY SPACE.
      </h1>
    </div>
  );
}
