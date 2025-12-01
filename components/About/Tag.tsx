type TagProps = {
  tag: string;
};

export default function Tag({ tag }: TagProps) {
  return (
    <span className="rounded-full bg-black text-white body4 font-medium w-fit px-5 py-2 xl:px-6">
      # {tag}
    </span>
  );
}
