import Image from "next/image";
import useScreenWidth from "@/utils/useScreenWidth";

export default function VisualSection() {
  const screenWidth = useScreenWidth();

  const iconInquirySendSize = screenWidth > 1920 ? 40 : 32;

  return (
    <section className="relative w-full h-[100vh] bg-white overflow-hidden pt-32 px-[40px] xl:px-[100px] xl:pt-40 md:px-[70px]">
      <div
        className="absolute top-0 left-0 w-full h-[70vh]"
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%)",
        }}
      />
      <div className="text-black flex flex-col items-center gap-10 xl:gap-12">
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center relative overflow-hidden lg:w-28 lg:h-28 md:w-24 md:h-24">
          <Image
            src="/images/img-character.png"
            alt="캐릭터 이미지"
            width={120}
            height={120}
            className="object-cover rounded-full absolute bottom-[-30px] scale-[175%] lg:scale-150 lg:bottom-[-36px] md:bottom-[-34px] md:scale-[160%]"
          />
        </div>
        <h1 className="h1 text-center">YOUNG, PORTFOLIO</h1>
        <span className="body3 font-semibold py-3 px-7 text-black border border-black rounded-full mt-2 xl:mt-4 lg:py-4 lg:px-8">
          2025 : Imagine beyond words
        </span>
      </div>
      {screenWidth > 768 && (
        <div>
          <div className="absolute left-10 bottom-[10vh] flex flex-col items-center gap-9 xl:gap-14 lg:gap-11">
            <div className="-rotate-90">
              <span className="text-black font-semibold body5">SCROLL TO</span>
            </div>
            <Image
              src="/images/icon-mouse-scroll.png"
              alt="마우스 스크롤"
              width={16}
              height={16}
            />
          </div>
          <button
            className="absolute flex justify-center items-center right-[60px] bottom-[10vh] bg-black rounded-full w-28 h-28 xl:w-40 xl:h-40 lg:w-32 lg:h-32"
            onClick={() => (window.location.href = "/contact")}
          >
            <Image
              src="/images/icon-inquiry-button.png"
              alt="문의하기 버튼 텍스트"
              fill
              className="absolute animate-spin"
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
