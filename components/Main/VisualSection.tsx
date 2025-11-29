import Image from "next/image";
import useScreenWidth from "@/utils/useScreenWidth";

export default function VisualSection() {
  const screenWidth = useScreenWidth();

  const iconInquirySendSize = screenWidth > 1920 ? 40 : 32;

  const handleClickInquiry = () => {
    window.location.href = "/contact";
  };

  return (
    <section className="relative w-full h-screen bg-white text-black overflow-hidden pt-32 px-[40px] md:px-[70px] xl:px-[100px] xl:pt-40">
      <div
        className="absolute top-0 left-0 w-full h-[70vh]"
        style={{
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%)",
        }}
      />
      <div className="flex flex-col items-center gap-7 lg:gap-10 xl:gap-12">
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center relative overflow-hidden md:w-24 md:h-24 lg:w-28 lg:h-28">
          <Image
            src="/images/img-character.png"
            alt="캐릭터 이미지"
            width={120}
            height={120}
            className="object-cover rounded-full absolute bottom-[-30px] scale-[175%] md:bottom-[-34px] md:scale-[160%] lg:bottom-[-36px] lg:scale-150"
          />
        </div>
        <h1 className="h1 text-center leading-[1.2] mb-4">YOUNG, PORTFOLIO</h1>
        <span className="body3 font-semibold py-3 px-7 border border-black rounded-full lg:mt-2 xl:mt-4 lg:py-4 lg:px-8 xl:px-10">
          2025 : Imagine beyond words
        </span>
      </div>
      {screenWidth >= 768 && (
        <div className="absolute w-full pl-10 pr-[60px] bottom-[10vh] left-0 flex justify-between items-end">
          <div className="flex flex-col items-center gap-9 lg:gap-11 xl:gap-14">
            <div className="-rotate-90">
              <span className="font-semibold body5">SCROLL TO</span>
            </div>
            <Image
              src="/images/icon-mouse-scroll.png"
              alt="마우스 스크롤"
              width={16}
              height={16}
            />
          </div>
          <button
            className="relative flex justify-center items-center bg-black rounded-full w-28 h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40"
            onClick={handleClickInquiry}
          >
            <Image
              src="/images/icon-inquiry-button.png"
              alt="문의하기 버튼 텍스트"
              fill
              className="animate-spin"
              style={{ animationDuration: "12s" }}
            />
            <Image
              src="/images/icon-send.png"
              alt="문의하기 아이콘"
              width={iconInquirySendSize}
              height={iconInquirySendSize}
            />
          </button>
        </div>
      )}
    </section>
  );
}
