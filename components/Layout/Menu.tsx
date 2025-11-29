"use client";

import { useRouter } from "next/navigation";
import useScreenWidth from "@/utils/useScreenWidth";

export default function Menu({
  setIsMenuOpen,
}: {
  setIsMenuOpen: (open: boolean) => void;
}) {
  const screenWidth = useScreenWidth();

  const router = useRouter();

  const menuItems = [
    { id: "01", label: "HOME", href: "/" },
    {
      id: "02",
      label: "ABOUT ME",
      href: "/about",
    },
    {
      id: "03",
      label: "PROJECTS",
      href: "/projects",
    },
    {
      id: "04",
      label: "CONTACT",
      href: "/contact",
    },
  ];

  const handleNavigate = (href: string) => {
    setIsMenuOpen(false);
    router.push(href);
  };

  return (
    <div className="bg-fade-in fixed inset-0 z-40">
      <div className="flex items-center justify-center h-full w-full">
        <div
          className={`${
            screenWidth >= 1680
              ? "w-full gap-[9vw]"
              : "w-[calc(100%-1200px)] gap-[16vw] md:gap-[9vw] lg:gap-[7vw]"
          } flex justify-center flex-wrap`}
        >
          {menuItems.map((item, index) => (
            <div key={item.id}>
              <div
                className="flex cursor-pointer gap-4 xl:gap-6"
                onClick={() => handleNavigate(item.href)}
              >
                <p
                  className="body2 text-gray-20 fade-up"
                  style={{ animationDelay: `${0.6 + index * 0.15}s` }}
                >
                  {item.id}
                </p>
                <h1
                  className="menu text-nowrap relative fade-up top-[-10px] xl:top-[-12px]"
                  style={{
                    animationDelay: `${0.6 + index * 0.15}s`,
                  }}
                >
                  {item.label}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
