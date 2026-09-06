"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-switcher";
import { Arrow, Experience, FinalInvitation, Reveal } from "@/components/experience";
import { ArchitectureDiagram, architectureStages } from "@/components/architecture-diagram";

export function TechnologyPage() {
    const language = useLanguage();
    const de = language === "de";
    const copy = architectureStages[language];
    const [active, setActive] = useState(0);
    const [progress, setProgress] = useState(1);
    const [scrollMode, setScrollMode] = useState(false);
    const section = useRef<HTMLElement>(null);
    useEffect(() => {
        const element = section.current;
        if (!element) return;
        const media = window.matchMedia("(min-width: 1100px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)");
        let frame = 0;
        const update = () => {
            frame = 0;
            if (!media.matches) { setProgress(1); return; }
            const distance = element.offsetHeight - (window.innerHeight - 64);
            const next = Math.max(0, Math.min(1, (64-element.getBoundingClientRect().top) / Math.max(1,distance)));
            setProgress(next);
            setActive(Math.min(5, Math.floor(next * 6)));
        };
        const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
        const mode = () => { setScrollMode(media.matches); scroll(); };
        mode();
        media.addEventListener("change", mode);
        window.addEventListener("scroll", scroll, {passive:true});
        window.addEventListener("resize", scroll);
        return () => {media.removeEventListener("change",mode);window.removeEventListener("scroll",scroll);window.removeEventListener("resize",scroll);cancelAnimationFrame(frame);};
    }, []);
    const select = (index:number) => {
        setActive(index);
        if (scrollMode && section.current) {
            const element=section.current;
            const distance=element.offsetHeight-(window.innerHeight-64);
            window.scrollTo({top:window.scrollY+element.getBoundingClientRect().top-64+distance*((index+.45)/6),behavior:"smooth"});
        }
    };
    const key = (event:KeyboardEvent<HTMLButtonElement>,index:number) => {
        const next=event.key==="ArrowRight"?(index+1)%6:event.key==="ArrowLeft"?(index+5)%6:event.key==="Home"?0:event.key==="End"?5:-1;
        if(next>=0){event.preventDefault();document.getElementById(`architecture-tab-${next}`)?.focus({preventScroll:true});select(next);}
    };
    return <Experience className="technology-page">
        <section className="product-hero content-width"><p className="kicker">ANOMX TECHNOLOGY</p><h1>{de?<>Komplexität verbinden.<br/><span className="gradient-text">Intelligenz entfalten.</span></>:<>Connect complexity.<br/><span className="gradient-text">Compose intelligence.</span></>}</h1><p>{de?"Eine Plattform. Klar getrennte Aufgaben. Entdecken Sie, wie aus Datenquellen, Workern und Modellen ein zusammenhängendes System wird.":"One platform. Clearly defined responsibilities. Explore how data sources, workers, and models become one connected system."}</p><a href="#architecture" className="text-link">{de?"Die Architektur aufbauen":"Build the architecture"}<span aria-hidden="true">↓</span></a></section>
        <section id="architecture" ref={section} className="architecture-scroll" data-mode={scrollMode?"scroll":"manual"} aria-label={de?"Interaktive Architektur":"Interactive architecture"}>
            <div className="architecture-lock"><div className="architecture-layout">
                <div className="architecture-copy"><p className="kicker">LAYER BY LAYER <span>0{active+1} / 06</span></p><div id="architecture-panel" role="tabpanel" aria-labelledby={`architecture-tab-${active}`} tabIndex={0}><h2>{copy[active].title}</h2><p>{copy[active].body}</p><span className="architecture-detail">{copy[active].detail}</span></div><a className="architecture-skip text-link" href="#architecture-principles">{de?"Zur Zusammenfassung":"Skip to the overview"}<span aria-hidden="true">↓</span></a></div>
                <div className="architecture-visual"><div className="architecture-diagram-scroll" tabIndex={0} aria-label={de?"Architekturdiagramm; auf kleinen Bildschirmen horizontal scrollbar":"Architecture diagram; horizontally scrollable on small screens"}><ArchitectureDiagram progress={progress}/></div><div className="architecture-legend"><span><i/>{de?"Daten & Kontrolle":"Data & control"}</span><span><i/>{de?"Kommandos & Events":"Commands & events"}</span><span>{de?"Vereinfachte Referenzarchitektur":"Simplified reference architecture"}</span></div></div>
                <div className="architecture-tabs" role="tablist" aria-label={de?"Architekturschichten":"Architecture layers"}>{copy.map((step,i)=><button key={step.label} type="button" role="tab" id={`architecture-tab-${i}`} aria-controls="architecture-panel" aria-selected={i===active} tabIndex={i===active?0:-1} onClick={()=>select(i)} onKeyDown={event=>key(event,i)}><span>0{i+1}</span>{step.label}<i style={{transform:`scaleX(${scrollMode?Math.max(0,Math.min(1,progress*6-i)):i===active?1:0})`}}/></button>)}</div>
            </div></div>
        </section>
        <section className="product-section content-width" id="architecture-principles"><Reveal><p className="kicker">{de?"KLARE AUFGABEN. EIN SYSTEM.":"CLEAR RESPONSIBILITIES. ONE SYSTEM."}</p><h2>{de?<>Verteilt arbeiten.<br/><span className="muted">Zusammen verstehen.</span></>:<>Work independently.<br/><span className="muted">Understand together.</span></>}</h2></Reveal><div className="capability-row">{(de?[
            ["01","Daten gezielt erfassen.","DAQ-Worker abonnieren ausgewählte Streams oder lesen per RPC. Kanalbindungen, Abtastraten und Batches machen die Erfassung konfigurierbar."],
            ["02","Rechenleistung entkoppeln.","CPU- und GPU-Worker führen Analysejobs aus. Neue Ressourcen ergänzen die Worker-Schicht; spezialisierte Hardware wie TPUs bleibt ein Erweiterungspfad."],
            ["03","Kontext nachvollziehen.","Objekte, Job-Runs, Findings und Artefakte machen Ergebnisse prüfbar. Agenten arbeiten innerhalb ihres Tool-, Rechte- und Budgetrahmens."]
        ]:[
            ["01","Acquire deliberately.","DAQ workers subscribe to selected streams or read through RPC. Channel bindings, sampling rates and batching make acquisition configurable."],
            ["02","Decouple compute.","CPU and GPU workers execute analysis jobs. New resources extend the worker layer; specialized hardware such as TPUs remains an extension path."],
            ["03","Keep context inspectable.","Objects, job runs, findings and artifacts make results reviewable. Agents work within their tool permissions, scope and budgets."]
        ]).map(([n,title,body])=><Reveal key={n}><span className="small-index">{n}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</div><p className="architecture-note">{de?"Die Darstellung verdichtet die aktuelle Architektur. Externe Systeme und Hardware sind Integrationsbeispiele; die Verfügbarkeit hängt von der jeweiligen Installation ab.":"This diagram condenses the current architecture. External systems and hardware are integration examples; availability depends on the installation."}</p><Link href="/cases/european-xfel" className="text-link">{de?"Im Forschungskontext entdecken":"Explore it in a research setting"}<Arrow/></Link></section>
        <FinalInvitation/>
    </Experience>;
}
