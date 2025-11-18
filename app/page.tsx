"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import useScreenWidth from "@/utils/useScreenWidth";
import VisualSection from "@/components/Main/VisualSection";
import IntroduceSection from "@/components/Main/IntroduceSection";
import ProjectGallerySection from "@/components/Main/ProjectGallerySection";
import ProcessSection from "@/components/Main/ProcessSection";
import ContactSection from "@/components/Main/ContactSection";

import {
  zoomPhoto,
  viewPhotoWords,
  viewProjectWords,
  scaleUpProjects,
  moveProcessTitle,
  changeProcessTextColor,
  marqueeContactText,
} from "@/components/Main/gsapAnimations";

gsap.registerPlugin(ScrollTrigger);

export default function MainPage() {
  const screenWidth = useScreenWidth();

  const contentRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const projectRef = useRef<HTMLDivElement | null>(null);
  const processRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  zoomPhoto({ scrollRef, photoRef, screenWidth });
  viewPhotoWords({ photoRef, screenWidth });
  viewProjectWords({ photoRef, screenWidth });
  scaleUpProjects({ projectRef, screenWidth });
  moveProcessTitle({ processRef, screenWidth });
  changeProcessTextColor({ processRef, screenWidth });
  marqueeContactText({ contactRef, screenWidth });

  return (
    <div
      className="w-full"
      style={{
        backgroundImage: "linear-gradient(180deg, #ffffff 30%, #000000 100%)",
      }}
    >
      <VisualSection />
      <div
        className="w-full h-full relative bottom-[30vh] pointer-events-none select-none"
        ref={contentRef}
      >
        <IntroduceSection scrollRef={scrollRef} />
        <ProjectGallerySection photoRef={photoRef} projectRef={projectRef} />
        <ProcessSection processRef={processRef} />
        <ContactSection contactRef={contactRef} />
      </div>
    </div>
  );
}
