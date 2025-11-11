"use client";

import { useRouter } from "next/navigation";

export default function Menu({
  setIsMenuOpen,
}: {
  setIsMenuOpen: (open: boolean) => void;
}) {
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
      href: "/contact/information",
    },
  ];

  const handleNavigate = (href: string) => {
    setIsMenuOpen(false);
    router.push(href);
  };

  return (
    <div className="bg-fade-in fixed inset-0">
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex gap-[180px] xl:gap-[220px]">
          {menuItems.map((item, index) => (
            <div key={item.id}>
              <div
                className="flex gap-4 xl:gap-6 cursor-pointer"
                onClick={() => handleNavigate(item.href)}
              >
                <p
                  className="body2 text-gray-20 fade-up"
                  style={{ animationDelay: `${0.6 + index * 0.15}s` }}
                >
                  {item.id}
                </p>
                <h1
                  className="menu relative top-[-10px] fade-up xl:top-[-12px]"
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
