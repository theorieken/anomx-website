"use client";

import Link from "next/link";
import { CopyCommand } from "@/components/experience";
import { useLanguage } from "@/components/language-switcher";

const example = `import numpy as np
from anomx import TimeSeries
from anomx.models import NaiveSeasonal
from anomx.metrics import mae

# A regular, deterministic signal with a 12-step cycle.
series = TimeSeries.from_values(
    np.sin(np.arange(120) * 2 * np.pi / 12)
)
train, test = series.split_before(0.8)

model = NaiveSeasonal(K=12).fit(train)
forecast = model.predict(len(test))
print(mae(test, forecast))`;

export function PackageOverview({ version, python, moduleCount, extras }: { version: string; python: string; moduleCount: number; extras: string[] }) {
  const de = useLanguage() === "de";
  const domains = [
    ["data", "01", de ? "Daten & Zeitreihen" : "Data & time series", "TimeSeries · Dataset · Transforms", de ? "Daten laden, strukturieren und für die Analyse vorbereiten." : "Load, structure, and prepare observations for analysis."],
    ["models", "02", de ? "Modelle" : "Models", "Forecasting · Reconstruction · Representation", de ? "Normales Verhalten lernen, Vorhersagen treffen und Strukturen erkennen." : "Learn normal behavior, forecast values, and discover structure."],
    ["detection", "03", de ? "Anomalieerkennung" : "Anomaly detection", "Scorers · Detectors · Pipelines", de ? "Abweichungen messen und Scores in Entscheidungen umwandeln." : "Measure deviations and turn continuous scores into decisions."],
    ["metrics", "04", de ? "Metriken" : "Metrics", "MAE · RMSE · Classification", de ? "Vorhersagen und Ergebnisse mit reproduzierbaren Metriken bewerten." : "Evaluate forecasts and results with reproducible metrics."],
    ["execution", "05", de ? "Ausführung" : "Execution", "Jobs · Runs · WorkContext", de ? "Lokale Abläufe zusammensetzen und Ergebnisse nachverfolgen." : "Compose local workflows and track their results."],
    ["integrations", "06", de ? "Integrationen" : "Integrations", "Darts · Platform · Workspaces", de ? "Optionale Bibliotheken und externe Datenquellen anbinden." : "Connect optional model libraries and external data sources."],
  ];
  return <div className="api-page-grid"><article className="api-article package-overview">
    <header className="package-overview-header"><p className="kicker">ANOMX PACKAGE</p><h1>{de ? <>Von Daten<br />zu Erkenntnissen.</> : <>From data<br />to understanding.</>}</h1><p className="package-lead">{de ? "Die Python-Bausteine für Zeitreihen, Vorhersagen und Anomalieerkennung. In Ihrem Notebook, Ihrer Pipeline oder Ihrem eigenen System." : "Python building blocks for time series, forecasting, and anomaly detection. In your notebook, your pipeline, or your own system."}</p><div className="package-badges"><span>v{version}</span><span>Python {python}</span><span>Apache 2.0</span><span>{moduleCount} {de ? "Module" : "modules"}</span></div></header>
    <section id="installation" className="package-guide-section"><h2>{de ? "Einfach anfangen." : "Start with a few lines."}</h2><p>{de ? "Installieren Sie Anomx in einer virtuellen Umgebung. Die Basisinstallation enthält die nativen Zeitreihen, Modelle, Scorer und Detektoren." : "Install Anomx in a virtual environment. The core install includes native time series, models, scorers, and detectors."}</p><CopyCommand command={'python3 -m venv .venv\nsource .venv/bin/activate\npython -m pip install --upgrade anomx'} /><p className="package-platform-note">{de ? "Windows: Aktivieren Sie die Umgebung mit .venv\\Scripts\\Activate.ps1 in PowerShell." : "Windows: activate the environment with .venv\\Scripts\\Activate.ps1 in PowerShell."}</p></section>
    <section id="quickstart" className="package-guide-section"><h2>{de ? "Ihre erste Vorhersage." : "Your first forecast."}</h2><p>{de ? "Erstellen Sie eine Zeitreihe, teilen Sie sie chronologisch und bewerten Sie eine saisonale Baseline auf zurückgehaltenen Daten." : "Create a time series, split it chronologically, and evaluate a seasonal baseline on held-out data."}</p><CopyCommand label="Python" command={example} /><div className="package-inline-links"><Link href="/documentation/package/data/timeseries/#TimeSeries">TimeSeries ↗</Link><Link href="/documentation/package/models/forecasting/native/#NaiveSeasonal">NaiveSeasonal ↗</Link><Link href="/documentation/package/metrics/metrics/#mae">mae ↗</Link></div></section>
    <section id="reference" className="package-guide-section"><h2>{de ? "Die API entdecken." : "Explore the API."}</h2><p>{de ? "Von der Datenstruktur bis zur Entscheidung: Die Referenz folgt den Modulen des Pakets." : "From the data container to the final decision, the reference follows the package’s modules."}</p><div className="package-domain-grid">{domains.map(([path, number, title, subtitle, body]) => <Link className="package-domain-card" href={`/documentation/package/${path}/`} key={path}><span className="package-domain-number">{number}<span aria-hidden="true">↗</span></span><h3>{title}</h3><p>{body}</p><small>{subtitle}</small></Link>)}</div></section>
    <section id="extras" className="package-guide-section"><h2>{de ? "Bei Bedarf erweitern." : "Add what you need."}</h2><p>{de ? "Optionale Abhängigkeiten werden als Extras installiert. Darts, Torch und ONNX gehören nicht zur Basisinstallation." : "Install optional dependencies as extras. Darts, Torch, and ONNX are separate from the core install."}</p><CopyCommand command={'python -m pip install "anomx[visualization]"\npython -m pip install "anomx[torch]"\npython -m pip install "anomx[darts]"'} /><div className="package-extra-list">{extras.map(extra => <code key={extra}>anomx[{extra}]</code>)}</div></section>
    <div className="package-reference-note"><span aria-hidden="true">{ }</span><p>{de ? "Die API-Referenz wird aus dem Python-Quellcode erzeugt. Signaturen, Typen, Vererbung und Docstrings entsprechen dem dokumentierten Paketstand. Referenztexte bleiben in der Sprache des Quellcodes." : "The API reference is generated from the Python source. Signatures, types, inheritance, and docstrings reflect the documented package version. Reference text retains the language of the source."}</p></div>
  </article><aside className="api-toc" aria-label={de ? "Auf dieser Seite" : "On this page"}><span>{de ? "AUF DIESER SEITE" : "ON THIS PAGE"}</span>{[["installation", de ? "Installation" : "Installation"], ["quickstart", de ? "Erste Vorhersage" : "First forecast"], ["reference", "API reference"], ["extras", de ? "Optionale Extras" : "Optional extras"]].map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</aside></div>;
}
