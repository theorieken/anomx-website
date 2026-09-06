"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-switcher";
import { Experience } from "@/components/experience";
import { WaitlistForm } from "@/components/waitlist-form";

export function EarlyAccessPage() {
    const de = useLanguage() === "de";
    const copy = de ? {
        company: "Organisation", companyPlaceholder: "Ihre Organisation", email: "Geschäftliche E-Mail", emailPlaceholder: "sie@organisation.de", error: "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an hello@anomx.io.", fullName: "Name", fullNamePlaceholder: "Ihr Name", pending: "Wird gesendet …", success: "Vielen Dank. Ihre Anfrage ist angekommen. Wir melden uns bei Ihnen.", useCase: "Ihr System (optional)", useCasePlaceholder: "Was betreiben Sie — und was möchten Sie besser verstehen?", website: "Website"
    } : {
        company: "Organization", companyPlaceholder: "Your organization", email: "Work email", emailPlaceholder: "you@organization.com", error: "We couldn’t send your request. Please try again or email hello@anomx.io.", fullName: "Name", fullNamePlaceholder: "Your name", pending: "Sending…", success: "Thank you. Your request is in. We’ll be in touch.", useCase: "Your system (optional)", useCasePlaceholder: "What do you operate — and what would you like to understand better?", website: "Website"
    };
    return <Experience><section className="access-layout content-width"><div><p className="kicker">EARLY ACCESS</p><h1>{de ? <>Die Zukunft<br />wartet nicht.<br /><span className="gradient-text">Ihr System auch nicht.</span></> : <>The future<br />won’t wait.<br /><span className="gradient-text">Neither should<br />your system.</span></>}</h1><p className="section-lead">{de ? "Wir entwickeln Anomx mit Teams, die komplexe Maschinen, Daten und Infrastruktur betreiben. Gestalten Sie die nächste Generation intelligenter Systeme mit." : "We’re building Anomx with teams operating complex machines, data, and infrastructure. Help shape the next generation of intelligent systems."}</p><ul className="access-benefits">{(de ? ["Hintergrundagenten für Ihren Anwendungsfall", "Wissenschaftlich fundierte Anomalieerkennung", "Direkter Austausch mit dem Gründerteam"] : ["Background agents for your use case", "Scientifically grounded anomaly detection", "Direct collaboration with the founding team"]).map(item => <li key={item}>{item}</li>)}</ul><a className="text-link" href="mailto:hello@anomx.io">hello@anomx.io <span aria-hidden="true">↗</span></a></div><div className="access-panel"><h2>{de ? "Lernen wir Ihr System kennen." : "Let’s meet your system."}</h2><WaitlistForm buttonLabel={de ? "Early Access anfragen" : "Request early access"} copy={copy} /><p className="form-privacy">{de ? "Ihre Angaben verwenden wir, um Ihre Anfrage zu beantworten. Mehr dazu in unserer " : "We use these details to respond to your request. Learn more in our "}<Link href="/datenschutzerklaerung">{de ? "Datenschutzerklärung" : "privacy policy"}</Link>.</p></div></section></Experience>;
}
