import Image from "next/image";

type ProjectItemProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
};

export default function ProjectItem({
  imageSrc,
  imageAlt,
  title,
  description,
}: ProjectItemProps) {
  const projectDivStyle =
    "project-item w-[calc(100%-60px)] h-[40vh] md:min-w-[580px] md:w-[40vw] md:h-[60vh]";

  return (
    <div className={`${projectDivStyle} mx-auto`}>
      <div className="w-full h-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover border border-gray-40 rounded-xl"
        />
      </div>
      <div className="mt-8 flex flex-col gap-2 ml-4">
        <h1 className="h5">{title}</h1>
        <p className="body5">{description}</p>
      </div>
    </div>
  );
}
