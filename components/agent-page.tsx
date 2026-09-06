"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useId, type KeyboardEvent } from "react";
import { useLanguage } from "@/components/language-switcher";
import { Arrow, CopyCommand, Experience, FinalInvitation, Reveal } from "@/components/experience";
import { AgentFigure } from "@/components/agent-figures";

export function AgentPage() {
    const de = useLanguage() === "de";
    const [active, setActive] = useState(4);
    const id = useId();
    const tabs = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const list = tabs.current;
        const selected = list?.querySelector<HTMLButtonElement>('[aria-selected="true"]');
        if (!list || !selected) return;
        const offset = selected.getBoundingClientRect().left - list.getBoundingClientRect().left;
        if (offset < 0 || offset + selected.offsetWidth > list.clientWidth) {
            list.scrollTo({left: list.scrollLeft + offset - (list.clientWidth - selected.offsetWidth) / 2});
        }
    }, [active]);
    const modes = de ? [
        ["Plan", "Erst verstehen. Dann entscheiden.", "Nur lesen und analysieren. Werkzeuge, die Dateien, Prozesse oder Plattformzustand verändern, stehen nicht zur Verfügung.", "Interaktiv · Nur lesen"],
        ["Standard", "Gemeinsam am System arbeiten.", "Kommandos, die noch nicht als freigegeben gespeichert sind, benötigen Ihre Zustimmung. Die Voreinstellung für interaktive Untersuchungen.", "Interaktiv · Mit Freigaben"],
        ["Automatic", "Routine delegieren. Bewusst entscheiden.", "Lesezugriffe und als risikoarm eingestufte Kommandos laufen automatisch. Kommandos mit mittlerem oder hohem Risiko benötigen eine Freigabe.", "Interaktiv · Risikobasierte Freigaben"],
        ["Autonomous", "Ein Ziel. Selbstständige Arbeit.", "Kommandos laufen ohne Freigabedialog, einschließlich Host- und sudo-Kommandos. Für bewusst delegierte Arbeit in einer dafür vorgesehenen Umgebung.", "Interaktiv · Weitreichender Handlungsspielraum"],
        ["Background", "Denkt weiter, wenn Sie weiterziehen.", "Geplante Prompts laufen in der Plattform ohne Rückfragen. Standardmäßig liest der Agent und erstellt Empfehlungen. Nur explizit freigegebene Objekttypen darf er direkt ändern. Budgets und frühere Runs geben den Rahmen vor.", "Plattform · Geplant · Begrenzter Handlungsspielraum"]
    ] : [
        ["Plan", "Understand first. Decide next.", "Read and analyze. Tools that change files, processes or platform state are unavailable.", "Interactive · Read only"],
        ["Standard", "Work through it together.", "Commands not already remembered as approved ask for your permission. The default for interactive investigations.", "Interactive · Approval based"],
        ["Automatic", "Delegate the routine. Decide the rest.", "Read operations and commands classified as low risk run automatically. Commands classified as medium or high risk require approval.", "Interactive · Risk-based approval"],
        ["Autonomous", "One goal. Independent work.", "Commands run without approval prompts, including host-control and sudo commands. For deliberately delegated work in an appropriate environment.", "Interactive · Broad command authority"],
        ["Background", "Keep thinking when you move on.", "Planned prompts run in the platform without questions. By default, the agent reads and creates recommendations. Only explicitly allowed object types can be changed directly. Budgets and previous runs define the context.", "Platform · Scheduled · Scoped authority"]
    ];
    const key = (event:KeyboardEvent<HTMLButtonElement>,index:number) => {
        const next=event.key==="ArrowRight"?(index+1)%5:event.key==="ArrowLeft"?(index+4)%5:event.key==="Home"?0:event.key==="End"?4:-1;
        if(next>=0){event.preventDefault();setActive(next);document.getElementById(`${id}-mode-${next}`)?.focus();}
    };
    return <Experience>
        <section className="product-hero content-width"><p className="kicker">ANOMX AGENT</p><h1>{de?<>Ein Agent.<br/><span className="gradient-text">Überall im System.</span></>:<>One agent.<br/><span className="gradient-text">Across your system.</span></>}</h1><p>{de?"In der Plattform. Im Hintergrund. In Ihrem Terminal. Ein KI-Partner, der Daten und Werkzeuge mit dem Kontext Ihrer Maschinen verbindet.":"In the platform. In the background. In your terminal. An AI partner that connects data and tools to the context of your machines."}</p><div className="hero-links"><a href="#agent-modes" className="pill pill-primary">{de?"Arbeitsweisen entdecken":"Explore the modes"}<span aria-hidden="true">↓</span></a><Link className="text-link" href="/documentation">{de?"Dokumentation lesen":"Read the docs"}<Arrow/></Link></div></section>
        <section className="agent-surfaces content-width"><div className="capability-row">{(de?[
            ["01","In der Plattform.","Fragen im gemeinsamen Arbeitsraum stellen. Systeme, Kanäle, Jobs und Findings gemeinsam untersuchen — mit den verbundenen Tools und dem Kontext Ihres Teams."],
            ["02","Im Hintergrund.","Aus einer Frage einen wiederkehrenden Auftrag machen. Geplante Prompts untersuchen Veränderungen, greifen frühere Runs auf und halten Erkenntnisse als Empfehlungen fest."],
            ["03","Im Terminal.","Direkt bei Daten und Code arbeiten. Der offene CLI-Agent untersucht lokale Dateien, führt freigegebene Werkzeuge aus und verbindet sich bei Bedarf mit der Plattform."]
        ]:[
            ["01","In the platform.","Ask questions in a shared workspace. Investigate systems, channels, jobs and findings together, with connected tools and your team’s context."],
            ["02","In the background.","Turn a question into a recurring assignment. Planned prompts investigate change, revisit earlier runs and preserve findings as recommendations."],
            ["03","In the terminal.","Work where data and code live. The open-source CLI agent inspects local files, runs permitted tools and connects to the platform when needed."]
        ]).map(([n,title,body])=><Reveal key={n}><span className="small-index">{n}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</div></section>
        <section className="agent-modes-section surface" id="agent-modes"><div className="content-width"><Reveal><p className="kicker">{de?"DER PASSENDE HANDLUNGSSPIELRAUM":"THE RIGHT DEGREE OF AUTONOMY"}</p><h2>{de?<>Sie geben das Ziel vor.<br/><span className="muted">Und den Rahmen.</span></>:<>You set the goal.<br/><span className="muted">And the boundaries.</span></>}</h2></Reveal><div ref={tabs} className="agent-mode-tabs" role="tablist" aria-label={de?"Agent-Modi":"Agent modes"}>{modes.map(([name],i)=><button key={name} id={`${id}-mode-${i}`} type="button" role="tab" aria-selected={active===i} aria-controls={`${id}-mode-panel`} tabIndex={active===i?0:-1} onClick={()=>setActive(i)} onKeyDown={event=>key(event,i)}>{name}</button>)}</div><div className="agent-mode-panel" id={`${id}-mode-panel`} role="tabpanel" aria-labelledby={`${id}-mode-${active}`} tabIndex={0}><div><span className="mode-scope">{modes[active][3]}</span><h3>{modes[active][1]}</h3><p>{modes[active][2]}</p></div><AgentFigure stage={active===4?3:active===0?1:2}/></div><p className="architecture-note">{de?"Die vier interaktiven Modi stehen für die direkte Arbeit bereit; im CLI wechseln Sie mit Shift+Tab. Background ist ein eigener Plattformmodus für geplante Prompts und gehört nicht zu diesem Wechsel.":"Four interactive modes support direct work; in the CLI, cycle with Shift+Tab. Background is a separate platform mode for planned prompts and is not part of that cycle."}</p></div></section>
        <section className="product-section content-width"><Reveal className="product-split"><div><p className="kicker">{de?"VOM PROMPT ZUM FORTLAUFENDEN AUFTRAG":"FROM A PROMPT TO AN ONGOING ASSIGNMENT"}</p><h2>{de?<>Ein Gedanke.<br/><span className="muted">Mehr als ein Durchlauf.</span></>:<>One thought.<br/><span className="muted">Beyond a single run.</span></>}</h2><p>{de?"Legen Sie in der Plattform fest, was der Agent untersuchen soll und wann er wiederkommt. Er verbindet neue Beobachtungen mit dem bisherigen Verlauf und hält seine Arbeit nachvollziehbar.":"Define what the agent should investigate and when it should return. It connects new observations to earlier runs and keeps its work inspectable."}</p><Link href="/cases/european-xfel" className="text-link">{de?"Data Discovery bei DESY":"Data discovery at DESY"}<Arrow/></Link></div><div className="product-list">{(de?[
            ["Auftrag & Zeitplan.","Geplante Prompts geben Ziel und Intervall vor. Die Plattform steuert die Ausführung."],
            ["Tools & gemeinsamer Kontext.","Verbundene Plattformobjekte, API-Werkzeuge und Skills machen Systeme für den Agenten untersuchbar."],
            ["Ergebnisse & Grenzen.","Empfehlungen, Run-Verlauf und Nutzungsbudgets halten die Arbeit prüfbar. Direkte Änderungen benötigen einen expliziten Objektrahmen."]
        ]:[
            ["Intent & schedule.","Planned prompts define a goal and interval. The platform coordinates execution."],
            ["Tools & shared context.","Connected platform objects, API tools and skills make systems available for investigation."],
            ["Results & boundaries.","Recommendations, run history and usage budgets make the work reviewable. Direct changes require an explicit object scope."]
        ]).map(([title,body])=><article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></Reveal></section>
        <section className="product-section surface" id="install"><div className="content-width"><Reveal className="product-split"><div><p className="kicker">{de?"AUCH DIREKT IM TERMINAL":"ALSO AT HOME IN YOUR TERMINAL"}</p><h2>{de?<>Installieren.<br/><span className="muted">Fragen. Verstehen.</span></>:<>Install.<br/><span className="muted">Ask. Understand.</span></>}</h2><p>{de?"Ein eigenständiger Einstieg für Code, Daten und Anomalieanalyse. Starten Sie Anomx in Ihrem Arbeitsverzeichnis und verbinden Sie Ihren Modellanbieter.":"A standalone starting point for code, data and anomaly analysis. Start Anomx in your working directory and connect your model provider."}</p><CopyCommand command="pip install anomx"/><CopyCommand command="anomx"/><span className="install-meta">Python 3.11+ · Apache 2.0 · Open source</span><Link className="text-link" href="/documentation">{de?"Zum CLI-Guide":"Open the CLI guide"}<Arrow/></Link></div><div className="terminal-preview"><div className="terminal-title"><span className="status-dot"/>anomx <span style={{marginLeft:"auto"}}>{de?"BEISPIEL":"EXAMPLE"}</span></div><pre><span className="cyan">$ anomx</span>{"\n\n"}<strong>Anomx.</strong>{"\n\n"}<span className="cyan">› </span>{de?"Untersuche diese Sensordaten.\n  Was hat sich verändert?":"Investigate these sensor readings.\n  What changed?"}{"\n\n"}{de?"  Datenstruktur prüfen\n  Kanäle und Muster vergleichen\n  Anomaliekandidaten erklären":"  Inspect the data structure\n  Compare channels and patterns\n  Explain candidate anomalies"}{"\n\n"}<span className="cyan">Ω Standard · Shift+Tab</span></pre></div></Reveal></div></section>
        <section className="product-section content-width"><Reveal><p className="kicker">{de?"OFFEN FÜR IHRE MODELLE":"OPEN TO YOUR MODELS"}</p><h2>{de?<>Die Intelligenz<br/><span className="muted">Ihrer Wahl.</span></>:<>The intelligence<br/><span className="muted">you choose.</span></>}</h2><div className="provider-list"><span>OpenAI</span><span>Anthropic</span><span>Kimi</span><span>Ollama</span><span>DESY Assistant</span><span>JSC Blablador</span></div><p className="section-lead">{de?"Verbinden Sie einen Cloud-Anbieter oder ein lokal bereitgestelltes Modell. Modellzugang, Tools und der gewählte Modus bestimmen die nutzbaren Fähigkeiten.":"Connect a cloud provider or a locally served model. Model access, tools and the selected mode determine the available capabilities."}</p></Reveal></section><FinalInvitation/>
    </Experience>;
}
