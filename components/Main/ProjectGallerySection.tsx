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
      className="w-full bg-black relative h-[660vh] xl:h-[640vh] md:h-[740vh]"
      ref={photoRef}
    >
      <PhotoSection />
      <ProjectSection projectRef={projectRef} />
    </div>
  );
}
