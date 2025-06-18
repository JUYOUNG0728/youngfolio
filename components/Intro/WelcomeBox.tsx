export default function WelcomeBox({
  message,
  className,
  style,
}: {
  message: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className}>
      <div
        className="bg-white/15 rounded-full px-5 py-3 border border-white/15 w-fit xl:px-7 xl:py-4"
        style={style}
      >
        <p className="body4 font-medium text-white whitespace-nowrap">
          {message}
        </p>
      </div>
    </div>
  );
}
