"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Menu from "@/components/Layout/Menu";
import getScreenWidth from "@/utils/useScreenWidth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const screenWidth = getScreenWidth();

  const handleLogoClick = () => {
    router.push("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="absolute z-50 top-0 px-[70px] w-full h-[120px] xl:h-[140px]">
        <div className="flex items-center justify-between w-full h-full">
          <Image
            src="/images/img-logo.svg"
            alt="Logo"
            width={screenWidth < 1920 ? 150 : 180}
            height={screenWidth < 1920 ? 24 : 28}
            priority
            onClick={handleLogoClick}
            className="cursor-pointer"
          />
          {!isMenuOpen ? (
            <Image
              src="/images/icon-hamburger.png"
              alt="Menu"
              width={28}
              height={28}
              className="cursor-pointer"
              onClick={toggleMenu}
              priority
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
