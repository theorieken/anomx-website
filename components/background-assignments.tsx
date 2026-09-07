"use client";

import type { CSSProperties } from "react";
import { useLanguage } from "@/components/language-switcher";
import { FlowPath } from "@/components/agent-figures";
import { ScrollProgress, useScrollScene } from "@/components/scroll-scenes";

const assignments = {
    en: [
        {label:"Discover",title:"Give every signal a place.",instruction:"Infer the system structure and its components from all the data available to you.",body:"An ongoing instruction turns names, descriptions and connected sources into a system hierarchy that can be reviewed and refined.",result:"Candidate system hierarchy"},
        {label:"Maintain",title:"Keep the context in order.",instruction:"Keep data channels coherent, with consistent units and meaningful descriptions.",body:"Revisit channel metadata, identify gaps and prepare corrections. Apply changes within the object permissions you define.",result:"Consistent channel metadata"},
        {label:"Connect",title:"Find what moves together.",instruction:"Look for correlations between channels and update the data graph accordingly.",body:"Compare related observations and propose new graph connections. Keep the evidence attached: correlation is a clue, not proof of causation.",result:"Evidence-linked relationships"},
        {label:"Forecast",title:"Prepare for the next question.",instruction:"Train forecasting models for the data channels our team views most often.",body:"Use available usage context to prioritize channels, prepare training jobs and retain candidate models for evaluation.",result:"Forecasting models for review"}
    ],
    de: [
        {label:"Erkunden",title:"Jedes Signal bekommt einen Platz.",instruction:"Leite die Systemstruktur und ihre Komponenten aus allen verfügbaren Daten ab.",body:"Ein fortlaufender Auftrag verbindet Namen, Beschreibungen und Datenquellen zu einer Systemhierarchie, die sich prüfen und verfeinern lässt.",result:"Abgeleitete Systemhierarchie"},
        {label:"Pflegen",title:"Kontext, der in Ordnung bleibt.",instruction:"Halte Datenkanäle konsistent, mit passenden Einheiten und aussagekräftigen Beschreibungen.",body:"Kanalmetadaten erneut prüfen, Lücken erkennen und Korrekturen vorbereiten. Änderungen erfolgen innerhalb Ihrer Objektfreigaben.",result:"Konsistente Kanalmetadaten"},
        {label:"Verbinden",title:"Erkennen, was sich gemeinsam verändert.",instruction:"Suche Korrelationen zwischen Datenkanälen und aktualisiere den Datengraphen entsprechend.",body:"Verwandte Beobachtungen vergleichen und neue Verknüpfungen vorschlagen. Belege bleiben verbunden: Korrelation ist ein Hinweis, kein Kausalitätsnachweis.",result:"Belegte Zusammenhänge"},
        {label:"Vorhersagen",title:"Bereit für die nächste Frage.",instruction:"Trainiere Forecasting-Modelle für die Datenkanäle, die unser Team am häufigsten ansieht.",body:"Verfügbaren Nutzungskontext für die Priorisierung verwenden, Trainingsjobs vorbereiten und Modellkandidaten zur Bewertung festhalten.",result:"Forecasting-Modelle zur Prüfung"}
    ]
};

function AssignmentFigure({stage}:{stage:number}) {
    const de = useLanguage()==="de";
    return <svg viewBox="0 0 600 280" className="assignment-figure" role="img" aria-label={assignments[de?"de":"en"][stage].result}>
        {stage===0&&<>
            <text x="300" y="29" textAnchor="middle" className="assignment-caption">{de?"DATEN WERDEN ZU SYSTEMKONTEXT":"DATA BECOMES SYSTEM CONTEXT"}</text>
            <rect x="223" y="55" width="154" height="46" rx="15" className="figure-core"/><text x="300" y="84" textAnchor="middle">{de?"Verfügbare Daten":"Available data"}</text>
            <FlowPath d="M300 101V136"/>
            <rect x="235" y="137" width="130" height="42" rx="14" className="figure-core"/><text x="300" y="164" textAnchor="middle">{de?"Anlage":"Facility"}</text>
            {[100,300,500].map((x,i)=><g key={x}><FlowPath d={`M300 179V196Q300 207 ${x} 207V223`} delay={.18+i*.09}/><g className="assignment-reveal" style={{"--reveal-delay":.2+i*.12} as CSSProperties}><rect x={x-68} y="223" width="136" height="38" rx="12" className="figure-core"/><text x={x} y="248" textAnchor="middle">{(de?["Kühlung","Antrieb","Vakuum"]:["Cooling","Drive","Vacuum"])[i]}</text></g></g>)}
        </>}
        {stage===1&&<>
            <text x="40" y="31" className="assignment-caption">{de?"KANAL":"CHANNEL"}</text><text x="430" y="31" className="assignment-caption">{de?"EINHEIT":"UNIT"}</text>
            {[0,1,2].map((i)=><g key={i} style={{"--reveal-delay":i*.15} as CSSProperties}>
                <path d={`M35 ${55+i*66}H565`} className="figure-guide"/>
                <g className="assignment-before"><text x="40" y={91+i*66}>{["TEMP_01","FLOW_02","PRESS_03"][i]}</text><text x="430" y={91+i*66}>—</text></g>
                <g className="assignment-after"><text x="40" y={91+i*66}>{["cooling.supply_temperature","cooling.flow_rate","vacuum.pressure"][i]}</text><text x="430" y={91+i*66}>{["°C","L/min","mbar"][i]}</text><path d={`m530 ${86+i*66} 6 6 12-13`} className="figure-stroke"/></g>
            </g>)}
            <text x="40" y="269" className="assignment-caption">{de?"BESCHREIBUNGEN · EINHEITEN · NACHVOLLZIEHBARE ÄNDERUNGEN":"DESCRIPTIONS · UNITS · INSPECTABLE CHANGES"}</text>
        </>}
        {stage===2&&<>
            <text x="300" y="28" textAnchor="middle" className="assignment-caption">{de?"ZUSAMMENHÄNGE IM DATENGRAPHEN":"RELATIONSHIPS IN THE DATA GRAPH"}</text>
            <path d="M110 83L300 65L490 95M110 83L180 217M490 95L425 214" className="figure-guide"/>
            <FlowPath d="M110 83Q232 126 425 214"/><FlowPath d="M300 65Q365 153 490 95" delay={.2}/><FlowPath d="M180 217Q300 143 425 214" delay={.4}/>
            {[[110,83],[300,65],[490,95],[180,217],[425,214]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="22" className="figure-core"/><circle cx={x} cy={y} r="4" className="figure-dot"/><text x={x} y={y+42} textAnchor="middle">{(de?["Temperatur","HF-Leistung","Vibration","Druck","Durchfluss"]:["Temperature","RF power","Vibration","Pressure","Flow"])[i]}</text></g>)}
        </>}
        {stage===3&&<>
            <text x="40" y="28" className="assignment-caption">{de?"HÄUFIG GESEHENER KANAL":"FREQUENTLY VIEWED CHANNEL"}</text><text x="40" y="53">cooling.supply_temperature</text>
            {[100,150,200].map(y=><path key={y} d={`M35 ${y}H565`} className="figure-guide"/>)}
            <path d="M40 178C65 181 67 103 100 124S140 215 175 177S215 112 250 130S284 207 320 171S352 120 380 138" className="assignment-observed"/>
            <path d="M380 79V221" className="figure-guide"/>
            <FlowPath d="M380 138C415 187 435 197 459 158S510 126 555 166" delay={.15}/>
            <path d="M380 138C415 187 435 197 459 158S510 126 555 166" className="assignment-forecast-band"/>
            <text x="40" y="255" className="assignment-caption">{de?"TRAININGSDATEN":"TRAINING DATA"}</text><text x="555" y="255" textAnchor="end" className="assignment-caption">{de?"MODELLKANDIDAT":"CANDIDATE MODEL"}</text>
        </>}
    </svg>;
}

export function BackgroundAssignments() {
    const language=useLanguage();
    const de=language==="de";
    const copy=assignments[language];
    const {ref,active,pinned,style}=useScrollScene(copy.length);
    return <section ref={ref} id="inside-platform" className="scroll-scene assignment-scene" style={style}>
        <div className="scroll-scene-pin content-width">
            <div className="section-intro"><p className="kicker">{de?"IN DER PLATTFORM":"INSIDE THE PLATFORM"}</p><h2>{de?<>Sie gehen weiter.<br/><span className="muted">Ihr Agent bleibt dran.</span></>:<>You step away.<br/><span className="muted">Your agent stays with it.</span></>}</h2><p className="section-lead">{de?"Formulieren Sie eigene fortlaufende Aufträge. Ihr Hintergrundagent greift sie nach Zeitplan wieder auf — auch wenn niemand die Plattform geöffnet hat.":"Create your own ongoing instructions. Your background agent returns to them on a schedule — even when no one has the platform open."}</p></div>
            <ScrollProgress labels={copy.map(item=>item.label)} active={active}/>
            <div className="assignment-presence"><span><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4M8 8l8 5m0-5-8 5"/></svg>{de?"Arbeitsbereich geschlossen":"Workspace closed"}</span><span><i className="status-dot"/>{de?"Hintergrundagent aktiv":"Background agent active"}</span></div>
            <div className="scroll-panels">{copy.map((item,index)=><article key={item.label} className="scroll-panel assignment-panel" data-scroll-step data-current={active===index} aria-hidden={pinned&&active!==index?true:undefined}>
                <div className="assignment-copy"><span className="science-number">{de?"BEISPIEL FÜR EINEN FORTLAUFENDEN AUFTRAG":"EXAMPLE ONGOING INSTRUCTION"}</span><h3>{item.title}</h3><blockquote>“{item.instruction}”</blockquote><p>{item.body}</p></div>
                <div className="assignment-canvas"><AssignmentFigure stage={index}/><div className="assignment-result"><span className="status-dot"/>{item.result}</div></div>
            </article>)}</div>
            <p className="assignment-note">{de?"Illustrative Aufträge. Verbundene Tools, Datenzugang, Freigaben und Rechenressourcen bestimmen die Ausführung.":"Illustrative assignments. Connected tools, data access, permissions and compute determine execution."}</p>
        </div>
    </section>;
}
