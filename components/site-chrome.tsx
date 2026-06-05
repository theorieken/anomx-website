"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitcher, useLanguage } from "@/components/language-switcher";
import { SiteLogo } from "@/components/site-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { homeCopy } from "@/lib/home-content";

type NavItem = {
  href: string;
  label: string;
  match: string[];
};

export function SiteHeader() {
  const language = useLanguage();
  const pathname = usePathname();
  const copy = homeCopy[language];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNavIndex, setActiveNavIndex] = useState<number | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);

  const navItems: NavItem[] = [
    { href: "/platform", label: copy.nav.platform, match: ["/platform"] },
    { href: "/agent", label: copy.nav.agent, match: ["/agent"] },
    { href: "/documentation", label: copy.nav.documentation, match: ["/documentation"] },
    {
      href: "/early-access",
      label: copy.nav.earlyAccess,
      match: ["/early-access", "/join-waitlist"]
    }
  ];

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= 4);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActiveItem = (item: NavItem) =>
    item.match.some((value) => pathname === value || pathname.startsWith(`${value}/`));

  return (
    <header
      className={`site-header${isMenuOpen ? " site-header-menu-open" : ""}${isAtTop ? " site-header-at-top" : ""}`}
      style={
        isAtTop && !isMenuOpen
          ? undefined
          : {
              WebkitBackdropFilter: "blur(24px)",
              backdropFilter: "blur(24px)"
            }
      }
    >
      <div className="site-header-inner">
        <div className="site-header-start">
          <Link aria-label="Anomx home" className="brand-link" href="/">
            <SiteLogo />
          </Link>

          <nav
            aria-label="Primary"
            className="site-nav"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setActiveNavIndex(null);
              }
            }}
            onMouseLeave={() => setActiveNavIndex(null)}
          >
            {navItems.map((item, index) => (
              <Link
                data-active={isActiveItem(item) ? "true" : undefined}
                data-dimmed={activeNavIndex !== null && activeNavIndex !== index ? "true" : undefined}
                href={item.href}
                key={item.href}
                onFocus={() => setActiveNavIndex(index)}
                onMouseEnter={() => setActiveNavIndex(index)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="header-actions">
          <Link className="button button-text" href="/coming-soon">
            {copy.actions.logIn}
          </Link>
          <Link className="button button-primary" href="/early-access">
            {copy.actions.joinWaitlist}
          </Link>
          <a className="button button-secondary" href="mailto:hello@anomx.io">
            {copy.actions.talkToUs}
          </a>
        </div>

        <div className="mobile-header-actions">
          <Link className="button button-text" href="/coming-soon">
            {copy.actions.logIn}
          </Link>
          <button
            aria-expanded={isMenuOpen}
            className="button button-secondary"
            onClick={() => setIsMenuOpen(true)}
            type="button"
          >
            {copy.actions.menu}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div
          aria-label="Mobile navigation"
          aria-modal="true"
          className="mobile-menu-overlay"
          role="dialog"
        >
          <div className="mobile-menu-panel">
            <div className="mobile-menu-top">
              <Link className="brand-link" href="/" onClick={() => setIsMenuOpen(false)}>
                <SiteLogo />
              </Link>
              <button
                className="button button-secondary"
                onClick={() => setIsMenuOpen(false)}
                type="button"
              >
                Close
              </button>
            </div>

            <nav className="mobile-menu-nav" aria-label="Mobile primary">
              {navItems.map((item) => (
                <Link href={item.href} key={item.href} onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mobile-menu-bottom">
              <Link href="/impressum" onClick={() => setIsMenuOpen(false)}>
                Impressum
              </Link>
              <Link href="/datenschutzerklaerung" onClick={() => setIsMenuOpen(false)}>
                Datenschutzerklärung
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  const language = useLanguage();
  const copy = homeCopy[language];

  return (
    <footer className="site-footer">
      <div className="footer-brand-block">
        <Link aria-label="Anomx home" className="brand-link" href="/">
          <SiteLogo kind="footer" />
        </Link>
        <p>{copy.footer.description}</p>
        <p className="footer-made-at">{copy.footer.madeAt}</p>
      </div>

      <div className="footer-columns">
        <div className="footer-column">
          <span>{copy.footer.product}</span>
          <Link href="/platform">{copy.nav.platform}</Link>
          <Link href="/agent">{copy.nav.agent}</Link>
          <Link href="/documentation">{copy.nav.documentation}</Link>
          <Link href="/early-access">{copy.nav.earlyAccess}</Link>
        </div>
        <div className="footer-column">
          <span>{copy.footer.company}</span>
          <Link href="/">{copy.footer.about}</Link>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutzerklaerung">Datenschutzerklärung</Link>
          <Link href="/nutzungsbedingungen">Nutzungsbedingungen</Link>
        </div>
        <div className="footer-column">
          <span>{copy.footer.contact}</span>
          <a href="https://anomx.io">anomx.io</a>
          <a href="mailto:hello@anomx.io">hello@anomx.io</a>
        </div>
        <div className="footer-column footer-column-configuration">
          <span>{copy.footer.configuration}</span>
          <ThemeToggle
            darkLabel={copy.footer.dark}
            label={copy.footer.theme}
            lightLabel={copy.footer.light}
          />
          <LanguageSwitcher
            englishLabel={copy.footer.english}
            germanLabel={copy.footer.german}
            label={copy.footer.language}
            showLabel={false}
          />
        </div>
      </div>

      <div className="footer-legal">{copy.footer.copyright}</div>
    </footer>
  );
}
