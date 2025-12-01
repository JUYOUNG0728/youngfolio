import ProjectItem from "@/components/Main/ProjectItem";
import { projects } from "@/data/projects";

type ProjectSectionProps = {
  projectRef: React.RefObject<HTMLElement>;
};

export default function ProjectSection({ projectRef }: ProjectSectionProps) {
  const someProjects = projects.slice(0, 4);

  return (
    <section
      className="w-fit text-white flex flex-col lg:flex-row mx-auto gap-12"
      ref={projectRef}
    >
      {someProjects.map((project, index) => (
        <div key={project.id}>
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
