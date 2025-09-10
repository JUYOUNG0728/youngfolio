"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Menu from "./Menu";

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

  const logoSize =
    screenWidth < 1920
      ? { width: 150, height: 24 }
      : { width: 180, height: 28 };

  return (
    <div>
      <div className="absolute z-50 top-0 px-[70px] w-full h-[120px] xl:h-[140px]">
        <div className="flex items-center justify-between w-full h-full">
          <Image
            src="/images/img-logo.svg"
            alt="Logo"
            width={logoSize.width}
            height={logoSize.height}
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
