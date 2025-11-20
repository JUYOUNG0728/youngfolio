import Image from "next/image";

type ProjectItemProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  align?: "left" | "right";
  top: string;
  mdTop: string;
};

export default function ProjectItem({
  imageSrc,
  imageAlt,
  title,
  description,
  align,
  top,
  mdTop,
}: ProjectItemProps) {
  const projectDivStyle =
    "project-item absolute left-0 right-0 mx-auto min-w-[420px] w-[40vw] h-[40vh] md:min-w-[480px] md:h-[60vh] lg:min-w-[600px]";

  const alignStyle = align
    ? align === "right"
      ? "md:left-auto"
      : "md:right-auto"
    : "";

  return (
    <div
      className={`${projectDivStyle} ${alignStyle} top-[${top}] md:top-[${mdTop}]`}
    >
      <div className="w-full h-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover border border-gray-40"
        />
      </div>
      <div className="mt-8 flex flex-col gap-2 ml-4">
        <h3 className="h5">{title}</h3>
        <p className="body5">{description}</p>
      </div>
    </div>
  );
}
