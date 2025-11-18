import useScreenWidth from "@/utils/useScreenWidth";
import Arrow from "@/components/Common/Arrow";

type ContactSectionProps = {
  contactRef: React.RefObject<HTMLElement>;
};

export default function ContactSection({ contactRef }: ContactSectionProps) {
  const screenWidth = useScreenWidth();

  const iconContactArrowSize =
    screenWidth > 1920
      ? 64
      : screenWidth > 1280
      ? 52
      : screenWidth > 768
      ? 38
      : 32;

  return (
    <section
      ref={contactRef}
      className={`w-full px-[70px] text-white relative bg-black overflow-hidden !pointer-events-auto !select-auto xl:px-[100px] ${
        !(screenWidth > 1000) && "top-44"
      }`}
    >
      <h2 className="h1 !font-medium flex gap-12">
        <ul className="flex gap-12 whitespace-nowrap marquee">
          <li>FEEL FREE TO EXPLORE 😊</li>
          <li>FEEL FREE TO EXPLORE 😊</li>
          <li>FEEL FREE TO EXPLORE 😊</li>
          <li>FEEL FREE TO EXPLORE 😊</li>
        </ul>
        <ul
          aria-hidden="true"
          className="flex gap-12 whitespace-nowrap marquee"
        >
          <li>FEEL FREE TO EXPLORE 😊</li>
          <li>FEEL FREE TO EXPLORE 😊</li>
          <li>FEEL FREE TO EXPLORE 😊</li>
          <li>FEEL FREE TO EXPLORE 😊</li>
        </ul>
      </h2>
      <button
        className="fullSizeButton mt-16 gap-4 rounded-full xl:mt-36 xl:gap-9 lg:gap-7 md:mt-20"
        onClick={() => (window.location.href = "/contact")}
        onMouseEnter={(e) => (e.currentTarget.style.borderRadius = "1.5rem")}
        onMouseLeave={(e) => (e.currentTarget.style.borderRadius = "10rem")}
        style={{
          transition: "border-radius 0.3s ease-in-out",
        }}
      >
        <span>LET’S GET IN CONTACT</span>
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
