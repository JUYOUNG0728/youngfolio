type HamburgerProps = {
  width?: number;
  height?: number;
  onClick?: () => void;
  className?: string;
  fill?: string;
};

export default function Hamburger({
  width = 24,
  height = 24,
  onClick,
  className = "",
  fill = "#ffffff",
}: HamburgerProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 104 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
    >
      <path
        d="M48.818 100.182C50.5754 101.939 53.4246 101.939 55.182 100.182L83.8198 71.5442C85.5772 69.7868 85.5772 66.9376 83.8198 65.1802C82.0624 63.4228 79.2132 63.4228 77.4558 65.1802L52 90.636L26.5442 65.1802C24.7868 63.4228 21.9376 63.4228 20.1802 65.1802C18.4228 66.9376 18.4228 69.7868 20.1802 71.5442L48.818 100.182ZM52 0L47.5 1.96701e-07L47.5 97L52 97L56.5 97L56.5 -1.96701e-07L52 0Z"
        fill={fill}
      />
    </svg>
  );
}
