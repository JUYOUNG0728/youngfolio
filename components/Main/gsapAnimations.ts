import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ContentsProps = {
  contentRef: React.RefObject<HTMLDivElement>;
  screenWidth: number;
};

type ZoomPhotoProps = {
  scrollRef: React.RefObject<HTMLDivElement>;
  photoRef: React.RefObject<HTMLDivElement>;
  screenWidth: number;
};

type PhotoProps = {
  photoRef: React.RefObject<HTMLDivElement>;
  screenWidth: number;
};

type ProjectsProps = {
  projectRef: React.RefObject<HTMLDivElement>;
  screenWidth: number;
};

type ProcessProps = {
  processRef: React.RefObject<HTMLDivElement>;
  screenWidth: number;
};

type ContactProps = {
  contactRef: React.RefObject<HTMLDivElement>;
  screenWidth: number;
};

gsap.registerPlugin(ScrollTrigger);

/* contents 위로 올라오는 애니메이션 */
function upContents({ contentRef, screenWidth }: ContentsProps) {
  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { marginTop: "-30vh" });

      const tween = gsap.to(contentRef.current, {
        marginTop: "-100vh",
        paused: true,
      });

      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top center",
        end: "top -80%",
        onUpdate: (self) => {
          tween.progress(self.progress);
        },
      });
    }, contentRef);

    return () => ctx.revert();
  }, [screenWidth]);
}

/* 사진 줌인 애니메이션 */
function zoomPhoto({ scrollRef, photoRef, screenWidth }: ZoomPhotoProps) {
  useLayoutEffect(() => {
    if (!scrollRef.current || !photoRef.current) return;

    const photoDiv = photoRef.current.querySelector(".zoom-photo");
    const photo = photoRef.current.querySelector(".zoom-photo-img");

    const ctx = gsap.context(() => {
      gsap.set(photoDiv, { width: "60vw" });
      gsap.set(photo, { filter: "brightness(1)" });

      ScrollTrigger.create({
        trigger: scrollRef.current,
        start: "bottom -100%",
        onEnter: () => {
          gsap.to(photoDiv, { width: "100vw", duration: 0.5 }),
            gsap.to(photo, { filter: "brightness(0.5)", duration: 0.5 });
        },
        onLeaveBack: () => {
          gsap.to(photoDiv, { width: "60vw", duration: 0.5 }),
            gsap.to(photo, { filter: "brightness(1)", duration: 0.5 });
        },
      });
    }, scrollRef);

    return () => ctx.revert();
  }, [screenWidth]);
}

/* 사진 글자 나타나는 애니메이션 */
function viewPhotoWords({ photoRef, screenWidth }: PhotoProps) {
  useLayoutEffect(() => {
    if (!photoRef.current) return;

    const words = photoRef.current.querySelector(".photo-words");

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0 });

      ScrollTrigger.create({
        trigger: photoRef.current,
        start: "top center",
        onEnter: () => gsap.to(words, { opacity: 1, duration: 0.5 }),
        onLeaveBack: () => gsap.to(words, { opacity: 0, duration: 0.5 }),
      });
    }, photoRef);

    return () => ctx.revert();
  }, [screenWidth]);
}

/* 프로젝트 글자 나타나는 애니메이션 */
function viewProjectWords({ photoRef, screenWidth }: PhotoProps) {
  useLayoutEffect(() => {
    if (!photoRef.current) return;

    const mainTextDiv = photoRef.current.querySelector(".photo-words");
    const mainText = mainTextDiv?.querySelector("span");
    const subTextDiv = mainTextDiv?.querySelector("div");

    if (!mainTextDiv || !mainText || !subTextDiv) return;

    const ctx = gsap.context(() => {
      gsap.set(mainText, { opacity: 1 });
      gsap.set(subTextDiv, { opacity: 0, maxHeight: 0 });

      if (!mainTextDiv || !mainText || !subTextDiv) return;

      ScrollTrigger.create({
        trigger: photoRef.current,
        start: "top -70%",
        onEnter: () => {
          mainTextDiv.classList.remove("h1", "text-wrap"),
            mainTextDiv.classList.add("h2", "text-nowrap");
          gsap.to(mainText, {
            opacity: "40%",
            duration: 0.1,
            ease: "cubic-bezier(0.65,0,0.35,1)",
          });
          gsap.to(subTextDiv, {
            opacity: 1,
            maxHeight: 500,
            duration: 0.1,
            ease: "cubic-bezier(0.65,0,0.35,1)",
          });
        },
        onLeaveBack: () => {
          gsap.to(mainText, {
            opacity: "100%",
            duration: 0.1,
            ease: "cubic-bezier(0.65,0,0.35,1)",
          });
          gsap.to(subTextDiv, {
            opacity: 0,
            maxHeight: 0,
            duration: 0.1,
            ease: "cubic-bezier(0.65,0,0.35,1)",
          });

          gsap.delayedCall(0.5, () => {
            mainTextDiv.classList.remove("h2", "text-nowrap"),
              mainTextDiv.classList.add("h1", "text-wrap");
          });
        },
      });
    }, photoRef);

    return () => ctx.revert();
  }, [screenWidth]);
}

/* 프로젝트 스케일 업 애니메이션 */
function scaleUpProjects({ projectRef, screenWidth }: ProjectsProps) {
  useLayoutEffect(() => {
    if (!projectRef.current) return;

    const projects = Array.from(
      projectRef.current.querySelectorAll(".project-item")
    );

    if (projects.length === 0) return;

    const ctx = gsap.context(() => {
      projects.forEach((project, i) => {
        gsap.set(project, { scale: 0.8 });

        const innerHeight = window.innerHeight;

        ScrollTrigger.create({
          trigger: projectRef.current,
          start:
            screenWidth >= 768
              ? `bottom+=${i * innerHeight} 130%`
              : `bottom+=${i * innerHeight} 180%`,
          onEnter: () => gsap.to(project, { scale: 1, duration: 0.3 }),
          onLeaveBack: () => gsap.to(project, { scale: 0.8, duration: 0.3 }),
          scrub: true,
        });
      });
    }, projectRef);

    return () => {
      ctx.revert();
    };
  }, [screenWidth]);
}

/* 프로세스 타이틀 좌우 이동 애니메이션 */
function moveProcessTitle({ processRef, screenWidth }: ProcessProps) {
  useLayoutEffect(() => {
    if (!processRef.current) return;

    const leftTitle = processRef.current.querySelector(".left-title");
    const rightTitle = processRef.current.querySelector(".right-title");

    const ctx = gsap.context(() => {
      gsap.set(leftTitle, { x: "0vw" });
      gsap.set(rightTitle, { x: "0vw" });

      ScrollTrigger.create({
        trigger: processRef.current,
        start: "top 60%",
        end: "center bottom",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(leftTitle, { x: `${-100 * progress}vw`, overwrite: "auto" });
          gsap.to(rightTitle, { x: `${100 * progress}vw`, overwrite: "auto" });
        },
      });
    }, processRef);

    return () => ctx.revert();
  }, [screenWidth]);
}

/* 프로세스 글자 흰색 체인지 애니메이션 */
function changeProcessTextColor({ processRef, screenWidth }: ProcessProps) {
  useLayoutEffect(() => {
    if (!processRef.current) return;

    const processText = processRef.current.querySelector(".process-item");

    const ctx = gsap.context(() => {
      gsap.set(processText, { backgroundSize: "0% 100%" });

      ScrollTrigger.create({
        trigger: processRef.current,
        start: "top center",
        end: "center 30%",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(processText, {
            backgroundSize: `${progress * 100}% 100%`,
          });
        },
      });
    }, processRef);

    return () => ctx.revert();
  }, [screenWidth]);
}

/* 컨택트 마퀴 애니메이션 */
function marqueeContactText({ contactRef, screenWidth }: ContactProps) {
  useEffect(() => {
    if (!contactRef.current) return;

    const marqueeText = contactRef.current.querySelectorAll(".marquee");

    const ctx = gsap.context(() => {
      let direction = 1;

      const tween = gsap.to(marqueeText, {
        xPercent: -100,
        ease: "linear",
        repeat: -1,
        duration: 40,
      });

      ScrollTrigger.create({
        trigger: marqueeText,
        start: "top bottom+=1000",
        end: "bottom top",
        onUpdate: (self) => {
          const newDirection = self.direction;
          if (newDirection !== direction) {
            direction = newDirection;
            tween.timeScale(direction);
          }
        },
      });
    }, contactRef);

    return () => ctx.revert();
  }, [screenWidth]);
}

export {
  upContents,
  zoomPhoto,
  viewPhotoWords,
  viewProjectWords,
  scaleUpProjects,
  moveProcessTitle,
  changeProcessTextColor,
  marqueeContactText,
};
