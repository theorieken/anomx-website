export type CaseLocale = "en" | "de";
export type CaseContent = {
    slug: string;
    kind: "alpha" | "concept";
    visual: "xfel" | "machine" | "infrastructure";
    en: { name: string; category: string; title: string; summary: string; challenge: string; approach: string; steps: [string, string][] };
    de: { name: string; category: string; title: string; summary: string; challenge: string; approach: string; steps: [string, string][] };
};

export const cases: CaseContent[] = [
    {
        slug: "european-xfel", kind: "alpha", visual: "xfel",
        en: {
            name: "European XFEL / DESY", category: "RESEARCH INFRASTRUCTURE",
            title: "A new sense for a remarkable machine.",
            summary: "Building an intelligence layer for the DOOCS control environment: from autonomous metadata discovery to the next generation of acquisition and anomaly analysis.",
            challenge: "An accelerator is a system of systems. Its signals describe magnets, RF, vacuum, cooling and much more. Finding a property is only the beginning. Understanding what it means, where it belongs and how it relates to other signals is the real challenge.",
            approach: "Our alpha work at DESY starts with discovery. Background agents aggregate available property metadata and use names, descriptions and related information to infer candidate systems and their hierarchy. The aim is a living system map that gets more useful with each investigation, with its assumptions available for review.",
            steps: [
                ["Discover the property space.", "Explore DOOCS facilities, devices, locations and properties. Collect available metadata and turn disconnected identifiers into searchable context."],
                ["Infer the system behind the signal.", "Background agents connect descriptions and naming patterns to candidate systems and relationships. Inferred mappings remain inspectable and can be corrected."],
                ["Acquire what matters.", "The next step is a staged DAQ rollout. Dedicated workers support ZeroMQ subscriptions and RPC reads, configurable sampling and batched transfer for selected channels."],
                ["Learn behavior. Investigate change.", "Connect acquired data to forecasting, reconstruction and representation-based analysis. The goal is evidence-backed findings and agent-led investigations, with people setting the scope."]
            ]
        },
        de: {
            name: "European XFEL / DESY", category: "FORSCHUNGSINFRASTRUKTUR",
            title: "Ein neuer Sinn für eine besondere Maschine.",
            summary: "Wir entwickeln eine Intelligenzschicht für die DOOCS-Kontrollumgebung: von autonomer Metadaten-Discovery bis zur nächsten Generation von Datenerfassung und Anomalieanalyse.",
            challenge: "Ein Beschleuniger ist ein System aus Systemen. Seine Signale beschreiben Magnete, HF, Vakuum, Kühlung und vieles mehr. Eine Property zu finden, ist erst der Anfang. Zu verstehen, was sie bedeutet, wohin sie gehört und wie sie mit anderen Signalen zusammenhängt, ist die eigentliche Aufgabe.",
            approach: "Unsere Alpha-Arbeit bei DESY beginnt mit Discovery. Hintergrundagenten aggregieren verfügbare Property-Metadaten und leiten aus Namen, Beschreibungen und weiteren Informationen mögliche Systeme und deren Hierarchie ab. So soll eine lebendige Systemkarte entstehen, die mit jeder Untersuchung nützlicher wird und deren Annahmen überprüfbar bleiben.",
            steps: [
                ["Den Property-Raum entdecken.", "Facilities, Devices, Locations und Properties in DOOCS erkunden. Verfügbare Metadaten sammeln und aus einzelnen Kennungen durchsuchbaren Kontext aufbauen."],
                ["Das System hinter dem Signal erkennen.", "Hintergrundagenten verknüpfen Beschreibungen und Namensmuster zu möglichen Systemen und Beziehungen. Abgeleitete Zuordnungen bleiben prüfbar und korrigierbar."],
                ["Erfassen, was zählt.", "Als Nächstes ist ein schrittweiser DAQ-Start geplant. Dedizierte Worker unterstützen ZeroMQ-Abonnements und RPC-Lesezugriffe, konfigurierbare Abtastraten und gebündelte Übertragung ausgewählter Kanäle."],
                ["Verhalten lernen. Veränderungen untersuchen.", "Erfasste Daten mit Forecasting, Reconstruction und Representation verbinden. Das Ziel sind belegbare Findings und agentengestützte Untersuchungen — in einem von Menschen festgelegten Rahmen."]
            ]
        }
    }
];
