"use client";

import { useId } from "react";
import { useLanguage } from "@/components/language-switcher";

const CHANNELS = 7;
const SAMPLES = 280;
const LEFT = 64;
const WIDTH = 1312;

function sample(channel: number, index: number, observed = false) {
    const envelope = Math.sin(index / SAMPLES * Math.PI);
    const wave = Math.sin(index * .063 + channel * .46) * 22
        + Math.sin(index * .174 + channel * .83) * 7
        + Math.sin(index * .49 + channel * 1.3) * 2.5;
    const deviation = observed && (channel === 3 || channel === 4)
        ? -Math.exp(-Math.pow((index - 177 - (channel - 3) * 8) / 6, 2)) * (channel === 3 ? 88 : 29) : 0;
    return [LEFT + index / SAMPLES * WIDTH, 88 + channel * 43 + wave * envelope + deviation];
}

function trace(channel: number, observed = false, start = 0, end = SAMPLES) {
    return Array.from({length:end-start+1}, (_,i) => {
        const [x,y] = sample(channel, i+start, observed);
        return `${i ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(" ");
}

export function HeroSignals() {
    const de = useLanguage() === "de";
    const id = useId().replace(/:/g, "");
    const [anomalyX,anomalyY] = sample(3,177,true);
    const [relatedX,relatedY] = sample(4,185,true);
    const stages = de ? ["Signale lesen", "Abweichungen erkennen", "Zusammenhänge verstehen"] : ["Read the signal", "Detect the deviation", "Connect the context"];
    return <figure className="hero-data" aria-label={de ? "Illustrative Zeitreihen. Scrollen enthüllt Signale, eine Abweichung und den Zusammenhang zwischen Kanälen." : "Illustrative time series. Scrolling reveals signals, a deviation and the relationship between channels."}>
        <svg className="hero-signals" viewBox="0 0 1440 440" preserveAspectRatio="none" aria-hidden="true">
            <defs>
                <linearGradient id={`${id}-signal`}><stop stopColor="#70cafa" stopOpacity=".25"/><stop offset=".25" stopColor="#79cfff"/><stop offset=".65" stopColor="#d7f3ff"/><stop offset="1" stopColor="#76caff" stopOpacity=".45"/></linearGradient>
                <radialGradient id={`${id}-atmosphere`}><stop stopColor="#1076a3" stopOpacity=".13"/><stop offset="1" stopColor="#1076a3" stopOpacity="0"/></radialGradient>
                <clipPath id={`${id}-observed`} clipPathUnits="userSpaceOnUse"><rect x="64" width="1312" height="440" className="hero-observation-clip"/></clipPath>
                <filter id={`${id}-glow`} x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>
            </defs>
            <ellipse cx="750" cy="245" rx="650" ry="190" fill={`url(#${id}-atmosphere)`}/>
            <g className="hero-data-grid">
                {Array.from({length:13},(_,i)=><path key={`x${i}`} d={`M${LEFT+i*WIDTH/12} 55V380`} vectorEffect="non-scaling-stroke"/>)}
                {[88,174,260,346].map(y=><path key={y} d={`M64 ${y}H1376`} vectorEffect="non-scaling-stroke"/>)}
            </g>
            <g className="hero-signal-blueprint">{Array.from({length:CHANNELS},(_,i)=><path key={i} d={trace(i)} vectorEffect="non-scaling-stroke"/>)}</g>
            <g clipPath={`url(#${id}-observed)`}>
                <path d={trace(3,true)} className="hero-signal-glow" filter={`url(#${id}-glow)`}/>
                {Array.from({length:CHANNELS},(_,i)=><path key={i} d={trace(i,true)} stroke={`url(#${id}-signal)`} className={`hero-data-trace ${i===3?"hero-data-primary":""}`} vectorEffect="non-scaling-stroke"/>)}
                <path d={trace(3,false,159,201)} className="hero-data-expected" vectorEffect="non-scaling-stroke"/>
                <path d={trace(3,true,162,192)} className="hero-data-anomaly" vectorEffect="non-scaling-stroke"/>
                <path d={trace(4,true,171,201)} className="hero-data-related" vectorEffect="non-scaling-stroke"/>
            </g>
            <g className="hero-data-cursor"><path d="M0 53V380" vectorEffect="non-scaling-stroke"/><circle cy="53" r="3"/><text y="412" textAnchor="middle">t</text></g>
            <g className="hero-data-insight">
                <circle cx={anomalyX} cy={anomalyY} r="12" className="hero-insight-halo"/>
                <circle cx={anomalyX} cy={anomalyY} r="3.5"/>
                <path d={`M${anomalyX} ${anomalyY-17}V57h25`} vectorEffect="non-scaling-stroke"/>
                <text x={anomalyX+35} y="62">{de?"Abweichung erkannt":"Deviation detected"}</text>
            </g>
            <g className="hero-data-context">
                <path d={`M${anomalyX+8} ${anomalyY+8}C${anomalyX+115} ${anomalyY+40},${relatedX+90} ${relatedY},${relatedX} ${relatedY}`} vectorEffect="non-scaling-stroke"/>
                <circle cx={relatedX} cy={relatedY} r="4"/>
            </g>
        </svg>
        <figcaption className="hero-data-caption content-width">
            <div className="hero-data-stages">{stages.map((stage,i)=><span key={stage} className={`hero-data-stage-${i}`}><b>0{i+1}</b>{stage}</span>)}</div>
            <span className="hero-data-note">{de?"ILLUSTRATIVE ZEITREIHEN":"ILLUSTRATIVE TIME SERIES"}</span>
        </figcaption>
    </figure>;
}
