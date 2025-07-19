import Image from "next/image";

export default function Menu({
  setIsMenuOpen,
}: {
  setIsMenuOpen: (open: boolean) => void;
}) {
  const menuItems = [
    { id: "01", label: "Home" },
    { id: "02", label: "About", submenu: ["Youngfolio", "About Creator"] },
    { id: "03", label: "Contact", submenu: ["Information", "Inquiry"] },
  ];

  return (
    <div className="bg-fade-in fixed inset-0">
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex gap-[300px] xl:gap-[420px]">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className="cursor-pointer fade-up"
              style={{ animationDelay: `${0.6 + index * 0.15}s` }}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex gap-4 xl:gap-6">
                <p className="body4 text-white opacity-40">{item.id}</p>
                <h1 className="menu relative top-[-14px]">{item.label}</h1>
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
                      {subItem}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div
        className="absolute bottom-12 left-[60px] flex fade-up gap-6 xl:gap-8"
        style={{ animationDelay: "0.6s" }}
      >
        <Image
          src="/images/icon-github.png"
          alt="GitHub"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        />
        <Image
          src="/images/icon-behance.png"
          alt="Behance"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        />
        <Image
          src="/images/icon-mail.png"
          alt="Mail"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        />
      </div>
    </div>
  );
}
