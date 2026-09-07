"use client";

import type { CSSProperties } from "react";
import { useLanguage } from "@/components/language-switcher";
import { AgentFigure } from "@/components/agent-figures";
import { ScrollFade, ScrollProgress, useScrollScene } from "@/components/scroll-scenes";

const stages = {
    en: [
        { label: "Observe", title: "A signal worth a closer look.", body: "The background agent revisits connected data and system state on a schedule. It brings emerging deviations into context.", event: "Temperature diverges from expected behavior", detail: "Cooling circuit · time-series analysis", status: "Signal detected" },
        { label: "Reason", title: "Connect the change to the system.", body: "Investigate data, jobs, and related assets together. Use specialist tools and model outputs to turn a deviation into a grounded explanation.", event: "Compare the signal with related channels", detail: "Temperature · flow rate · previous runs", status: "Investigating" },
        { label: "Act", title: "Autonomy. With your boundaries.", body: "Create a recommendation for review, or make the platform changes your team has explicitly enabled. Permissions and usage budgets define the scope.", event: "Recommend an inspection of the cooling circuit", detail: "Evidence attached · awaiting human review", status: "Recommendation ready" },
        { label: "Remember", title: "The next run starts informed.", body: "Inspect earlier background runs, carry forward useful context, and avoid repeating the same findings. A continuous thread of operational intelligence.", event: "Keep the investigation in operational context", detail: "Run history · evidence · follow-up", status: "Context retained" }
    ],
    de: [
        { label: "Beobachten", title: "Ein Signal, das Aufmerksamkeit verdient.", body: "Der Hintergrundagent prüft verbundene Daten und den Systemzustand nach Zeitplan. Neue Abweichungen werden im Kontext betrachtet.", event: "Temperatur weicht vom erwarteten Verhalten ab", detail: "Kühlkreislauf · Zeitreihenanalyse", status: "Signal erkannt" },
        { label: "Verstehen", title: "Die Veränderung im System verstehen.", body: "Daten, Jobs und verbundene Anlagen gemeinsam untersuchen. Spezialisierte Werkzeuge und Modellergebnisse machen aus einer Abweichung eine fundierte Erklärung.", event: "Signal mit verbundenen Kanälen vergleichen", detail: "Temperatur · Durchfluss · frühere Durchläufe", status: "Analyse läuft" },
        { label: "Handeln", title: "Autonomie. In Ihrem Rahmen.", body: "Eine Empfehlung zur Prüfung erstellen oder ausdrücklich freigegebene Plattformänderungen vornehmen. Rechte und Nutzungsbudgets bestimmen den Handlungsspielraum.", event: "Prüfung des Kühlkreislaufs empfehlen", detail: "Belege beigefügt · wartet auf Prüfung", status: "Empfehlung bereit" },
        { label: "Erinnern", title: "Der nächste Durchlauf weiß mehr.", body: "Frühere Hintergrundläufe prüfen, hilfreichen Kontext aufgreifen und doppelte Findings vermeiden. Ein fortlaufendes Verständnis Ihres Systems.", event: "Untersuchung im Systemkontext festhalten", detail: "Verlauf · Belege · Nachverfolgung", status: "Kontext erhalten" }
    ]
};

function chartPath(offset = 0, anomaly = false) {
    return Array.from({ length: 101 }, (_, i) => {
        const x = 20 + i * 5.6;
        const y = 120 + Math.sin(i * 0.15) * 22 + Math.sin(i * 0.39) * 8 + offset - (anomaly && i > 65 ? Math.sin((i - 65) / 35 * Math.PI) * 61 : 0);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
}

export function SignalChart({ variant = "forecasting" }: { variant?: string }) {
    const de = useLanguage() === "de";
    return <svg viewBox="0 0 600 240" role="img" aria-label={de ? "Schematische Visualisierung von Normalverhalten und Abweichung" : "Illustrative visualization of normal behavior and a deviation"} className="signal-chart">
        {[60, 120, 180].map(y => <path key={y} d={`M20,${y}H580`} className="chart-grid" />)}
        {variant === "representation" ? <>
            <ellipse cx="275" cy="116" rx="148" ry="72" className="cluster-boundary" />
            {Array.from({ length: 64 }, (_, i) => { const a = i * 2.39996; const r = Math.sqrt(i / 64); return <circle key={i} cx={275 + Math.cos(a) * r * 128} cy={116 + Math.sin(a) * r * 56} r={2.6 + i % 3 * 0.7} className="cluster-point" style={{"--point-index":i} as CSSProperties} />; })}
            <path d="M411 88L473 57" className="chart-dashed" /><circle cx="484" cy="50" r="6" fill="#f18f1f" />
        </> : <>
            <path d={chartPath()} className="chart-band" />
            <path d={chartPath(0, true)} className="chart-observed" pathLength="1" />
            <path d={chartPath(variant === "reconstruction" ? 3 : 0)} className="chart-expected" />
            <line x1="442" y1="33" x2="442" y2="190" className="chart-dashed" />
            <circle cx="442" cy="56" r="5" fill="#f18f1f" />
        </>}
        <text x="20" y="224">{variant === "representation" ? (de ? "Merkmalsraum" : "Feature space") : (de ? "Vergangenheit" : "Past")}</text>
        <text x="580" y="224" textAnchor="end">{variant === "representation" ? (de ? "Isolierte Beobachtung" : "Isolated observation") : (de ? "Gegenwart" : "Present")}</text>
    </svg>;
}

export function BackgroundStory() {
    const language = useLanguage();
    const de = language === "de";
    const copy = stages[language];
    const {ref,active,pinned,style} = useScrollScene(copy.length);
    return <section ref={ref} className="agent-story scroll-scene background-scene" id="background-agent" style={style}>
        <div className="scroll-scene-pin content-width">
            <div className="section-intro"><p className="kicker">BACKGROUND INTELLIGENCE</p><h2>{de ? <>Denkt weiter.<br /><span className="muted">Auch im Hintergrund.</span></> : <>Always thinking.<br /><span className="muted">Quietly ahead.</span></>}</h2></div>
            <ScrollProgress labels={copy.map(step=>step.label)} active={active} className="background-progress"/>
            <div className="scroll-panels">{copy.map((step,index)=><article key={step.label} className="scroll-panel" data-scroll-step data-current={index===active} aria-hidden={pinned && index!==active ? true : undefined}>
                <ScrollFade className="agent-stage">
                    <div className="agent-narrative"><span className="science-number">0{index+1} · {step.label}</span><div className="stage-description"><h3>{step.title}</h3><p>{step.body}</p></div></div>
                    <div className="agent-window"><div className="window-bar"><span className="status-dot"/><span>Anomx Background</span><span className="window-tag">{de?"BEISPIEL":"EXAMPLE"}</span></div><div className="agent-window-body"><div className="agent-prompt">{de?"Behalte den Kühlkreislauf im Blick. Untersuche ungewöhnliches Verhalten.":"Watch the cooling circuit. Investigate unusual behavior."}</div><AgentFigure stage={index}/><div className="agent-event"><span className="event-symbol">{["⌁","◎","↗","⟲"][index]}</span><div><span className="event-status">{step.status}</span><h4>{step.event}</h4><p>{step.detail}</p></div></div><div className="agent-window-footer"><span>{de?"Nach Zeitplan aktiv":"Runs on your schedule"}</span><span>{de?"In Ihrem Rahmen":"Within your boundaries"}</span></div></div></div>
                </ScrollFade>
            </article>)}</div>
        </div>
    </section>;
}

const approaches = {
    en: [
        { name: "Forecasting", title: "See what should happen next.", body: "Learn temporal behavior and compare new observations with a forecast. Residuals reveal where reality departs from expectation.", model: "Rolling-window models · Darts integration", formula: "score = | observed − predicted |" },
        { name: "Reconstruction", title: "Learn normal. Recognize different.", body: "Compress and reconstruct the system’s observations. Patterns that cannot be reconstructed well become candidates for investigation.", model: "Principal component analysis · PyTorch autoencoders", formula: "score = ‖ observed − reconstructed ‖" },
        { name: "Representation", title: "Find the unfamiliar in many dimensions.", body: "Compare observations in a feature space. Isolation and normality models surface unusual combinations that single-channel thresholds can miss.", model: "Feature-space modeling · Isolation Forest", formula: "score = unusualness in feature space" }
    ],
    de: [
        { name: "Forecasting", title: "Verstehen, was als Nächstes zu erwarten ist.", body: "Zeitliches Verhalten lernen und neue Beobachtungen mit einer Prognose vergleichen. Residuen zeigen, wo Realität und Erwartung auseinandergehen.", model: "Rolling-Window-Modelle · Darts-Integration", formula: "Score = | Beobachtung − Prognose |" },
        { name: "Reconstruction", title: "Normal lernen. Anders erkennen.", body: "Beobachtungen des Systems komprimieren und rekonstruieren. Muster, die sich schlecht rekonstruieren lassen, werden gezielt untersucht.", model: "Hauptkomponentenanalyse · PyTorch-Autoencoder", formula: "Score = ‖ Beobachtung − Rekonstruktion ‖" },
        { name: "Representation", title: "Das Ungewohnte in vielen Dimensionen finden.", body: "Beobachtungen im Merkmalsraum vergleichen. Isolation und Normalitätsmodelle erkennen ungewöhnliche Kombinationen, die einzelne Grenzwerte übersehen können.", model: "Modellierung im Merkmalsraum · Isolation Forest", formula: "Score = Auffälligkeit im Merkmalsraum" }
    ]
};

export function ScienceSection() {
    const language = useLanguage();
    const de = language === "de";
    const copy = approaches[language];
    const {ref,active,pinned,style} = useScrollScene(copy.length);
    return <section ref={ref} className="science-section scroll-scene science-scene" id="science" style={style}>
        <div className="scroll-scene-pin content-width">
            <div className="section-intro"><p className="kicker">{de?"WISSENSCHAFT IM KERN":"SCIENCE AT THE CORE"}</p><h2>{de?<>Intelligenz braucht<br/><span className="muted">eine Grundlage.</span></>:<>Intelligence needs<br/><span className="muted">a foundation.</span></>}</h2><p className="section-lead">{de?"Drei komplementäre Wege, Abweichungen zu erkennen. Eine gemeinsame Grundlage für fundierte Entscheidungen.":"Three complementary ways to detect the unexpected. One foundation for informed decisions."}</p></div>
            <ScrollProgress labels={copy.map(method=>method.name)} active={active} className="science-progress"/>
            <div className="scroll-panels">{copy.map((method,index)=><article className="scroll-panel" key={method.name} data-scroll-step data-current={active===index} aria-hidden={pinned && active!==index ? true : undefined}>
                <ScrollFade className="science-panel"><div className="science-copy"><span className="science-number">0{index+1} · {method.name}</span><h3>{method.title}</h3><p>{method.body}</p><span className="model-label">{method.model}</span></div><div className="science-visual"><div className="chart-legend"><span><i/>{de?"Beobachtung":"Observation"}</span><span><i/>{de?"Normalverhalten":"Normal behavior"}</span><span><i/>{de?"Abweichung":"Deviation"}</span></div><SignalChart variant={method.name.toLowerCase()}/><code className="formula">{method.formula}</code><p className="visual-caption">{de?"Schematische Darstellung · keine Messdaten":"Illustrative visualization · not measured data"}</p></div></ScrollFade>
            </article>)}</div>
        </div>
    </section>;
}
