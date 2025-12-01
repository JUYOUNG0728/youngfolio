import ProjectItem from "@/components/Main/ProjectItem";
import { projects } from "@/data/projects";

type ProjectSectionProps = {
  projectRef: React.RefObject<HTMLElement>;
};

export default function ProjectSection({ projectRef }: ProjectSectionProps) {
  const someProjects = projects.slice(0, 4);

  return (
    <section
      className="w-full text-white grid grid-cols-3 gap-4"
      ref={projectRef}
    >
      {someProjects.map((project, index) => (
        <div key={index} className="w-full">
          <ProjectItem
            imageSrc={project.imageSrc}
            title={project.title}
            description={project.description}
            link={project.link}
          />
        </div>
      ))}
    </section>
  );
}
