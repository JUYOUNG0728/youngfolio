import useScreenWidth from "@/utils/useScreenWidth";
import Arrow from "@/components/Common/Arrow";

type ContactSectionProps = {
  contactRef: React.RefObject<HTMLElement>;
};

export default function ContactSection({ contactRef }: ContactSectionProps) {
  const screenWidth = useScreenWidth();

  const marqueeText = Array(4).fill("FEEL FREE TO EXPLORE 😊");

  const marqueeTextStyle = "flex gap-12 whitespace-nowrap marquee";

  const iconContactArrowSize =
    screenWidth >= 1920
      ? 64
      : screenWidth >= 1280
      ? 52
      : screenWidth >= 768
      ? 38
      : 32;

  const handleClickContact = () => {
    window.location.href = "/contact";
  };

  const handleMouseEnterContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderRadius = "1.5rem";
  };

  const handleMouseLeaveContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderRadius = "10rem";
  };

  return (
    <section
      ref={contactRef}
      className="w-full text-white relative bg-black overflow-hidden !pointer-events-auto !select-auto px-[30px] md:px-[70px]"
    >
      <h2 className="h1 !font-medium flex gap-12">
        <ul className={marqueeTextStyle}>
          {marqueeText.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
        <ul aria-hidden="true" className={marqueeTextStyle}>
          {marqueeText.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </h2>
      <button
        className="fullSizeButton mt-16 gap-4 rounded-full md:mt-20 lg:gap-7 xl:mt-36 xl:gap-9"
        onClick={handleClickContact}
        onMouseEnter={handleMouseEnterContact}
        onMouseLeave={handleMouseLeaveContact}
        style={{
          transition: "border-radius 0.3s ease-in-out",
        }}
      >
        <span className="leading-[1.5]">LET’S GET IN CONTACT</span>
        <Arrow
          width={iconContactArrowSize}
          height={iconContactArrowSize}
          fill="#ffffff"
          className="-rotate-[135deg]"
        />
      </button>
    </section>
  );
}
