type HamburgerProps = {
  width?: number;
  height?: number;
  onClick?: () => void;
  className?: string;
  fill?: string;
};

export default function Hamburger({
  width = 159,
  height = 25,
  onClick,
  className = "",
  fill = "#ffffff",
}: HamburgerProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
      aria-label="Menu"
    >
      <line y1="6" x2="28" y2="6" stroke={fill} strokeWidth="2.5" />
      <line y1="14" x2="28" y2="14" stroke={fill} strokeWidth="2.5" />
      <line y1="22" x2="28" y2="22" stroke={fill} strokeWidth="2.5" />
    </svg>
  );
}
