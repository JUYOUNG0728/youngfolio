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
      <h2 className="flex flex-col gap-5">
        <span className="h6 text-gray-40 !font-semibold">LIVE CHAT</span>
        <span className="h3">실시간 채팅으로도 문의할 수 있어요.</span>
      </h2>
      <div className="w-full h-[90vh]">
        <InquiryChat messages={messages} handleSend={handleSend} />
      </div>
    </section>
  );
}
