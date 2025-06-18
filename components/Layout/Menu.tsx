import Image from "next/image";

export default function Menu({
  setIsMenuOpen,
}: {
  setIsMenuOpen: (open: boolean) => void;
}) {
  return (
    <div className="w-[380px] bg-black fixed right-0 top-0 h-screen xl:w-[480px]">
      <Image
        src="/images/icon-close.png"
        alt="Close"
        width={24}
        height={24}
        className="cursor-pointer absolute top-10 right-[60px]"
        onClick={() => setIsMenuOpen(false)}
      />
      {/* the Top */}
      <div className="menu top-[220px] absolute left-[80px] xl:top-[300px]">
        <div className="flex items-center">
          <div className="menu-focus" />
          <h1>HOME</h1>
        </div>
        <h1>ABOUT</h1>
        <h1>PROJECTS</h1>
        <h1>CONTACT</h1>
      </div>
      {/* the Bottom*/}
      <Image
        src="/images/icon-github.png"
        alt="GitHub"
        width={20}
        height={20}
        className="absolute bottom-[170px] left-[80px]"
      />
      <Image
        src="/images/icon-behance.png"
        alt="Behance"
        width={20}
        height={20}
        className="absolute bottom-[170px] left-[120px]"
      />
      <Image
        src="/images/icon-mail.png"
        alt="Email"
        width={20}
        height={20}
        className="absolute bottom-[170px] left-[160px]"
      />
      <div className="line absolute right-20 bottom-[152px] w-[220px] xl:w-[320px]" />
      <p className="text-gray-30 text-[0.875rem] absolute left-[80px] bottom-[120px]">
        Design by Juyoung
      </p>
    </div>
  );
}
