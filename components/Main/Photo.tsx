export default function Photo({
  image,
  focus = false,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onClick,
}: {
  image: string;
  focus?: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp: () => void;
  onClick?: () => void;
}) {
  return (
    <div
      className={`h-full w-full bg-black shadow-lg rounded-xl flex flex-col justify-end text-white text-center ${
        focus ? "opacity-100" : "opacity-40"
      }`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "all 0.3s ease-in-out",
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onClick={focus ? onClick : undefined}
    ></div>
  );
}
