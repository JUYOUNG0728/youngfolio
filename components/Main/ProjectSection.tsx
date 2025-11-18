import Image from "next/image";

type ProjectSectionProps = {
  projectRef: React.RefObject<HTMLElement>;
};

export default function ProjectSection({ projectRef }: ProjectSectionProps) {
  return (
    <section
      className="bg-black w-full absolute top-[300vh] xl:top-[250vh]"
      ref={projectRef}
    >
      <div className="absolute top-0 left-0 right-0 mx-auto min-w-[420px] w-[40vw] h-[40vh] bg-black text-white project-item md:h-[60vh] lg:min-w-[600px] md:min-w-[480px] md:right-auto">
        <div className="w-full h-full">
          <Image
            src="/images/img-project-thumbnail-youngfolio.png"
            alt="YOUNGFOLIO 썸네일"
            fill
            className="object-cover border border-gray-40"
          />
        </div>
        <div className="relative mt-8 flex flex-col gap-2 ml-4">
          <h3 className="h5">YOUNGFOLIO</h3>
          <p className="body5">2025. WEB / UX JUYOUNG'S PORTFOLIO</p>
        </div>
      </div>
      <div className="absolute top-[80vh] left-0 right-0 mx-auto min-w-[420px] w-[40vw] h-[40vh] bg-black text-white project-item md:h-[60vh] md:top-[100vh] lg:min-w-[600px] md:min-w-[480px] md:left-auto">
        <div className="w-full h-full">
          <Image
            src="/images/img-project-thumbnail-youngfolio.png"
            alt="YOUNGFOLIO 썸네일"
            fill
            className="object-cover border border-gray-40"
          />
        </div>
        <div className="relative mt-8 flex flex-col gap-2 ml-4">
          <h3 className="h5">YOUNGFOLIO</h3>
          <p className="body5">2025. WEB / UX JUYOUNG'S PORTFOLIO</p>
        </div>
      </div>
      <div className="absolute top-[160vh] left-0 right-0 mx-auto min-w-[420px] w-[40vw] h-[40vh] bg-black text-white project-item md:h-[60vh] md:top-[200vh] lg:min-w-[600px] md:min-w-[480px] md:right-auto">
        <div className="w-full h-full">
          <Image
            src="/images/img-project-thumbnail-youngfolio.png"
            alt="YOUNGFOLIO 썸네일"
            fill
            className="object-cover border border-gray-40"
          />
        </div>
        <div className="relative mt-8 flex flex-col gap-2 ml-4">
          <h3 className="h5">YOUNGFOLIO</h3>
          <p className="body5">2025. WEB / UX JUYOUNG'S PORTFOLIO</p>
        </div>
      </div>
      <div className="absolute top-[240vh] left-0 right-0 mx-auto min-w-[420px] w-[40vw] h-[40vh] bg-black text-white project-item md:h-[60vh] md:top-[300vh] lg:min-w-[600px] md:min-w-[480px]">
        <div className="w-full h-full">
          <Image
            src="/images/img-project-thumbnail-youngfolio.png"
            alt="YOUNGFOLIO 썸네일"
            fill
            className="object-cover border border-gray-40"
          />
        </div>
        <div className="relative pt-8 flex flex-col gap-2 ml-4">
          <h3 className="h5">YOUNGFOLIO</h3>
          <p className="body5">2025. WEB / UX JUYOUNG'S PORTFOLIO</p>
        </div>
      </div>
    </section>
  );
}
