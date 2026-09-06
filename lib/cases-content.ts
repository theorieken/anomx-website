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
    },
    {
        slug: "machine-health", kind: "concept", visual: "machine",
        en: {
            name: "Machine intelligence", category: "APPLICATION CONCEPT", title: "Every machine has a story. Learn to read it.",
            summary: "A possible workflow for understanding temperature, vibration and operating context together.",
            challenge: "A threshold can tell you that a value is high. It rarely tells you whether a machine changed its operating mode, a sensor drifted or several small deviations are connected.",
            approach: "Anomx can provide the building blocks for a workflow that relates channels to equipment, compares observations with learned behavior and gives an agent the evidence to investigate. This is an illustrative application concept, not a deployed customer case.",
            steps: [["Connect the machine.", "Bind available sensor channels to the equipment and its operating context."], ["Learn its behavior.", "Choose suitable forecasting, reconstruction or feature-space models for the data."], ["Investigate together.", "Use findings and related channels to prepare an inspectable recommendation for an engineer."]]
        },
        de: {
            name: "Maschinenintelligenz", category: "ANWENDUNGSKONZEPT", title: "Jede Maschine erzählt. Lernen wir zuzuhören.",
            summary: "Ein möglicher Workflow, der Temperatur, Schwingung und Betriebskontext gemeinsam verständlich macht.",
            challenge: "Ein Grenzwert zeigt, dass ein Wert hoch ist. Er erklärt selten, ob sich der Betriebsmodus geändert hat, ein Sensor driftet oder mehrere kleine Abweichungen zusammenhängen.",
            approach: "Anomx kann die Bausteine für einen Workflow liefern, der Kanäle mit Anlagen verbindet, Beobachtungen mit gelerntem Verhalten vergleicht und einem Agenten Belege zur Untersuchung gibt. Dies ist ein beispielhaftes Anwendungskonzept, kein eingesetztes Kundensystem.",
            steps: [["Die Maschine verbinden.", "Verfügbare Sensorkanäle mit der Anlage und ihrem Betriebskontext verknüpfen."], ["Ihr Verhalten lernen.", "Passende Forecasting-, Rekonstruktions- oder Merkmalsraummodelle für die Daten auswählen."], ["Gemeinsam untersuchen.", "Findings und verbundene Kanäle nutzen, um eine prüfbare Empfehlung für Fachleute vorzubereiten."]]
        }
    },
    {
        slug: "distributed-infrastructure", kind: "concept", visual: "infrastructure",
        en: {
            name: "Connected infrastructure", category: "APPLICATION CONCEPT", title: "Many moving parts. One shared understanding.",
            summary: "An application concept for connecting service health, analysis jobs and distributed compute in one operational context.",
            challenge: "Work spreads across nodes, services, queues and storage. A failed job is often a symptom; its explanation can live elsewhere in the system.",
            approach: "Anomx brings nodes, runtime services, jobs and findings into a shared model. A background agent can inspect the available context and propose a next step. This is a workflow concept, not a claim of autonomous production operations.",
            steps: [["Map the environment.", "Connect available node and service information with jobs and data resources."], ["Follow the context.", "Review runs, service state and related artifacts to investigate a change."], ["Prepare the next step.", "Create recommendations or explicitly permitted platform-object updates, with run history and budgets."]]
        },
        de: {
            name: "Verbundene Infrastruktur", category: "ANWENDUNGSKONZEPT", title: "Viele bewegliche Teile. Ein gemeinsames Verständnis.",
            summary: "Ein Anwendungskonzept, das Servicezustand, Analysejobs und verteilte Rechenleistung in einem gemeinsamen Kontext verbindet.",
            challenge: "Arbeit verteilt sich über Nodes, Services, Queues und Speicher. Ein fehlgeschlagener Job ist oft ein Symptom; seine Erklärung liegt möglicherweise an anderer Stelle im System.",
            approach: "Anomx verbindet Nodes, Runtime-Services, Jobs und Findings in einem gemeinsamen Modell. Ein Hintergrundagent kann verfügbaren Kontext untersuchen und nächste Schritte vorschlagen. Dies ist ein Workflow-Konzept, kein Versprechen autonomer Produktionssteuerung.",
            steps: [["Die Umgebung abbilden.", "Verfügbare Node- und Serviceinformationen mit Jobs und Datenressourcen verbinden."], ["Dem Kontext folgen.", "Runs, Servicezustand und zugehörige Artefakte gemeinsam prüfen, um eine Veränderung zu untersuchen."], ["Nächste Schritte vorbereiten.", "Empfehlungen oder explizit erlaubte Plattformänderungen erstellen — mit Run-Verlauf und Budgets."]]
        }
    }
];
