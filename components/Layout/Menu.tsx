"use client";

import { useRouter } from "next/navigation";

export default function Menu({
  setIsMenuOpen,
}: {
  setIsMenuOpen: (open: boolean) => void;
}) {
  const router = useRouter();

  const menuItems = [
    { id: "01", label: "Home", href: "/" },
    {
      id: "02",
      label: "About",
      href: "/about/youngfolio",
      submenu: [
        { label: "Youngfolio", href: "/about/youngfolio" },
        { label: "About Creator", href: "/about/creator" },
      ],
    },
    {
      id: "03",
      label: "Contact",
      href: "/contact",
      submenu: [
        { label: "Information", href: "/contact" },
        { label: "Inquiry", href: "/contact#inquiry" },
      ],
    },
  ];

  const handleNavigate = (href: string) => {
    setIsMenuOpen(false);
    router.push(href);
  };

  return (
    <div className="bg-fade-in fixed inset-0">
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex gap-[280px] xl:gap-[420px]">
          {menuItems.map((item, index) => (
            <div key={item.id}>
              <div
                className="flex gap-4 xl:gap-6 cursor-pointer"
                onClick={() => handleNavigate(item.href)}
              >
                <p
                  className="body4 text-gray-30 fade-up"
                  style={{ animationDelay: `${0.6 + index * 0.15}s` }}
                >
                  {item.id}
                </p>
                <h1
                  className="menu relative top-[-10px] fade-up xl:top-[-12px]"
                  style={{ animationDelay: `${0.6 + index * 0.15}s` }}
                >
                  {item.label}
                </h1>
              </div>
              {item.submenu && (
                <div className="flex flex-col gap-4 mt-8 relative opacity-70 xl:gap-6 left-[36px] xl:left-[48px] xl:mt-10">
                  {item.submenu.map((subItem, subIndex) => (
                    <p
                      key={subIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(subItem.href);
                      }}
                      className="subMenu text-gray-10 cursor-pointer fade-up"
                      style={{
                        animationDelay: `${
                          0.6 + (index + subIndex + 1) * 0.15
                        }s`,
                      }}
                    >
                      {subItem.label}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
