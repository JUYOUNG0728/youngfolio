import SearchBar from "@/components/Projects/SearchBar";
import SubHeader from "@/components/Common/SubHeader";

type ProjectsHeaderProps = {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ProjectsHeader({
  searchTerm,
  handleSearch,
}: ProjectsHeaderProps) {
  return (
    <div className="w-full flex justify-between flex-col px-[30px] md:px-[60px] md:flex-row md:items-end lg:px-[140px]">
      <SubHeader page="Projects" />
      <div className="mb-14 md:mb-28 lg:mb-36">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      </div>
    </div>
  );
}
