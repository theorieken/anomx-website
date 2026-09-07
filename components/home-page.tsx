"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/language-switcher";
import { Arrow, CopyCommand, Experience, FinalInvitation, Reveal } from "@/components/experience";
import { HeroSignals } from "@/components/hero-signals";
import { ScrollCards } from "@/components/scroll-scenes";
import { BackgroundStory, ScienceSection } from "@/components/intelligence-demo";

export function HomePage() {
    const de = useLanguage() === "de";
    const hero = useRef<HTMLElement>(null);
    useEffect(() => {
        const element = hero.current;
        const lock = element?.querySelector<HTMLElement>(".hero-lock");
        if (!element || !lock) return;
        const media = window.matchMedia("(min-height: 600px) and (prefers-reduced-motion: no-preference)");
        let frame = 0;
        const update = () => {
            frame = 0;
            const distance = element.offsetHeight - lock.offsetHeight;
            const progress = media.matches ? Math.min(1, Math.max(0, -element.getBoundingClientRect().top / Math.max(1, distance))) : 1;
            element.style.setProperty("--hero-progress", String(progress));
            element.dataset.signalStage = progress < .48 ? "0" : progress < .8 ? "1" : "2";
        };
        const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
        const mode = () => { element.dataset.motion = media.matches ? "scroll" : "still"; update(); };
        media.addEventListener("change", mode);
        window.addEventListener("scroll", scroll, { passive: true });
        window.addEventListener("resize", scroll);
        mode();
        return () => { media.removeEventListener("change", mode); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); cancelAnimationFrame(frame); };
    }, []);
    return <Experience>
        <section className="cinematic-hero" ref={hero} data-motion="still" data-signal-stage="2">
            <div className="hero-lock">
            <div className="hero-heading"><p className="kicker">ANOMX · SYSTEM INTELLIGENCE</p><h1>{de ? <>Ihr System.<br /><span className="gradient-text">Einen Schritt voraus.</span></> : <>Your system.<br /><span className="gradient-text">One step ahead.</span></>}</h1><p>{de ? "Die KI-Schicht für eine autonome Welt." : "The AI layer for an autonomous world."}</p><div className="hero-links"><Link className="text-link" href="#background-agent">{de ? "Intelligenz entdecken" : "Explore the intelligence"}<span aria-hidden="true">↓</span></Link><Link className="text-link" href="/platform">{de ? "Die Plattform" : "Meet the platform"}<Arrow /></Link></div></div>
            <HeroSignals />
            <div className="hero-bottom content-width"><p>{de ? <>Erkennt Veränderungen. Versteht Zusammenhänge.<br />Bringt Ihre Systeme ins Handeln.</> : <>Detect change. Understand why.<br />Give your systems the intelligence to act.</>}</p><span className="scroll-hint" aria-hidden="true">{de ? "WEITER ENTDECKEN" : "SCROLL TO DISCOVER"}<span>↓</span></span></div>
            </div>
        </section>
        <section className="manifesto content-width"><Reveal><p className="kicker">{de ? "VON REAKTIV ZU AUTONOM" : "FROM REACTIVE TO AUTONOMOUS"}</p><h2>{de ? <>Maschinen erzeugen Daten.<br /><span className="muted">Anomx macht daraus</span><br />Verständnis.</> : <>Machines generate data.<br /><span className="muted">Anomx turns it into</span><br />understanding.</>}</h2><p className="section-lead">{de ? "Ein Hintergrundagent, der hinsieht, nachdenkt und vorausplant. Verbunden mit Ihren Daten, Modellen und Maschinen. Damit aus komplexen Systemen intelligente Systeme werden." : "A background agent that observes, reasons, and looks ahead. Connected to your data, models, and machines. Turning complex systems into intelligent ones."}</p></Reveal></section>
        <BackgroundStory />
        <ScrollCards id="autonomy" className="autonomy-scroll" intro={<><p className="kicker">{de ? "AUTONOMIE MIT KONTEXT" : "AUTONOMY WITH CONTEXT"}</p><h2>{de ? <>Eine Intelligenz.<br /><span className="muted">Ihr gesamtes System.</span></> : <>One intelligence.<br /><span className="muted">Your entire system.</span></>}</h2></>} items={(de ? [
            ["01", "Verbunden.", "Datenströme, Dateien, Datenbanken und Kontrollsysteme in einem gemeinsamen operativen Kontext."],
            ["02", "Vorausschauend.", "Anomalien erkennen und Veränderungen untersuchen, bevor sie zu größeren Problemen werden."],
            ["03", "Handlungsfähig.", "Aus Belegen werden Empfehlungen und erlaubte Plattformänderungen. Sie bestimmen den Rahmen."]
        ] : [
            ["01", "Connected.", "Data streams, files, databases, and control systems brought into one operational context."],
            ["02", "Anticipatory.", "Detect anomalies and investigate emerging changes before they become bigger problems."],
            ["03", "Actionable.", "Turn evidence into recommendations and permitted platform changes. You define the boundaries."]
        ])} outro={<Link href="/platform" className="text-link">{de ? "Die Plattform kennenlernen" : "Explore the platform"}<Arrow /></Link>}/>
        <ScienceSection />
        <section className="cli-teaser content-width"><Reveal className="cli-teaser-inner"><div><p className="kicker">ANOMX CLI AGENT</p><h2>{de ? <>Große Intelligenz.<br /><span className="muted">Direkt im Terminal.</span></> : <>Big intelligence.<br /><span className="muted">Right in your terminal.</span></>}</h2><p>{de ? "Ihr KI-Partner für Code, Daten und Anomalien. Dort, wo Sie arbeiten. Verbunden mit der Plattform, wenn Sie sie brauchen." : "Your AI partner for code, data, and anomalies. Right where you work. Connected to the platform when you need it."}</p><Link className="text-link" href="/agent">{de ? "Agent entdecken" : "Meet the agent"}<Arrow /></Link></div><div className="install-card"><span className="terminal-mark" aria-hidden="true">&gt;_</span><CopyCommand command="pip install anomx" /><CopyCommand command="anomx" /><span className="install-meta">Python 3.11+ · Open source</span></div></Reveal></section>
        <FinalInvitation />
    </Experience>;
}
