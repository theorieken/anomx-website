"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/components/language-switcher";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
    return <span aria-hidden="true" className="link-arrow">{diagonal ? "↗" : "→"}</span>;
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const element = ref.current;
        if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
        if (element.getBoundingClientRect().top > window.innerHeight) element.dataset.reveal = "pending";
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { element.dataset.reveal = "visible"; observer.disconnect(); }
        }, { threshold: 0.12 });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function Experience({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <div className={`experience ${className}`} id="top"><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></div>;
}

export function FinalInvitation() {
    const de = useLanguage() === "de";
    return <section className="invitation content-width"><Reveal>
        <p className="kicker">{de ? "DIE NÄCHSTE ÄRA" : "THE NEXT ERA"}</p>
        <h2>{de ? "Geben Sie Ihrem System" : "Give your system"}<br /><span className="gradient-text">{de ? "einen neuen Sinn." : "a new sense."}</span></h2>
        <p>{de ? "Entwickeln Sie mit uns die Zukunft autonomer Systeme." : "Build the future of autonomous systems with us."}</p>
        <Link className="pill pill-primary" href="/early-access">{de ? "Early Access anfragen" : "Request early access"}<Arrow /></Link>
    </Reveal></section>;
}

export function CopyCommand({ command, label }: { command: string; label?: string }) {
    const de = useLanguage() === "de";
    const [copied, setCopied] = useState(false);
    const [failed, setFailed] = useState(false);
    useEffect(() => {
        if (!copied) return;
        const timer = window.setTimeout(() => setCopied(false), 2000);
        return () => window.clearTimeout(timer);
    }, [copied]);
    return <div className="command-block">
        {label && <span className="command-label">{label}</span>}
        <div className="command-line"><pre><code>{command}</code></pre><button type="button" aria-label={de ? "Befehl kopieren" : "Copy command"} onClick={async () => {
            try { await navigator.clipboard.writeText(command); setCopied(true); setFailed(false); }
            catch { setFailed(true); }
        }}>{copied ? "✓" : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="3" /><path d="M15 5V4H4v11h1" /></svg>}</button></div>
        <span className={failed ? "copy-status" : "sr-only"} role="status">{copied ? (de ? "Kopiert" : "Copied") : failed ? (de ? "Bitte den Befehl auswählen und kopieren." : "Select the command and copy it manually.") : ""}</span>
    </div>;
}
