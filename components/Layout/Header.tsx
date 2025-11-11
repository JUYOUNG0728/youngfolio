"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import Menu from "@/components/Layout/Menu";
import useScreenWidth from "@/utils/useScreenWidth";
import Logo from "@/components/Common/Logo";
import Hamburger from "@/components/Common/Hamburger";
import Close from "@/components/Common/Close";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const screenWidth = useScreenWidth();

  const iconSize = screenWidth < 1920 ? 24 : 30;

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    if (pathname === "/") {
      window.location.reload();
    } else {
      router.push("/");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const whiteMode = pathname === "/";

  return (
    <div>
      <div className="absolute z-50 top-0 px-[70px] w-full pointer-events-none h-[120px] xl:h-[140px] xl:px-[100px]">
        <div className="flex items-center justify-between w-full h-full pointer-events-auto">
          <Logo
            onClick={handleLogoClick}
            className="cursor-pointer"
            fill={whiteMode ? "#000000" : "#ffffff"}
            width={screenWidth < 1920 ? 150 : 180}
            height={screenWidth < 1920 ? 24 : 28}
          />
          <div className="bg-white rounded-full p-5 flex justify-center items-center fixed top-7 right-[70px] xl:right-[100px] xl:p-6">
            {!isMenuOpen ? (
              <Hamburger
                width={iconSize}
                height={iconSize}
                className="cursor-pointer"
                onClick={toggleMenu}
                fill="#000000"
              />
            ) : (
              <Close
                width={iconSize}
                height={iconSize}
                className="cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
                fill="#000000"
              />
            )}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 z-40">
          <Menu setIsMenuOpen={setIsMenuOpen} />
        </div>
      )}
    </div>
  );
}
