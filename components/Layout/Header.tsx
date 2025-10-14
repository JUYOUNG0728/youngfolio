"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import Menu from "@/components/Layout/Menu";
import useScreenWidth from "@/utils/useScreenWidth";
import Logo from "@/components/Common/Logo";
import Hamburger from "@/components/Common/Hamburger";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const screenWidth = useScreenWidth();

  const handleLogoClick = () => {
    router.push("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const setHeaderElementsToBlack = pathname === "";

  // 부분적으로 햄버거 아이콘 색상을 변경
  const setHamburgerToBlack = pathname === "/contact/inquiry";

  return (
    <div>
      <div className="absolute z-50 top-0 px-[70px] w-full h-[120px] xl:h-[140px]">
        <div className="flex items-center justify-between w-full h-full">
          <Logo
            onClick={handleLogoClick}
            className="cursor-pointer"
            fill={setHeaderElementsToBlack ? "#000000" : "#FFFFFF"}
            width={screenWidth < 1920 ? 150 : 180}
            height={screenWidth < 1920 ? 24 : 28}
          />
          {!isMenuOpen ? (
            <Hamburger
              width={screenWidth < 1920 ? 28 : 32}
              height={screenWidth < 1920 ? 28 : 32}
              className="cursor-pointer"
              onClick={toggleMenu}
              fill={
                setHeaderElementsToBlack || setHamburgerToBlack
                  ? "#000000"
                  : "#FFFFFF"
              }
            />
          ) : (
            <Image
              src="/images/icon-close.png"
              alt="Menu"
              width={28}
              height={28}
              className="cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
              priority
            />
          )}
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
