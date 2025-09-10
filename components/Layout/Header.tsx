"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Menu from "./Menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const router = useRouter();

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

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          <Menu setIsMenuOpen={setIsMenuOpen} screenWidth={screenWidth} />
        </div>
      )}
    </div>
  );
}
