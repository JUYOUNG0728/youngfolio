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
  return (
    <div
      className="flex flex-col cursor-pointer gap-6 lg:gap-8"
      onClick={() => window.open(project.link, "_blank")}
    >
      <div className="w-full h-[40vh] relative">
        <Image
          src={project.imageSrc}
          alt={`${project.title} 썸네일`}
          fill
          className="object-cover border border-gray-40 rounded-xl"
        />
      </div>
      <div className="flex flex-col gap-3 lg:gap-4">
        <h2 className="h6">{project.title}</h2>
        <p className="text-sm">{project.description}</p>
      </div>
    </div>
  );
}
