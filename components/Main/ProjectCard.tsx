export default function ProjectCard({
  project,
  focus = false,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onClick,
}: {
  project: { name: string; description: string; image: string };
  focus?: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp: () => void;
  onClick?: () => void;
}) {
  const baseClass =
    "bg-black shadow-lg rounded-xl flex flex-col justify-end text-white text-center transition-all ease-in-out duration-500";

  const sizeClass = focus
    ? "w-[21%] h-[50%] px-11 py-11 xl:px-14 xl:py-14"
    : "w-[17%] h-[40%] px-8 py-8 opacity-40 xl:px-10 xl:py-10";

  const textClass = focus
    ? { title: "h4 mb-4 xl:mb-6", body: "body5" }
    : { title: "h5 mb-3 xl:mb-4", body: "body6" };

  const pointerClass = focus ? "cursor-pointer" : "cursor-default";

  const backgroundStyle = focus
    ? undefined
    : {
        background:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.50) 20%, black 50%)",
      };

  return (
    <div
      className={`${baseClass} ${sizeClass} ${pointerClass} select-none`}
      style={backgroundStyle}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onClick={focus ? onClick : undefined}
    >
      <div>
        <h1 className={textClass.title}>{project.name}</h1>
        <p className={textClass.body}>{project.description}</p>
      </div>
    </div>
  );
}
