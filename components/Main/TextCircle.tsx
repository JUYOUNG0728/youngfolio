import Image from "next/image";
import Arrow from "@/components/Common/Arrow";

export default function TextCircle() {
  return (
    <div className="w-[30vw] h-[30vw] relative -rotate-90 md:w-[20vw] md:h-[20vw] lg:w-[12vw] lg:h-[12vw]">
      <Image
        src="/images/img-introduce-spin.png"
        alt="소개 이미지"
        fill
        className="object-cover animate-spin"
        style={{ animationDuration: "10s" }}
      />
      <Arrow
        width={24}
        height={24}
        fill="#fff"
        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      />
    </div>
  );
}
