"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Menu from "./Menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="absolute z-50 top-0 px-[60px] w-full h-[110px]">
        <div className="flex items-center justify-between w-full h-full">
          <Image
            src="/images/img-logo.svg"
            alt="Logo"
            width={158}
            height={25}
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
