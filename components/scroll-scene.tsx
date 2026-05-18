"use client";

import type { ReactNode } from "react";
import { useEffect, useEffectEvent, useRef } from "react";

type ScrollSceneProps = {
  children: ReactNode;
  className?: string;
  motionProfile?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ScrollScene({
  children,
  className,
  motionProfile = "flow"
}: ScrollSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);

  const updateProgress = useEffectEvent(() => {
    const scene = sceneRef.current;

    if (!scene) {
      return;
    }

    const bounds = scene.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const distanceFromCenter = bounds.top + bounds.height / 2 - viewportHeight / 2;
    const travel = viewportHeight / 2 + bounds.height / 2;
    const progress = clamp(distanceFromCenter / travel, -1, 1);

    scene.style.setProperty("--scroll-progress", progress.toFixed(4));
    scene.style.setProperty("--scroll-progress-inverse", (-progress).toFixed(4));
    scene.style.setProperty("--scroll-progress-soft", (progress * 0.58).toFixed(4));
  });

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      scene.style.setProperty("--scroll-progress", "0");
      scene.style.setProperty("--scroll-progress-inverse", "0");
      scene.style.setProperty("--scroll-progress-soft", "0");
      return;
    }

    let frame = 0;
    let listening = false;

    const scheduleUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateProgress();
      });
    };

    const startListening = () => {
      if (listening) {
        return;
      }

      listening = true;
      window.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", scheduleUpdate);
      scheduleUpdate();
    };

    const stopListening = () => {
      if (!listening) {
        return;
      }

      listening = false;
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);

        if (isVisible) {
          startListening();
          return;
        }

        scheduleUpdate();
        stopListening();
      },
      {
        rootMargin: "12% 0px 12% 0px"
      }
    );

    observer.observe(scene);
    scheduleUpdate();

    return () => {
      stopListening();
      observer.disconnect();

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div
      className={["scroll-scene", className].filter(Boolean).join(" ")}
      data-motion-profile={motionProfile}
      ref={sceneRef}
    >
      {children}
    </div>
  );
}
