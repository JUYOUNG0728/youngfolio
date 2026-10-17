import Image from "next/image";

type FeedProps = {
  hobby: {
    name: string;
    tags: string[];
    video: boolean;
    links: string[];
  };
};

export default function Feed({ hobby }: FeedProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <div className="grid-cols-2 grid gap-3 md:gap-4">
        {hobby.links.map((link) => (
          <div
            key={link}
            className="relative w-full overflow-hidden bg-black aspect-[4/4] rounded-3xl"
          >
            {hobby.video && link.includes("youtube.com") ? (
              <iframe
                src={`https://www.youtube.com/embed/${new URL(link).searchParams.get("v")}`}
                title={`${hobby.name} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : hobby.video && link.endsWith(".mp4") ? (
              <video
                src={link}
                controls
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Image
                src={link}
                alt={`${hobby.name} link`}
                fill
                sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
