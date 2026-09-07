"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useLanguage } from "@/components/language-switcher";

const clamp = (value:number) => Math.max(0,Math.min(1,value));

/** One bottom progress bar for the mobile section at the reading position. */
export function useFloatingProgress<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    useEffect(() => {
        const element = ref.current;
        const section = element?.closest<HTMLElement>(".scroll-scene,.sticky-split,.architecture-scroll");
        if (!element || !section) return;
        const mobile = window.matchMedia("(max-width: 899px)");
        let frame = 0;
        const update = () => {
            frame = 0;
            const rect = section.getBoundingClientRect();
            const readingLine = Math.min(220,window.innerHeight*.3);
            if (mobile.matches) element.dataset.floating = rect.top <= readingLine && rect.bottom > readingLine ? "visible" : "hidden";
            else delete element.dataset.floating;
        };
        const scroll = () => { if (!frame) frame=requestAnimationFrame(update); };
        update();
        mobile.addEventListener("change",scroll);
        window.addEventListener("scroll",scroll,{passive:true});
        window.addEventListener("resize",scroll);
        window.visualViewport?.addEventListener("resize",scroll);
        return () => { mobile.removeEventListener("change",scroll);window.removeEventListener("scroll",scroll);window.removeEventListener("resize",scroll);window.visualViewport?.removeEventListener("resize",scroll);cancelAnimationFrame(frame); };
    },[]);
    return ref;
}

/** Native sticky positioning; never intercepts wheel, touch or keyboard scrolling. */
export function useScrollScene<T extends HTMLElement = HTMLElement>(count:number,canPin=true) {
    const ref = useRef<T>(null);
    const [active,setActive] = useState(0);
    const [pinned,setPinned] = useState(false);
    const language = useLanguage();
    useEffect(() => {
        const element = ref.current;
        const pin = element?.querySelector<HTMLElement>(".scroll-scene-pin") || (!canPin ? element : null);
        if (!element || !pin) return;
        const media = window.matchMedia("(min-width: 900px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)");
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        const stickyCopy = !canPin ? element.querySelector<HTMLElement>(".sticky-split-copy") : null;
        const panels = [...element.querySelectorAll<HTMLElement>("[data-scroll-step]")];
        const routes = [...element.querySelectorAll<SVGPathElement>("[data-flow-route]")].map(path=>({
            path, marker:path.parentElement?.querySelector<SVGCircleElement>("[data-flow-dot]"),
            length:path.getTotalLength(), index:panels.indexOf(path.closest<HTMLElement>("[data-scroll-step]")!),
            delay:Number(path.dataset.flowDelay || 0)
        }));
        let frame = 0;
        let enabled = false;
        const update = () => {
            frame = 0;
            let progress = 0;
            let current = 0;
            const phases:number[] = [];
            if (enabled) {
                const distance = Math.max(1,element.offsetHeight-pin.offsetHeight);
                progress = clamp((64-element.getBoundingClientRect().top)/distance);
                current = Math.min(count-1,Math.floor(progress*count));
                panels.forEach((_,index)=>phases.push(clamp(progress*count-index)));
            } else if (stickyCopy && getComputedStyle(stickyCopy).position === "sticky" && !reduced.matches) {
                const start = parseFloat(getComputedStyle(stickyCopy).top);
                const distance = Math.max(1,element.offsetHeight-stickyCopy.offsetHeight);
                progress = clamp((start-element.getBoundingClientRect().top)/distance);
                current = Math.min(count-1,Math.floor(progress*count));
                panels.forEach((_,index)=>phases.push(clamp(progress*count-index)));
            } else {
                let distance = Infinity;
                panels.forEach((panel,index) => {
                    const rect = panel.getBoundingClientRect();
                    const delta = Math.abs(rect.top + Math.min(rect.height,window.innerHeight*.6)/2-window.innerHeight*.5);
                    if (delta<distance) { current=index; distance=delta; }
                    // Tall mobile panels keep drawing while their figure enters view.
                    phases.push(reduced.matches?1:clamp((window.innerHeight*.82-rect.top)/(rect.height+window.innerHeight*.12)));
                });
                progress = (current+(phases[current]||0))/count;
            }
            element.style.setProperty("--scene-progress",String(progress));
            panels.forEach((panel,index)=>panel.style.setProperty("--step-progress",String(phases[index])));
            routes.forEach(({path,marker,length,index,delay})=>{
                const phase = reduced.matches?1:clamp(((phases[index]??1)-delay)/(1-delay));
                path.style.setProperty("--flow-progress",String(phase));
                if(marker) {
                    const point=path.getPointAtLength(length*phase);
                    marker.setAttribute("cx",String(point.x));
                    marker.setAttribute("cy",String(point.y));
                    marker.style.opacity=!reduced.matches && phase>0 && phase<1?".95":"0";
                }
            });
            setActive(current);
        };
        const scroll = () => { if(!frame) frame=requestAnimationFrame(update); };
        const configure = () => {
            // Measure the largest overlaid panel before deciding whether it fits.
            element.dataset.scrollMode = media.matches && canPin ? "pinned" : "flow";
            enabled = media.matches && canPin && pin.offsetHeight <= window.innerHeight-63;
            element.dataset.scrollMode = enabled ? "pinned" : "flow";
            setPinned(enabled);
            update();
        };
        configure();
        // Font metrics can change the measured scene after the first render.
        document.fonts.addEventListener("loadingdone",configure);
        media.addEventListener("change",configure);
        window.addEventListener("resize",configure);
        window.addEventListener("scroll",scroll,{passive:true});
        return () => { document.fonts.removeEventListener("loadingdone",configure);media.removeEventListener("change",configure);window.removeEventListener("resize",configure);window.removeEventListener("scroll",scroll);cancelAnimationFrame(frame); };
    },[count,language,canPin]);
    return {ref,active,pinned,style:{"--scene-length":`${110+count*55}svh`} as CSSProperties};
}

export function ScrollProgress({labels,active,className=""}:{labels:string[];active:number;className?:string}) {
    const de = useLanguage()==="de";
    const ref = useFloatingProgress<HTMLOListElement>();
    return <ol ref={ref} className={`scroll-progress mobile-floating-progress ${className}`} style={{"--step-count":labels.length} as CSSProperties} aria-label={de?"Fortschritt beim Scrollen":"Scroll progress"}>{labels.map((label,index)=><li key={`${index}-${label}`} style={{"--step-index":index} as CSSProperties} aria-current={active===index?"step":undefined} aria-label={`${index+1}: ${label}`}><span className="progress-number">{String(index+1).padStart(2,"0")}</span><span className="progress-label">{label}</span></li>)}</ol>;
}

export function ScrollFade({children,className=""}:{children:ReactNode;className?:string}) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const element=ref.current;
        if(!element)return;
        const media=window.matchMedia("(prefers-reduced-motion: reduce)");
        let frame=0;
        const update=()=>{
            frame=0;
            const progress=media.matches?1:clamp((window.innerHeight*.9-element.getBoundingClientRect().top)/(window.innerHeight*.38));
            element.style.setProperty("--fade-progress",String(progress));
        };
        const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
        update();
        media.addEventListener("change",scroll);
        window.addEventListener("scroll",scroll,{passive:true});
        window.addEventListener("resize",scroll);
        return()=>{media.removeEventListener("change",scroll);window.removeEventListener("scroll",scroll);window.removeEventListener("resize",scroll);cancelAnimationFrame(frame);};
    },[]);
    return <div ref={ref} className={`scroll-fade ${className}`}>{children}</div>;
}

export function ScrollCards({intro,items,outro,id,className=""}:{intro?:ReactNode;items:readonly (readonly string[])[];outro?:ReactNode;id:string;className?:string}) {
    const {ref,active,pinned,style}=useScrollScene(items.length);
    return <section ref={ref} id={id} className={`scroll-scene scroll-cards ${className}`} style={style}>
        <div className="scroll-scene-pin content-width">
            {intro&&<div className="scroll-cards-intro section-intro">{intro}</div>}
            <ScrollProgress labels={items.map(item=>item[1])} active={active}/>
            <div className="capability-row">{items.map(([number,title,body],index)=><div key={number} className="scroll-card" role="group" aria-label={title} data-scroll-step data-revealed={!pinned||index<=active}><ScrollFade><p>{body}</p></ScrollFade></div>)}</div>
            {outro&&<div className="scroll-cards-outro">{outro}</div>}
        </div>
    </section>;
}

export function StickySplit({intro,items,className=""}:{intro:ReactNode;items:readonly (readonly string[])[];className?:string}) {
    const {ref,active,style} = useScrollScene<HTMLDivElement>(items.length,false);
    return <div ref={ref} style={style} className={`sticky-split ${className}`}>
        <div className="sticky-split-copy">{intro}<ScrollProgress labels={items.map(item=>item[0])} active={active} className="scroll-progress-compact"/></div>
        <div className="sticky-split-items">{items.map(([title,body],index)=><div data-scroll-step key={title}><ScrollFade className="sticky-split-item"><span className="small-index">{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{body}</p></ScrollFade></div>)}</div>
    </div>;
}
