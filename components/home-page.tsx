"use client";

import Image from "next/image";
import { CardVisual } from "@/components/card-visual";
import { CursorAtmosphere } from "@/components/cursor-atmosphere";
import { useLanguage } from "@/components/language-switcher";
import { SignalToActionSlider } from "@/components/signal-to-action-slider";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WaitlistForm } from "@/components/waitlist-form";
import type { GridCard, Language, LocalizedText } from "@/lib/home-content";
import {
  anomalyIntelligenceCards,
  complexSystemsCards,
  earlyPreviewCards,
  homeCopy,
  platformRows,
  sliderCards,
  useCases,
  whyNowCards
} from "@/lib/home-content";

function localized(value: LocalizedText, language: Language) {
  return value[language] ?? value.en;
}

function BentoGrid({
  cards,
  className,
  language
}: {
  cards: GridCard[];
  className: string;
  language: Language;
}) {
  return (
    <div className={`bento-grid ${className}`}>
      {cards.map((card) => (
        <article className="bento-card" data-size={card.size} key={localized(card.title, language)}>
          <div className="bento-card-copy">
            <h3>{localized(card.title, language)}</h3>
            <p>{localized(card.body, language)}</p>
          </div>
          <div className="bento-card-media">
            <CardVisual variant={card.visual} />
          </div>
        </article>
      ))}
    </div>
  );
}

export function HomePage() {
  const language = useLanguage();
  const copy = homeCopy[language];

  return (
    <main className="page-shell" id="top">
      <CursorAtmosphere />

      <SiteHeader />

      <section className="section hero-section">
        <div className="hero-shell">
          <h1>{copy.hero.title}</h1>
          <p className="hero-subline">{copy.hero.subtitle}</p>

          <div className="hero-actions">
            <a className="button button-primary" href="/join-waitlist">
              {copy.actions.joinWaitlist}
            </a>
            <a className="button button-secondary" href="mailto:hello@anomx.io">
              {copy.actions.talkToUs}
            </a>
          </div>
        </div>

        <div className="media-preview-section" id="product">
          <div className="media-preview-shell">
            <video
              autoPlay
              className="product-video product-video-light"
              loop
              muted
              playsInline
              poster="/images/auth-bg.webp"
              preload="metadata"
            >
              <source src="/video/anomx-light-hd.mp4" type="video/mp4" />
            </video>
            <video
              autoPlay
              className="product-video product-video-dark"
              loop
              muted
              playsInline
              poster="/images/auth-bg.webp"
              preload="metadata"
            >
              <source src="/video/anomix-dark-hd.mp4" type="video/mp4" />
            </video>
            <div className="media-preview-gradient" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="section slider-section">
        <div className="section-heading section-heading-left">
          <h2>
            {copy.sections.signal.titlePrimary}
            <span className="heading-secondary">
              {copy.sections.signal.titleSecondary}
            </span>
          </h2>
        </div>

        <SignalToActionSlider cards={sliderCards} language={language} />
      </section>

      <section className="section complex-section" id="platform">
        <div className="section-heading section-heading-center">
          <h2>{copy.sections.complex.title}</h2>
        </div>

        <BentoGrid cards={complexSystemsCards} className="complex-grid" language={language} />
      </section>

      <section className="section intelligence-section">
        <div className="section-heading section-heading-left">
          <h2>
            {copy.sections.intelligence.titlePrimary}
            <span className="heading-secondary">
              {copy.sections.intelligence.titleSecondary}
            </span>
          </h2>
        </div>

        <BentoGrid cards={anomalyIntelligenceCards} className="anomaly-grid" language={language} />
      </section>

      <section className="platform-dark-band">
        <div className="platform-dark-inner">
          <div className="platform-dark-copy">
            <h2>
              {copy.sections.platform.titlePrimary}
              <span className="heading-secondary">
                {copy.sections.platform.titleSecondary}
              </span>
            </h2>

            <ul className="platform-list">
              {platformRows.map((row) => (
                <li className="platform-list-item" key={localized(row.label, language)}>
                  <span>{localized(row.label, language)}</span>
                  <p>{localized(row.body, language)}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="platform-dark-media">
            <Image
              alt=""
              className="platform-architecture"
              height={520}
              loading="eager"
              sizes="(max-width: 1120px) 100vw, 48vw"
              src="/media/intelligence-layer-architecture.svg"
              unoptimized
              width={720}
            />
          </div>
        </div>
      </section>

      <section className="section validation-section">
        <div className="section-heading section-heading-center">
          <h2>{copy.sections.validation.title}</h2>
        </div>

        <div className="simple-card-grid">
          {earlyPreviewCards.map((card) => (
            <article className="simple-card" key={localized(card.title, language)}>
              <h3>{localized(card.title, language)}</h3>
              <p>{localized(card.body, language)}</p>
              <div className="simple-card-visual" aria-hidden="true">
                <CardVisual variant={card.visual} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section use-cases-section" id="use-cases">
        <div className="section-heading section-heading-left">
          <h2>
            {copy.sections.useCases.titlePrimary}
            <span className="heading-secondary">
              {copy.sections.useCases.titleSecondary}
            </span>
          </h2>
        </div>

        <div className="use-case-grid">
          {useCases.map((useCase) => (
            <article className="use-case-card" key={localized(useCase.title, language)}>
              <div className="use-case-copy">
                <h3>{localized(useCase.title, language)}</h3>
                <p>{localized(useCase.body, language)}</p>
              </div>
              <div className="use-case-media">
                <CardVisual variant={useCase.visual} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section why-now-section">
        <div className="section-heading section-heading-center">
          <h2>{copy.sections.whyNow.title}</h2>
        </div>

        <div className="simple-card-grid">
          {whyNowCards.map((card) => (
            <article className="simple-card simple-card-tight" key={localized(card.title, language)}>
              <h3>{localized(card.title, language)}</h3>
              <p>{localized(card.body, language)}</p>
              <div className="simple-card-marker" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="section final-cta-section" id="early-access">
        <div className="final-cta-shell">
          <div className="section-heading section-heading-center">
            <h2>{copy.sections.earlyAccess.title}</h2>
          </div>

          <div className="waitlist-panel" id="waitlist-form">
            <WaitlistForm buttonLabel={copy.waitlist.buttonLabel} copy={copy.waitlist} />
          </div>
        </div>

        <SiteFooter />
      </section>
    </main>
  );
}
