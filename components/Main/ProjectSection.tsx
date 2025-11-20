import ProjectItem from "@/components/Main/ProjectItem";

type ProjectSectionProps = {
  projectRef: React.RefObject<HTMLElement>;
};

export default function ProjectSection({ projectRef }: ProjectSectionProps) {
  return (
    <section
      className="w-full text-white absolute top-[350vh] xl:top-[250vh]"
      ref={projectRef}
    >
      <ProjectItem
        imageSrc="/images/img-project-thumbnail-youngfolio.png"
        imageAlt="YOUNGFOLIO 썸네일"
        title="YOUNGFOLIO"
        description="2025. WEB / UX JUYOUNG'S PORTFOLIO"
        top="0"
        mdTop="0"
        align="left"
      />

      <ProjectItem
        imageSrc="/images/img-project-thumbnail-youngfolio.png"
        imageAlt="YOUNGFOLIO 썸네일"
        title="YOUNGFOLIO"
        description="2025. WEB / UX JUYOUNG'S PORTFOLIO"
        top="80vh"
        mdTop="100vh"
        align="right"
      />

      <ProjectItem
        imageSrc="/images/img-project-thumbnail-youngfolio.png"
        imageAlt="YOUNGFOLIO 썸네일"
        title="YOUNGFOLIO"
        description="2025. WEB / UX JUYOUNG'S PORTFOLIO"
        top="160vh"
        mdTop="200vh"
        align="left"
      />

      <ProjectItem
        imageSrc="/images/img-project-thumbnail-youngfolio.png"
        imageAlt="YOUNGFOLIO 썸네일"
        title="YOUNGFOLIO"
        description="2025. WEB / UX JUYOUNG'S PORTFOLIO"
        top="240vh"
        mdTop="300vh"
      />
    </section>
  );
}
