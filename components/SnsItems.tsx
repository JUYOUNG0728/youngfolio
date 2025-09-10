import Image from "next/image";

import getScreenWidth from "@/utils/useScreenWidth";

export default function SnsItems() {
  const screenWidth = getScreenWidth();
  const snsItemSize = screenWidth < 1920 ? 24 : 30;

  const snsItems = [
    {
      label: "GitHub",
      href: "https://github.com/JUYOUNG0728",
    },
    {
      label: "Behance",
      href: "https://www.behance.net",
    },
    {
      label: "Mail",
      href: "mailto: vilioite@naver.com",
    },
  ];

  const handleSnsNavigate = (href: string) => {
    window.open(href, "_blank");
  };

  return (
    <div className="flex gap-8 xl:gap-10">
      <Image
        src="/images/icon-github.png"
        alt="GitHub"
        width={snsItemSize}
        height={snsItemSize}
        className="cursor-pointer"
        onClick={() => handleSnsNavigate(snsItems[0].href)}
        priority
      />
      <Image
        src="/images/icon-behance.png"
        alt="Behance"
        width={snsItemSize}
        height={snsItemSize}
        className="cursor-pointer"
        onClick={() => handleSnsNavigate(snsItems[1].href)}
        priority
      />
      <Image
        src="/images/icon-mail.png"
        alt="Mail"
        width={snsItemSize}
        height={snsItemSize}
        className="cursor-pointer"
        onClick={() => handleSnsNavigate(snsItems[2].href)}
        priority
      />
    </div>
  );
}
