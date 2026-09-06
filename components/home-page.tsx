"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/language-switcher";
import { Arrow, CopyCommand, Experience, FinalInvitation, Reveal } from "@/components/experience";
import { BackgroundStory, ScienceSection } from "@/components/intelligence-demo";

export function HomePage() {
    const de = useLanguage() === "de";
    const hero = useRef<HTMLElement>(null);
    useEffect(() => {
        const element = hero.current;
        if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let frame = 0;
        const update = () => { frame = 0; const progress = Math.min(1, Math.max(0, -element.getBoundingClientRect().top / element.offsetHeight)); element.style.setProperty("--hero-progress", String(progress)); };
        const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
        window.addEventListener("scroll", scroll, { passive: true });
        return () => { window.removeEventListener("scroll", scroll); cancelAnimationFrame(frame); };
    }, []);
    return <Experience>
        <section className="cinematic-hero" ref={hero}>
            <div className="hero-heading"><p className="kicker">ANOMX · SYSTEM INTELLIGENCE</p><h1>{de ? <>Ihr System.<br /><span className="gradient-text">Einen Schritt voraus.</span></> : <>Your system.<br /><span className="gradient-text">One step ahead.</span></>}</h1><p>{de ? "Die KI-Schicht für eine autonome Welt." : "The AI layer for an autonomous world."}</p><div className="hero-links"><Link className="text-link" href="#background-agent">{de ? "Intelligenz entdecken" : "Explore the intelligence"}<span aria-hidden="true">↓</span></Link><Link className="text-link" href="/platform">{de ? "Die Plattform" : "Meet the platform"}<Arrow /></Link></div></div>
            <div className="hero-art"><Image src="/media/intelligence-sculpture.webp" alt="" width={1920} height={1080} priority sizes="100vw" /></div>
            <div className="hero-bottom content-width"><p>{de ? <>Erkennt Veränderungen. Versteht Zusammenhänge.<br />Bringt Ihre Systeme ins Handeln.</> : <>Detect change. Understand why.<br />Give your systems the intelligence to act.</>}</p><span className="scroll-hint" aria-hidden="true">{de ? "WEITER ENTDECKEN" : "SCROLL TO DISCOVER"}<span>↓</span></span></div>
        </section>
        <section className="manifesto content-width"><Reveal><p className="kicker">{de ? "VON REAKTIV ZU AUTONOM" : "FROM REACTIVE TO AUTONOMOUS"}</p><h2>{de ? <>Maschinen erzeugen Daten.<br /><span className="muted">Anomx macht daraus</span><br />Verständnis.</> : <>Machines generate data.<br /><span className="muted">Anomx turns it into</span><br />understanding.</>}</h2><p className="section-lead">{de ? "Ein Hintergrundagent, der hinsieht, nachdenkt und vorausplant. Verbunden mit Ihren Daten, Modellen und Maschinen. Damit aus komplexen Systemen intelligente Systeme werden." : "A background agent that observes, reasons, and looks ahead. Connected to your data, models, and machines. Turning complex systems into intelligent ones."}</p></Reveal></section>
        <BackgroundStory />
        <section className="autonomy-section content-width"><Reveal><p className="kicker">{de ? "AUTONOMIE MIT KONTEXT" : "AUTONOMY WITH CONTEXT"}</p><h2>{de ? <>Eine Intelligenz.<br /><span className="muted">Ihr gesamtes System.</span></> : <>One intelligence.<br /><span className="muted">Your entire system.</span></>}</h2></Reveal><div className="capability-row">{(de ? [
            ["01", "Verbunden.", "Datenströme, Dateien, Datenbanken und Kontrollsysteme in einem gemeinsamen operativen Kontext."],
            ["02", "Vorausschauend.", "Anomalien erkennen und Veränderungen untersuchen, bevor sie zu größeren Problemen werden."],
            ["03", "Handlungsfähig.", "Aus Belegen werden Empfehlungen und erlaubte Plattformänderungen. Sie bestimmen den Rahmen."]
        ] : [
            ["01", "Connected.", "Data streams, files, databases, and control systems brought into one operational context."],
            ["02", "Anticipatory.", "Detect anomalies and investigate emerging changes before they become bigger problems."],
            ["03", "Actionable.", "Turn evidence into recommendations and permitted platform changes. You define the boundaries."]
        ]).map(([number, title, body]) => <Reveal key={number}><span className="small-index">{number}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</div><Link href="/platform" className="text-link">{de ? "Die Plattform kennenlernen" : "Explore the platform"}<Arrow /></Link></section>
        <ScienceSection />
        <section className="cli-teaser content-width"><Reveal className="cli-teaser-inner"><div><p className="kicker">ANOMX CLI AGENT</p><h2>{de ? <>Große Intelligenz.<br /><span className="muted">Direkt im Terminal.</span></> : <>Big intelligence.<br /><span className="muted">Right in your terminal.</span></>}</h2><p>{de ? "Ihr KI-Partner für Code, Daten und Anomalien. Dort, wo Sie arbeiten. Verbunden mit der Plattform, wenn Sie sie brauchen." : "Your AI partner for code, data, and anomalies. Right where you work. Connected to the platform when you need it."}</p><Link className="text-link" href="/agent">{de ? "CLI Agent entdecken" : "Meet the CLI agent"}<Arrow /></Link></div><div className="install-card"><span className="terminal-mark" aria-hidden="true">&gt;_</span><CopyCommand command="pip install anomx" /><CopyCommand command="anomx" /><span className="install-meta">Python 3.11+ · Open source</span></div></Reveal></section>
        <FinalInvitation />
    </Experience>;
}
