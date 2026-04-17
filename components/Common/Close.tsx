type CloseProps = {
  width?: number;
  height?: number;
  onClick?: () => void;
  className?: string;
  fill?: string;
};

export default function Close({
  width = 24,
  height = 24,
  onClick,
  className = "",
  fill = "#ffffff",
}: CloseProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
    >
      <path
        d="M4.95801 5.22229L22.9998 23.264"
        stroke={fill}
        strokeWidth="2.5"
        strokeLinecap="square"
      />
      <path
        d="M4.95801 23.0131L22.9998 4.97132"
        stroke={fill}
        strokeWidth="2.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
