"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Common/Button";

export default function InquiryBox() {
  const router = useRouter();

  const handleClickInquiryButton = () => {
    router.push("/contact");
  };

  return (
    <div className="bg-black w-[590px] h-[160px] text-white rounded-2xl flex items-center justify-between px-12 xl:w-[700px] xl:h-[200px]">
      <div className="flex flex-col gap-3 mt-[-10px]">
        <p className="body5 font-medium text-gray-30">Inquiry .</p>
        <p className="body2 font-semibold">
          더 궁금하시다면,
          <br />
          언제든지 편하게 문의주세요.
        </p>
      </div>
      <Button
        text="문의하기"
        variant="secondaryOutline"
        onClick={handleClickInquiryButton}
        className="mr-2"
      />
    </div>
  );
}
