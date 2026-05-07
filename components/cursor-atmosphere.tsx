"use client";

import { useEffect } from "react";

export function CursorAtmosphere() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      root.style.setProperty("--cursor-opacity", "0");
      return;
    }

    let animationFrame = 0;
    let currentX = window.innerWidth * 0.5;
    let currentY = window.innerHeight * 0.24;
    let targetX = currentX;
    let targetY = currentY;

    const update = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      root.style.setProperty("--cursor-x", `${currentX}px`);
      root.style.setProperty("--cursor-y", `${currentY}px`);

      animationFrame = window.requestAnimationFrame(update);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      root.style.setProperty("--cursor-opacity", "1");
    };

    const handlePointerLeave = () => {
      root.style.setProperty("--cursor-opacity", "0");
    };

    root.style.setProperty("--cursor-x", `${currentX}px`);
    root.style.setProperty("--cursor-y", `${currentY}px`);
    root.style.setProperty("--cursor-opacity", "0");

    animationFrame = window.requestAnimationFrame(update);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true
    });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      root.style.removeProperty("--cursor-x");
      root.style.removeProperty("--cursor-y");
      root.style.removeProperty("--cursor-opacity");
    };
  }, []);

  return (
    <div aria-hidden="true" className="cursor-atmosphere">
      <div className="cursor-atmosphere-orb" />
      <div className="cursor-atmosphere-accent" />
      <div className="cursor-atmosphere-structure" />
    </div>
  );
}
