"use client";

import { useId } from "react";
import { useLanguage } from "@/components/language-switcher";

/** Four distinct, illustrative states. No measured data or simulated product UI. */
export function AgentFigure({ stage }: { stage: number }) {
    const de = useLanguage() === "de";
    const id = useId().replaceAll(":", "");
    const labels = de ? ["Signale im System entdecken", "Verbindungen und Ursachen untersuchen", "Belege in eine Empfehlung überführen", "Erkenntnisse im Systemgedächtnis verbinden"] : ["Discover signals across a system", "Investigate relationships and causes", "Turn evidence into a recommendation", "Connect findings in system memory"];
    return <svg key={stage} className={`agent-figure figure-stage-${stage}`} viewBox="0 0 600 260" role="img" aria-label={labels[stage]}>
        <defs><radialGradient id={`${id}-glow`}><stop stopColor="var(--accent)" stopOpacity=".17" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></radialGradient></defs>
        <ellipse cx="300" cy="125" rx="210" ry="125" fill={`url(#${id}-glow)`} />
        {stage === 0 && <>
            {[47, 83, 119].map(r => <ellipse key={r} cx="300" cy="126" rx={r * 1.55} ry={r * .83} className="figure-orbit" />)}
            <path d="M115 126H485M300 27V226" className="figure-guide" />
            {[[142,101],[223,188],[387,63],[469,147],[340,165],[281,91]].map(([x,y],i) => <g key={i}><circle cx={x} cy={y} r={i===2?13:9} className={i===2?"figure-hot-halo":"figure-node-halo"}/><circle cx={x} cy={y} r={i===2?4:3} className={i===2?"figure-hot":"figure-dot"}/></g>)}
            <path d="M300 126L387 63" className="figure-path" /><circle cx="300" cy="126" r="21" className="figure-core" /><path d="M290 126h7l4-7 4 14 3-7h5" className="figure-stroke" />
            <text x="99" y="245">{de?"Verbundenes System":"Connected system"}</text><text x="501" y="245" textAnchor="end">{de?"Abweichung lokalisiert":"Deviation located"}</text>
        </>}
        {stage === 1 && <>
            {[[110,72],[110,188],[490,72],[490,188]].map(([x,y],i) => <path key={i} d={`M${x} ${y}C${x<300?220:380} ${y},${x<300?190:410} 130,300 130`} className="figure-path" />)}
            <path d="M110 72V188M490 72V188" className="figure-guide"/>
            <rect x="226" y="94" width="148" height="72" rx="22" className="figure-core" /><text x="300" y="125" textAnchor="middle" className="figure-label">{de?"Kontext":"Context"}</text><text x="300" y="145" textAnchor="middle">{de?"Belege verbinden":"Connect evidence"}</text>
            {(de?["Temperatur","Durchfluss","Analysen","Verlauf"]:["Temperature","Flow rate","Model outputs","Run history"]).map((label,i) => {const x=i<2?110:490;const y=i%2===0?72:188;return <g key={label}><circle cx={x} cy={y} r="20" className={i===0?"figure-core-hot":"figure-core"}/><circle cx={x} cy={y} r="4" className={i===0?"figure-hot":"figure-dot"}/><text x={x} y={y+38} textAnchor="middle">{label}</text></g>;})}
        </>}
        {stage === 2 && <>
            {[0,1,2].map(i=><g key={i} transform={`translate(${82+i*9} ${66-i*9})`}><rect width="119" height="112" rx="14" className="figure-card"/><path d="M21 31h70M21 49h54M21 67h65" className="figure-guide"/></g>)}
            <path d="M222 126H279M335 126H390" className="figure-path"/><path d="m380 121 10 5-10 5" className="figure-stroke"/>
            <path d="M307 87l28 11v27c0 22-28 36-28 36s-28-14-28-36V98Z" className="figure-core"/><path d="m295 123 8 8 17-18" className="figure-stroke"/>
            <rect x="397" y="73" width="119" height="108" rx="18" className="figure-core-hot"/><circle cx="424" cy="99" r="4" className="figure-hot"/><path d="M416 119h77M416 136h62M416 153h46" className="figure-guide"/>
            <text x="147" y="224" textAnchor="middle">{de?"Belege":"Evidence"}</text><text x="307" y="207" textAnchor="middle">{de?"Ihr Rahmen":"Your scope"}</text><text x="457" y="224" textAnchor="middle">{de?"Empfehlung":"Recommendation"}</text>
        </>}
        {stage === 3 && <>
            {[0,1,2].map(i=><g key={i} transform={`translate(0 ${i*41})`}><path d="M172 81L300 35L428 81L300 127Z" className="figure-memory"/><path d="M172 81L300 127L428 81" className="figure-path"/></g>)}
            <path d="M300 52V204" className="figure-guide"/><circle cx="300" cy="52" r="5" className="figure-hot"/>
            <path d="M440 71C510 73 503 214 401 223" className="figure-path"/><path d="m410 216-10 7 13 3" className="figure-stroke"/>
            <text x="147" y="243">{de?"Bisheriger Kontext":"Previous context"}</text><text x="490" y="243" textAnchor="end">{de?"Nächster Durchlauf":"Next run"}</text>
        </>}
    </svg>;
}
