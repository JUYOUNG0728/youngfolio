import Image from "next/image";

type ProjectItemProps = {
  imageSrc: string;
  title: string;
  description: string;
  link: string;
};

export default function ProjectItem({
  imageSrc,
  title,
  description,
  link,
}: ProjectItemProps) {
  const projectDivStyle =
    "project-item !pointer-events-auto !select-auto cursor-pointer mx-auto w-[calc(100%-60px)] h-[40vh] md:min-w-[580px] md:w-[40vw] md:h-[60vh]";

  return (
    <div
      className={`${projectDivStyle}`}
      onClick={() => {
        window.open(`https://${link}`, "_blank");
      }}
    >
      <div className="w-full h-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover border border-gray-40 rounded-xl"
        />
      </div>
      <div className="mt-7 flex flex-col gap-3 ml-4 md:mt-10 md:gap-4 xl:mt-11 xl:gap-5">
        <h1 className="h5">{title}</h1>
        <p className="body5">{description}</p>
      </div>
    </div>
  );
}
