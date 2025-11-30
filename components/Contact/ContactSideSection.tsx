import Image from "next/image";
import useScreenWidth from "@/utils/useScreenWidth";

export default function ContactSideSection() {
  const screenWidth = useScreenWidth();

  return (
    <section className="sticky top-[25vh]">
      <h1 className="text-nowrap">
        <div className="w-[5vw] h-[5vw] relative mb-[3vw]">
          <Image src="/images/icon-door.png" alt="문" fill />
        </div>
        <span className="flex flex-col gap-[1.75vw]">
          <span
            className="font-semibold"
            style={{
              fontSize: screenWidth * 0.05,
            }}
          >
            ANY 3 .
          </span>
          <span className="h4 !font-medium text-gray-40">
            Anything, Anywhere, Anytime
          </span>
        </span>
      </h1>
      <p className="body3 mt-[4.5vw]">
        궁금한 점이 있으시면 언제든지 문의해주세요.
        <br />
        확인 후 최대한 빠르게 답변드리겠습니다.
      </p>
    </section>
  );
}
