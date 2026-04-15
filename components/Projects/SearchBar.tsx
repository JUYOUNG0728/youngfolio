import Image from "next/image";
import useScreenWidth from "@/utils/useScreenWidth";

type SearchBarProps = {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBar({
  searchTerm,
  handleSearch,
}: SearchBarProps) {
  const screenWidth = useScreenWidth();

  const iconSize = screenWidth >= 1920 ? 24 : 20;

  return (
    <div className="relative">
      <input
        className="min-w-[300px] w-full py-3 bg-gray-10 rounded-full mb-4 pl-6 text-black body4 placeholder-gray-50 pr-20 md:w-[24vw] lg:pl-8 focus:outline-none xl:py-4 xl:pl-10 xl:pr-[100px]"
        placeholder="프로젝트를 검색해보세요."
        value={searchTerm}
        onChange={handleSearch}
      />
      <Image
        src="/images/icon-search.png"
        alt="검색 아이콘"
        width={iconSize}
        height={iconSize}
        className="absolute right-6 top-3.5 lg:top-4 lg:right-8 xl:right-10 xl:top-[21px]"
      />
    </div>
  );
}
