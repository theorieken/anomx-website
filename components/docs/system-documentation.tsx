"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-switcher";

export function SystemDocumentation() {
  const de = useLanguage() === "de";
  return <section className="system-documentation docs-width"><div className="system-docs-copy"><p className="kicker">ANOMX SYSTEM</p><span className="system-docs-status"><span />{de ? "Demnächst" : "Coming soon"}</span><h1>{de ? <>Ihr System.<br />Schritt für Schritt.</> : <>Your system.<br />Step by step.</>}</h1><p>{de ? "Hier entstehen praktische Anleitungen und Video-Walkthroughs für Anomx System. Vom ersten verbundenen Datenstrom bis zu gemeinsamen Workflows mit Agenten und Apps." : "Practical guides and video walkthroughs for Anomx System are on their way. From connecting your first data stream to working with agents and apps as a team."}</p><div className="system-docs-links"><Link className="pill pill-secondary" href="/technology">{de ? "System entdecken" : "Explore the system"}<span aria-hidden="true">↗</span></Link><Link className="text-link" href="/documentation/package/">{de ? "Python-Dokumentation" : "Python documentation"} →</Link></div></div>
    <div className="system-docs-preview"><div className="system-docs-video" aria-hidden="true"><div className="system-docs-video-grid" /><span className="system-docs-play">▷</span><div><span>ANOMX SYSTEM</span><span>WALKTHROUGHS</span></div></div><div className="system-docs-upcoming"><p>{de ? "Geplante Anleitungen" : "Planned guides"}</p>{(de ? ["Datenquellen verbinden", "Jobs und Modelle ausführen", "Mit Agenten & Apps arbeiten"] : ["Connect your data sources", "Run jobs and models", "Work with agents & apps"]).map((label, index) => <div key={label}><span>0{index + 1}</span><strong>{label}</strong><small>{de ? "Geplant" : "Planned"}</small></div>)}</div></div>
  </section>;
}
