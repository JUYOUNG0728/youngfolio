export default function ProjectCard({
  project,
  focus = false,
}: {
  project: { name: string; description: string; image: string };
  focus?: boolean;
}) {
  const baseClass =
    "bg-black shadow-lg rounded-xl flex flex-col justify-end text-white text-center";

  const sizeClass = focus
    ? "w-[21%] h-[50%] px-11 py-11 xl:px-14 xl:py-14"
    : "w-[17%] h-[40%] px-8 py-8 opacity-40 xl:px-10 xl:py-10";

  const textClass = focus
    ? { title: "h4 mb-4 xl:mb-6", body: "body5" }
    : { title: "h5 mb-3 xl:mb-4", body: "body6" };

  const backgroundStyle = focus
    ? undefined
    : {
        background:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.50) 20%, black 50%)",
      };

  return (
    <div className={`${baseClass} ${sizeClass}`} style={backgroundStyle}>
      <div>
        <h1 className={textClass.title}>{project.name}</h1>
        <p className={textClass.body}>{project.description}</p>
      </div>
    </div>
  );
}
