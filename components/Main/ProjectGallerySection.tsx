import PhotoSection from "./PhotoSection";
import ProjectSection from "./ProjectSection";

type ProjectGallerySectionProps = {
  photoRef: React.RefObject<HTMLDivElement>;
  projectRef: React.RefObject<HTMLDivElement>;
};

export default function ProjectGallerySection({
  photoRef,
  projectRef,
}: ProjectGallerySectionProps) {
  return (
    <div
      className="w-full bg-black relative h-[780vh] xl:h-[760vh] md:h-[860vh]"
      ref={photoRef}
    >
      <PhotoSection />
      <ProjectSection projectRef={projectRef} />
    </div>
  );
}
