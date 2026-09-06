"use client";
import Link from "next/link";
import { useLanguage } from "@/components/language-switcher";
import { Experience, Arrow } from "@/components/experience";
export function AvailabilityPage() {
    const de = useLanguage() === "de";
    return <Experience><section className="product-hero content-width" style={{minHeight:"65vh"}}><p className="kicker">ANOMX PLATFORM</p><h1>{de ? <>Die nächste Ära.<br /><span className="gradient-text">Beginnt mit Ihnen.</span></> : <>The next era.<br /><span className="gradient-text">Starts with you.</span></>}</h1><p>{de ? "Öffentliche Registrierung ist noch nicht verfügbar. Fragen Sie Early Access für Ihr Team an. Wenn Sie bereits Zugang haben, nutzen Sie die Adresse Ihrer Anomx-Instanz." : "Public registration is not open yet. Request early access for your team. If you already have access, use your organization’s Anomx instance address."}</p><div className="hero-links"><Link href="/early-access" className="pill pill-primary">{de ? "Early Access anfragen" : "Request early access"}<Arrow /></Link><Link href="/agent" className="text-link">{de ? "Mit dem CLI-Agenten starten" : "Start with the CLI agent"}<Arrow /></Link></div></section></Experience>;
}
