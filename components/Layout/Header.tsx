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

  const iconSize = screenWidth < 768 ? 20 : screenWidth < 1920 ? 24 : 30;
  const logoSize = {
    width: screenWidth < 768 ? 140 : screenWidth < 1920 ? 150 : 180,
    height: screenWidth < 768 ? 22 : screenWidth < 1920 ? 24 : 28,
  };

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
      <div className="absolute z-50 top-0 px-[30px] w-full pointer-events-none h-[120px] md:px-[70px] xl:h-[140px]">
        <div className="flex items-center justify-between w-full h-full pointer-events-auto">
          <Logo
            onClick={handleLogoClick}
            className="cursor-pointer"
            fill={whiteMode ? "#000000" : "#ffffff"}
            width={logoSize.width}
            height={logoSize.height}
          />
          <div className="bg-white rounded-full p-4 flex justify-center items-center fixed top-7 right-[30px] md:right-[70px] md:p-5 xl:p-6">
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
