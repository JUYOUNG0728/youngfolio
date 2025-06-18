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
    <div className="absolute z-50 top-10 px-[60px] w-full">
      <div className="flex items-center justify-between w-full">
        <Image src="/images/logo.svg" alt="Logo" width={158} height={25} />
        <Image
          src="/images/icon-hamburger.png"
          alt="Menu"
          width={28}
          height={28}
          className="cursor-pointer"
          onClick={toggleMenu}
        />
        {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
      </div>
    </div>
  );
}
