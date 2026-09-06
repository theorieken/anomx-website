"use client";

import { useId, type ReactNode } from "react";
import { useLanguage } from "@/components/language-switcher";

export const architectureStages = {
    en: [
        { label: "Your world", title: "Start with what exists.", body: "Control systems, files, external compute, and data sources. Anomx is an intelligence layer above the infrastructure you already operate.", detail: "DOOCS · Filesystems · Databases · Compute" },
        { label: "Connect", title: "Many interfaces. One context.", body: "Connectors bridge external systems and the platform. Discover available properties and metadata, then bind the channels and resources a workflow actually needs.", detail: "Discovery · Metadata · Channel bindings" },
        { label: "Execute", title: "Bring work to the right worker.", body: "DAQ workers acquire data. CPU and GPU workers execute analysis. Agent runtimes investigate and use tools. These roles scale independently of the web application.", detail: "DOOCS / ZeroMQ · CPU / GPU · Agent runtime" },
        { label: "Remember", title: "Every kind of data. In its place.", body: "PostgreSQL holds system context. TimescaleDB stores time-series samples. MinIO holds files and model artifacts. Redis supports caching and task queues.", detail: "Relational context · Time series · Artifacts · Cache" },
        { label: "Orchestrate", title: "Coordinate the whole system.", body: "Django orchestrates objects, access and workflows. Celery executes background jobs through Redis-backed queues. NATS with JetStream carries commands and events to runtime services.", detail: "Django / DRF · Celery · NATS + JetStream" },
        { label: "Understand", title: "Put intelligence in human hands.", body: "The platform brings data, findings, agents and system state into one workspace. HTTP and WebSockets connect the interface to the control plane. People set intent, inspect evidence and decide what comes next.", detail: "Next.js · HTTP / WebSockets · People in control" }
    ],
    de: [
        { label: "Ihre Welt", title: "Beginnt bei dem, was da ist.", body: "Kontrollsysteme, Dateien, externe Rechenleistung und Datenquellen. Anomx ergänzt die Infrastruktur, die Sie bereits betreiben, um eine gemeinsame Intelligenzschicht.", detail: "DOOCS · Dateisysteme · Datenbanken · Compute" },
        { label: "Verbinden", title: "Viele Schnittstellen. Ein Kontext.", body: "Konnektoren verbinden externe Systeme mit der Plattform. Verfügbare Properties und Metadaten entdecken, dann die Kanäle und Ressourcen anbinden, die ein Workflow wirklich benötigt.", detail: "Discovery · Metadaten · Kanalbindungen" },
        { label: "Ausführen", title: "Die Arbeit zum richtigen Worker.", body: "DAQ-Worker erfassen Daten. CPU- und GPU-Worker führen Analysen aus. Agent-Runtimes untersuchen Systeme mit spezialisierten Werkzeugen. Diese Rollen skalieren unabhängig von der Webanwendung.", detail: "DOOCS / ZeroMQ · CPU / GPU · Agent-Runtime" },
        { label: "Speichern", title: "Jede Art von Daten. Am richtigen Ort.", body: "PostgreSQL hält den Systemkontext. TimescaleDB speichert Zeitreihen. MinIO hält Dateien und Modellartefakte. Redis unterstützt Caching und Aufgabenwarteschlangen.", detail: "Kontext · Zeitreihen · Artefakte · Cache" },
        { label: "Koordinieren", title: "Das ganze System orchestrieren.", body: "Django orchestriert Objekte, Zugriffe und Workflows. Celery führt Hintergrundjobs über Redis-Warteschlangen aus. NATS mit JetStream überträgt Kommandos und Ereignisse an Runtime-Services.", detail: "Django / DRF · Celery · NATS + JetStream" },
        { label: "Verstehen", title: "Intelligenz in den Händen von Menschen.", body: "Die Plattform verbindet Daten, Findings, Agenten und Systemzustand in einem gemeinsamen Arbeitsraum. HTTP und WebSockets verbinden Oberfläche und Steuerung. Menschen geben Ziele vor, prüfen Belege und entscheiden über nächste Schritte.", detail: "Next.js · HTTP / WebSockets · Menschen entscheiden" }
    ]
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));
export function ArchitectureDiagram({ progress = 1 }: { progress?: number }) {
    const de = useLanguage() === "de";
    const id = useId().replaceAll(":", "");
    const reveal = (stage: number) => clamp(progress * 5.5 - stage + 1);
    const group = (stage: number, children: ReactNode) => <g className="arch-layer" data-layer={stage} style={{opacity: .08 + reveal(stage) * .92, transform: `translateY(${(1-reveal(stage))*12}px)`}}>{children}</g>;
    const box = (x:number,y:number,w:number,h:number,title:string,detail?:string,accent=false) => <g><rect x={x} y={y} width={w} height={h} rx="12" className={accent?"arch-box arch-accent-box":"arch-box"}/><text x={x+w/2} y={y+h/2+(detail?-4:5)} textAnchor="middle" className="arch-label">{title}</text>{detail&&<text x={x+w/2} y={y+h/2+17} textAnchor="middle" className="arch-detail">{detail}</text>}</g>;
    const line = (d:string,stage:number,bus=false) => <path d={d} className={`arch-line ${bus?"arch-bus":""}`} pathLength="1" strokeDasharray="1" strokeDashoffset={1-reveal(stage)} style={{opacity:reveal(stage)}} markerEnd={reveal(stage)>.98?`url(#${id}-${bus?'orange':'arrow'})`:undefined}/>;
    return <svg className="architecture-diagram" viewBox="0 0 900 740" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>{de?"Anomx-Plattformarchitektur":"Anomx platform architecture"}</title>
        <desc id={`${id}-desc`}>{de?"Externe Systeme werden über Konnektoren mit DAQ-, Compute- und Agent-Workern verbunden. PostgreSQL, TimescaleDB, MinIO und Redis speichern Daten. Django und Celery orchestrieren über NATS und JetStream. Eine Next.js-Oberfläche verbindet Menschen über HTTP und WebSockets.":"External systems connect through connectors to DAQ, compute and agent workers. PostgreSQL, TimescaleDB, MinIO and Redis store data. Django and Celery orchestrate via NATS and JetStream. A Next.js application connects people through HTTP and WebSockets."}</desc>
        <defs>{["arrow","orange"].map(mark=><marker key={mark} id={`${id}-${mark}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1L9 5L1 9" fill="none" stroke={mark==='orange'?'#f18f1f':'var(--accent)'} strokeWidth="1.5"/></marker>)}</defs>
        {group(0,<>{box(40,682,250,45,de?"Dateien & Speicher":"Files & storage","DUST · Node FS · dCache")}{box(325,682,250,45,de?"Externe Rechenleistung":"External compute","Maxwell · Model hubs")}{box(610,682,250,45,de?"Kontrollsysteme & Daten":"Controls & data","DOOCS · Databases · Streams")}</>)}
        {line("M165 682V651H280",1)}{line("M450 682V666",1)}{line("M735 682V651H620",1)}
        {group(1,<>{box(280,620,340,46,de?"Konnektoren":"Connectors",undefined,true)}</>)}
        {line("M360 620V599H250V580",2)}{line("M530 620V599H685V580",3)}
        {group(2,<><rect x="40" y="365" width="420" height="215" rx="18" className="arch-layer-frame"/><text x="60" y="392" className="arch-section-label">{de?"AUSFÜHRUNG":"EXECUTION"}</text>{box(60,411,180,61,"DAQ Workers","DOOCS · ZeroMQ")}{box(260,411,180,61,"Compute Workers","CPU · GPU")}{box(60,491,380,64,"Agent Runtime",de?"Tools · Modelle · Kontext":"Tools · Models · Context")}</>)}
        {line("M460 522H529",3)}
        {group(3,<><rect x="510" y="365" width="350" height="215" rx="18" className="arch-layer-frame"/><text x="530" y="392" className="arch-section-label">{de?"DATEN & SPEICHER":"DATA & STORAGE"}</text>{box(530,411,145,61,"MinIO","S3 artifacts")}{box(695,411,145,61,"Redis","Cache · Queues")}{box(530,491,145,64,"TimescaleDB","Time series")}{box(695,491,145,64,"PostgreSQL","System context")}</>)}
        {line("M243 275V326H140V411",4,true)}{line("M657 275V326H355V411",4,true)}{line("M140 326H657",4,true)}{line("M760 275V411",4)}
        {group(4,<><rect x="40" y="173" width="820" height="121" rx="18" className="arch-layer-frame"/><text x="60" y="199" className="arch-section-label">{de?"STEUERUNG & ORCHESTRIERUNG":"CONTROL & ORCHESTRATION"}</text>{box(60,213,367,62,"Django API","Objects · Permissions · Workflows")}{box(477,213,363,62,"Task & Job Workers","Celery")}{box(334,309,231,32,"NATS + JetStream",undefined,true)}<path d="M427 244H477" className="arch-line" markerEnd={`url(#${id}-arrow)`}/></>)}
        {line("M450 134V173",5)}
        {group(5,<><text x="470" y="156" className="arch-detail">HTTP / WebSockets</text>{box(245,62,410,72,"Anomx App · Next.js",de?"Systeme · Daten · Agenten · Findings":"Systems · Data · Agents · Findings",true)}{[330,450,570].map(x=><g key={x}><circle cx={x} cy="17" r="7" className="arch-person"/><path d={`M${x-13} 39q0-16 13-16t13 16M${x} 43v17`} className="arch-line" markerEnd={`url(#${id}-arrow)`}/></g>)}</>)}
    </svg>;
}
