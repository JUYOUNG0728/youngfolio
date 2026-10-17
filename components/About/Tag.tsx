type TagProps = {
  tag: string;
};

export default function Tag({ tag }: TagProps) {
  return <span className="body4 w-fit font-medium text-black/75"># {tag}</span>;
}
