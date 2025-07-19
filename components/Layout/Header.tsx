"use client";

import Image from "next/image";
import { useState } from "react";
import Menu from "./Menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="absolute z-50 top-0 px-[60px] w-full h-[110px]">
        <div className="flex items-center justify-between w-full h-full">
          <Image src="/images/logo.svg" alt="Logo" width={158} height={25} />
          {!isMenuOpen ? (
            <Image
              src="/images/icon-hamburger.png"
              alt="Menu"
              width={28}
              height={28}
              className="cursor-pointer"
              onClick={toggleMenu}
            />
          ) : (
            <Image
              src="/images/icon-close.png"
              alt="Menu"
              width={28}
              height={28}
              className="cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </div>
      </div>
      <div className="fixed inset-0 z-40">
        {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
      </div>
    </div>
  );
}
