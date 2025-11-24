import ProjectItem from "@/components/Main/ProjectItem";
import { projects } from "@/data/projects";

type ProjectSectionProps = {
  projectRef: React.RefObject<HTMLElement>;
};

export default function ProjectSection({ projectRef }: ProjectSectionProps) {
  const someProjects = projects.slice(0, 4);

  const baseStyle = "absolute left-0 right-0";

  const itemStyle = [
    { top: "top-0", md: "md:right-auto" },
    { top: "top-[80vh]", md: "md:top-[100vh] md:left-auto" },
    { top: "top-[160vh]", md: "md:top-[200vh] md:right-auto" },
    { top: "top-[240vh]", md: "md:top-[300vh]" },
  ];

  return (
    <section
      className="w-full text-white absolute top-[470vh] xl:top-[370vh]"
      ref={projectRef}
    >
      {someProjects.map((project, index) => (
        <div
          key={project.id}
          className={`${baseStyle} ${itemStyle[index].top} ${itemStyle[index].md}`}
        >
          <ProjectItem
            imageSrc={project.imageSrc}
            imageAlt={project.title}
            title={project.title}
            description={project.description}
          />
        </div>
      ))}
    </section>
  );
}
