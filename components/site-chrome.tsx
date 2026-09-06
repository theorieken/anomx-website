"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LanguageSwitcher, useLanguage } from "@/components/language-switcher";
import { SiteLogo } from "@/components/site-logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
    const de = useLanguage() === "de";
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const menuButton = useRef<HTMLButtonElement>(null);
    const links = [["/platform", de ? "Plattform" : "Platform"], ["/agent", "CLI Agent"], ["/documentation", "Docs"]];
    useEffect(() => {
        if (!open) return;
        const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); } };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, [open]);
    return <header className="masthead">
        <a className="skip-link" href="#main-content">{de ? "Zum Inhalt" : "Skip to content"}</a>
        <div className="masthead-inner">
            <Link href="/" aria-label="Anomx home" className="brand-link"><SiteLogo /></Link>
            <nav aria-label={de ? "Hauptnavigation" : "Main navigation"} className="desktop-nav">{links.map(([href, name]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{name}</Link>)}</nav>
            <div className="masthead-actions"><Link href="/early-access" className="pill pill-small pill-primary">{de ? "Early Access" : "Get early access"}</Link>
                <button ref={menuButton} type="button" className="menu-toggle" aria-label={open ? (de ? "Menü schließen" : "Close menu") : (de ? "Menü öffnen" : "Open menu")} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}><span /><span /></button>
            </div>
        </div>
        <nav id="mobile-nav" className="mobile-nav" aria-label={de ? "Mobile Navigation" : "Mobile navigation"} hidden={!open}>{links.map(([href, name]) => <Link href={href} key={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{name}<span aria-hidden="true">↗</span></Link>)}<a href="mailto:hello@anomx.io">{de ? "Kontakt" : "Contact"}<span aria-hidden="true">↗</span></a></nav>
    </header>;
}

export function SiteFooter() {
    const de = useLanguage() === "de";
    return <footer className="minimal-footer"><div className="content-width">
        <div className="footer-top"><div><Link href="/" aria-label="Anomx home"><SiteLogo kind="footer" /></Link><p>{de ? "Die Plattform für System Intelligence." : "The Platform for System Intelligence."}</p></div><a className="footer-contact" href="mailto:hello@anomx.io">{de ? "Lassen Sie uns sprechen." : "Let’s talk."}<span aria-hidden="true"> ↗</span></a></div>
        <div className="footer-links"><nav aria-label="Product"><Link href="/platform">{de ? "Plattform" : "Platform"}</Link><Link href="/agent">CLI Agent</Link><Link href="/documentation">Docs</Link><Link href="/early-access">Early Access</Link><Link href="/coming-soon">{de ? "Anmelden" : "Platform login"}</Link></nav><div className="footer-preferences"><ThemeToggle lightLabel={de ? "Hell" : "Light"} darkLabel={de ? "Dunkel" : "Dark"} /><LanguageSwitcher englishLabel="EN" germanLabel="DE" label={de ? "Sprache" : "Language"} showLabel={false} /></div></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Anomx</span><nav aria-label="Legal"><Link href="/impressum">{de ? "Impressum" : "Legal notice"}</Link><Link href="/datenschutzerklaerung">{de ? "Datenschutz" : "Privacy"}</Link><Link href="/nutzungsbedingungen">{de ? "Nutzungsbedingungen" : "Terms"}</Link></nav><span>{de ? "Entwickelt in Hamburg." : "Built in Hamburg."}</span></div>
    </div></footer>;
}
