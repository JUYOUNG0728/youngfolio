import Image from "next/image";

type SearchBarProps = {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBar({
  searchTerm,
  handleSearch,
}: SearchBarProps) {
  return (
    <div className="relative">
      <input
        className="min-w-[300px] w-full h-[50px] bg-gray-10 rounded-full mb-4 px-8 text-black body4 placeholder-gray-40 md:w-[24vw] lg:h-14 focus:outline-none"
        placeholder="프로젝트를 검색해보세요."
        value={searchTerm}
        onChange={handleSearch}
      />
      <Image
        src="/images/icon-search.png"
        alt="검색 아이콘"
        width={20}
        height={20}
        className="absolute right-8 top-3.5 lg:top-4"
      />
    </div>
  );
}
