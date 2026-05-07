"use client";

import { useRef } from "react";
import { CardVisual } from "@/components/card-visual";
import type { Language, SliderCard } from "@/lib/home-content";

type SignalToActionSliderProps = {
  cards: SliderCard[];
  language: Language;
};

export function SignalToActionSlider({
  cards,
  language
}: SignalToActionSliderProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollByDirection = (direction: -1 | 1) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    viewport.scrollBy({
      behavior: "smooth",
      left: direction * Math.max(viewport.clientWidth * 0.72, 320)
    });
  };

  return (
    <div className="slider-shell">
      <div className="slider-controls">
        <button
          aria-label="Scroll cards left"
          className="slider-control"
          onClick={() => scrollByDirection(-1)}
          type="button"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          aria-label="Scroll cards right"
          className="slider-control"
          onClick={() => scrollByDirection(1)}
          type="button"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="slider-bleed">
        <div className="slider-viewport" ref={viewportRef}>
          {cards.map((card) => (
            <article className="slider-card" key={card.title[language]}>
              <div className="slider-card-copy">
                <h3>{card.title[language]}</h3>
                <p>{card.body[language]}</p>
              </div>
              <div className="slider-card-media">
                <CardVisual variant={card.visual} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
