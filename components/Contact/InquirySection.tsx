import InquiryChat from "@/components/Contact/InquiryChat";
import { HandleSendParams, Message } from "@/types/inquiry";

type InquirySectionProps = {
  messages: Message[];
  handleSend: ({ text, imageFile }: HandleSendParams) => Promise<void>;
};

export default function InquirySection({
  messages,
  handleSend,
}: InquirySectionProps) {
  return (
    <section className="flex flex-col gap-12 lg:gap-20">
      <div className="flex flex-col gap-5 lg:gap-8">
        <h2 className="flex flex-col gap-2 lg:gap-4">
          <span className="h6 text-gray-40 !font-semibold">LIVE CHAT</span>
          <span className="h3">실시간 채팅 문의도 할 수 있어요.</span>
        </h2>
        <span className="body4">
          실시간 채팅으로 빠르고 간편하게, 짧은 메시지라도 부담 없이
          문의해보세요.
        </span>
      </div>
      <div className="w-full h-[90vh]">
        <InquiryChat messages={messages} handleSend={handleSend} />
      </div>
    </section>
  );
}
