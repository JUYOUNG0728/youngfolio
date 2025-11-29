import Image from "next/image";

type ProjectItemProps = {
  project: {
    title: string;
    description: string;
    imageSrc: string;
    link: string;
  };
};

export default function ProjectItem({ project }: ProjectItemProps) {
  const handleClick = (link: string) => {
    window.open(`https://${link}`, "_blank");
  };

  return (
    <div
      className="flex flex-col cursor-pointer gap-8 lg:gap-11"
      onClick={() => handleClick(project.link)}
    >
      <div className="w-full h-[40vh] relative">
        <Image
          src={project.imageSrc}
          alt={`${project.title} 썸네일`}
          fill
          className="object-cover border border-gray-40 rounded-xl"
        />
      </div>
      <div className="flex flex-col gap-4 lg:gap-5">
        <h2 className="h5">{project.title}</h2>
        <p className="body5">{project.description}</p>
      </div>
    </div>
  );
}
