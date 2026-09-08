"use client";

import { useEffect, useRef } from "react";

const beamline = "M607 425L188 254";
const ring = "M607 425C553 384 546 316 574 255C606 184 693 151 766 178C852 210 890 294 869 374C848 452 779 494 704 479C663 471 634 452 607 425Z";
const branches = ["M188 254L99 193", "M188 254L86 226", "M188 254L80 258"];
const channels = [[270,287],[374,330],[480,373],[578,246],[733,169],[867,282],[831,441]];
const buildings = [[588,386,28,16],[623,402,32,19],[571,426,26,18],[612,447,35,18],[649,428,18,30],[576,465,26,17],[646,471,31,15]];
const clamp = (value:number) => Math.max(0,Math.min(1,value));

/** An illustrative campus map, animated by the same native scroll as the page. */
export function XfelSystemMap({de}:{de:boolean}) {
    const ref=useRef<HTMLDivElement>(null);
    useEffect(()=>{
        const element=ref.current;
        if(!element)return;
        const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
        const routes=[...element.querySelectorAll<SVGPathElement>("[data-map-route]")].map(path=>({path,length:path.getTotalLength(),dot:path.parentElement?.querySelector<SVGCircleElement>(".xfel-packet"),offset:Number(path.dataset.mapRoute)}));
        let frame=0;
        const update=()=>{
            frame=0;
            const rect=element.getBoundingClientRect();
            if(rect.bottom<0 || rect.top>window.innerHeight)return;
            // Finish the sketch while it enters; continue moving signals as it passes.
            const progress=clamp((window.innerHeight-rect.top)/(window.innerHeight+rect.height));
            const reveal=reduced.matches?1:clamp(progress*2.5);
            element.style.setProperty("--map-reveal",String(reveal));
            element.dataset.animated="true";
            if(reduced.matches)return;
            for(const {path,length,dot,offset} of routes) {
                if(!dot)continue;
                const point=path.getPointAtLength(length*((progress*1.6+offset)%1));
                dot.setAttribute("cx",String(point.x));dot.setAttribute("cy",String(point.y));
            }
        };
        const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
        update();
        window.addEventListener("scroll",scroll,{passive:true});
        window.addEventListener("resize",scroll);
        reduced.addEventListener("change",scroll);
        return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",scroll);window.removeEventListener("resize",scroll);reduced.removeEventListener("change",scroll);};
    },[]);
    return <div ref={ref} className="xfel-system-visual"><XfelMapArtwork de={de}/></div>;
}

/** Shared geometry for the animated page and its static social preview. */
export function XfelMapArtwork({de=false}:{de?:boolean}) {
    return <svg xmlns="http://www.w3.org/2000/svg" className="xfel-system-map" viewBox="0 0 960 640" role="img" aria-label={de?"Animierte, schematische Systemkarte: European XFEL und der DESY-Campus, verbunden durch Daten und gemeinsamen Systemkontext. Keine maßstabsgetreue Karte oder Live-Messung.":"Animated, schematic system map: European XFEL and the DESY campus, connected through data and shared system context. Not a scale map or live measurement."}>
            <g className="xfel-terrain" aria-hidden="true">
                <path d="M32 358C184 327 186 181 342 162S592 150 657 62M197 584C237 481 328 446 385 330S456 169 472 82M344 584C456 542 515 474 552 405S731 326 918 304"/>
                <path d="M42 470C219 412 373 459 460 489S701 557 919 541M105 89C213 146 277 224 316 336S371 528 415 600"/>
                <path d="M47 370C192 340 200 192 344 175S598 163 666 69M208 590C249 486 339 451 397 337S468 174 484 84"/>
            </g>
            <g className="xfel-system-footprint" aria-hidden="true">
                <path d="M554 377L635 373L696 467L653 508L559 489L535 443Z"/>
                <path d="M55 182L96 166L215 250L202 279L57 280Z"/>
            </g>
            <g className="xfel-route-base" aria-hidden="true"><path d={ring}/><path d={beamline}/>{branches.map(d=><path key={d} d={d}/>)}</g>
            <g className="xfel-route-active" aria-hidden="true">
                {[beamline,ring,...branches].map((d,index)=><g key={d}><path d={d} pathLength="1" data-map-route={index*.19}/><circle className="xfel-packet" r={index<2?4:3}/></g>)}
            </g>
            <g className="xfel-buildings" aria-hidden="true">{buildings.map(([x,y,w,h])=><rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="3" transform={`rotate(-24 ${x+w/2} ${y+h/2})`}/>)}</g>
            <g className="xfel-halls" aria-hidden="true">{[[99,193],[86,226],[80,258]].map(([x,y],index)=><rect key={x} x={x-21} y={y-8} width="42" height="16" rx="4" transform={`rotate(${[34,16,-2][index]} ${x} ${y})`}/>)}</g>
            <g className="xfel-channel-nodes" aria-hidden="true">{channels.map(([x,y])=><g key={x}><circle cx={x} cy={y} r="10"/><circle className="xfel-node-center" cx={x} cy={y} r="3"/></g>)}</g>
            <g className="xfel-campus-node" aria-hidden="true"><circle cx="607" cy="425" r="30"/><circle cx="607" cy="425" r="19"/><path d="M596 425h6l3-7 5 14 3-7h5"/></g>
            <g className="xfel-map-labels">
                <text x="80" y="324">European XFEL</text><text x="80" y="350" className="xfel-map-caption">SCHENEFELD</text>
                <text x="700" y="525">DESY</text><text x="700" y="551" className="xfel-map-caption">HAMBURG</text>
            </g>
            <g className="xfel-map-key"><circle cx="58" cy="597" r="3"/><text x="72" y="601">DOOCS <tspan dx="8">·</tspan><tspan dx="8">{de?"VERBUNDENER KONTEXT":"CONNECTED CONTEXT"}</tspan></text><text x="902" y="601" textAnchor="end">{de?"SCHEMATISCH":"SCHEMATIC"}</text></g>
        </svg>;
}
