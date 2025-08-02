import Image from "next/image";
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

  const snsItems = [
    { label: "GitHub", href: "https://github.com/JUYOUNG0728" },
    { label: "Behance", href: "https://www.behance.net" },
    { label: "Mail", href: "mailto: vilioite@naver.com" },
  ];

  const handleNavigate = (href: string) => {
    setIsMenuOpen(false);
    router.push(href);
  };

  const handleSnsNavigate = (href: string) => {
    window.open(href, "_blank");
  };

  return (
    <div className="bg-fade-in fixed inset-0">
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex gap-[280px] xl:gap-[420px]">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className="cursor-pointer fade-up"
              style={{ animationDelay: `${0.6 + index * 0.15}s` }}
              onClick={() => handleNavigate(item.href)}
            >
              <div className="flex gap-4 xl:gap-6">
                <p className="body4 text-white opacity-40">{item.id}</p>
                <h1 className="menu relative top-[-10px] xl:top-[-12px]">
                  {item.label}
                </h1>
              </div>
              {item.submenu && (
                <div className="flex flex-col gap-3 mt-8 relative opacity-70 xl:gap-5 left-[36px] xl:left-[48px]">
                  {item.submenu.map((subItem, subIndex) => (
                    <p
                      key={subIndex}
                      className="subMenu text-white opacity-80 fade-up"
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
      <div
        className="absolute bottom-12 left-[60px] flex fade-up gap-7 xl:gap-8"
        style={{ animationDelay: "0.6s" }}
      >
        <Image
          src="/images/icon-github.png"
          alt="GitHub"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => handleSnsNavigate(snsItems[0].href)}
          priority
        />
        <Image
          src="/images/icon-behance.png"
          alt="Behance"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => handleSnsNavigate(snsItems[1].href)}
          priority
        />
        <Image
          src="/images/icon-mail.png"
          alt="Mail"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => handleSnsNavigate(snsItems[2].href)}
          priority
        />
      </div>
    </div>
  );
}
