"use client";

import { useState, useMemo } from "react";

import useScreenWidth from "@/utils/useScreenWidth";
import ProjectsHeader from "@/components/Projects/ProjectsHeader";
import ProjectItem from "@/components/Projects/ProjectItem";
import Pagination from "@/components/Projects/Pagination";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  const screenWidth = useScreenWidth();

  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = screenWidth <= 768 ? 2 : screenWidth <= 1280 ? 4 : 6;

  const filteredProjects = useMemo(() => {
    return projects.filter(
      (project) =>
        project.title.toUpperCase().includes(searchTerm.toUpperCase()) ||
        project.description.toUpperCase().includes(searchTerm.toUpperCase())
    );
  }, [searchTerm, projects]);

  const startIndex = (activePage - 1) * itemsPerPage;
  const filteredCurrentProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setActivePage(1);
  };

  return (
    <div className="w-full text-white pb-24 md:pb-36 lg:pb-44 xl:pb-56">
      <ProjectsHeader searchTerm={searchTerm} handleSearch={handleSearch} />
      <div className="w-full px-[30px] gap-y-12 gap-x-12 grid grid-cols-1 mb-16 md:gap-y-16 md:mb-24 md:grid-cols-2 md:px-[60px] lg:grid-cols-3 lg:gap-y-20 lg:px-[140px] lg:mb-36">
        {filteredCurrentProjects.length > 0 ? (
          filteredCurrentProjects.map((project) => (
            <div key={project.id}>
              <ProjectItem project={project} />
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 body4 mt-20">
            검색 결과가 없습니다.
          </p>
        )}
      </div>
      {filteredProjects.length > itemsPerPage && (
        <div className="flex justify-center">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={filteredProjects.length}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
