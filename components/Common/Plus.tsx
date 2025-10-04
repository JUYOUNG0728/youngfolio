export default function Plus({
  width = 24,
  height = 24,
  onClick,
  className = "",
  fill = "#555555",
  stroke = "2",
}: {
  width?: number;
  height?: number;
  onClick?: () => void;
  className?: string;
  fill?: string;
  stroke?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
      aria-label="plus"
    >
      <line y1="12" x2="24" y2="12" stroke={fill} strokeWidth={stroke} />
      <line
        x1="12"
        y1="24"
        x2="12"
        y2="4.37114e-08"
        stroke={fill}
        strokeWidth={stroke}
      />
    </svg>
  );
}
