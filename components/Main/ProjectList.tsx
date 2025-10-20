"use client";

import { useState, useRef } from "react";
import ProjectCard from "@/components/Main/ProjectCard";

export default function ProjectList({ projects }: { projects: any[] }) {
  const [focusProject, setFocusProject] = useState<number>(2);

  const dragStartX = useRef<number | null>(null);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;

    const deltaX = e.clientX - dragStartX.current;

    const threshold = 240;

    if (deltaX > threshold) {
      setFocusProject((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
      dragStartX.current = e.clientX;
    } else if (deltaX < -threshold) {
      setFocusProject((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
      dragStartX.current = e.clientX;
    }
  };

  const onMouseUp = () => {
    dragStartX.current = null;
  };

  return (
    <div className="h-full w-full absolute top-0 items-center flex justify-between p-[70px]">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          focus={focusProject === index}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        />
      ))}
    </div>
  );
}
