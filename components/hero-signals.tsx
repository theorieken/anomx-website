"use client";

import { useLanguage } from "@/components/language-switcher";

function trace(channel: number, anomalous = false, start = 0, end = 240) {
    return Array.from({length: end - start + 1}, (_,index) => {
        const i = index + start;
        const x = i * 6;
        const envelope = Math.sin(i / 240 * Math.PI);
        const wave = Math.sin(i * .077 + channel * .65) * 30 + Math.sin(i * .205 + channel) * 9;
        const deviation = anomalous ? Math.exp(-Math.pow((i - 159) / 8, 2)) * -103 : 0;
        return `${index ? "L" : "M"}${x},${(240 + channel * 44 + wave * envelope + deviation).toFixed(2)}`;
    }).join(" ");
}

export function HeroSignals() {
    const de = useLanguage() === "de";
    return <svg className="hero-signals" viewBox="0 0 1440 680" aria-hidden="true">
        <defs><linearGradient id="hero-signal-color"><stop stopColor="#7bd5ff" stopOpacity="0"/><stop offset=".2" stopColor="#7bd5ff"/><stop offset=".8" stopColor="#d5f5ff"/><stop offset="1" stopColor="#7bd5ff" stopOpacity="0"/></linearGradient></defs>
        {[0,1,2,3,4].map(channel=><path key={channel} d={trace(channel,channel===2)} pathLength="1" className={`hero-trace hero-trace-${channel}`} />)}
        <path d={trace(2)} className="hero-baseline"/>
        <path d={trace(2,true,144,175)} pathLength="1" className="hero-anomaly"/>
        <g className="hero-time-cursor"><path d="M0 180V507"/><circle cy="180" r="3"/><text y="540" textAnchor="middle">{de ? "BEOBACHTUNG" : "OBSERVATION"}</text></g>
        <text x="90" y="579" className="hero-signal-label">{de ? "AUS DATEN WIRD VERSTÄNDNIS" : "FROM DATA TO UNDERSTANDING"}</text>
        <text x="1350" y="579" textAnchor="end" className="hero-signal-label">t →</text>
    </svg>;
}
