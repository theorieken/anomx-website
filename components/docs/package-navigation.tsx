"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import { useLanguage } from "@/components/language-switcher";
import type { ModuleNavigation, SearchEntry } from "@/lib/package-docs-types";

const groups = [
  ["data", "Data & processing", "Daten & Verarbeitung"],
  ["models", "Models", "Modelle"],
  ["detection", "Anomaly detection", "Anomalieerkennung"],
  ["metrics", "Metrics", "Metriken"],
  ["execution", "Execution", "Ausführung"],
  ["base", "Base contracts", "Basisklassen"],
  ["integrations", "Integrations", "Integrationen"],
  ["config", "Configuration", "Konfiguration"],
];

export function PackageNavigation({ modules, entries, version }: { modules: ModuleNavigation[]; entries: SearchEntry[]; version: string }) {
  const de = useLanguage() === "de";
  const pathname = usePathname().replace(/\/$/, "");
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/);
    if (!query.trim()) return [];
    return entries.filter(entry => terms.every(term => `${entry.name} ${entry.module}`.toLowerCase().includes(term)))
      .sort((a, b) => Number(b.name.toLowerCase() === query.toLowerCase().trim()) - Number(a.name.toLowerCase() === query.toLowerCase().trim()) || a.name.length - b.name.length);
  }, [entries, query]);
  const close = () => { setQuery(""); setMobileOpen(false); };
  const moduleLink = (module: ModuleNavigation, label: string) => <Link key={module.name} href={module.href} onClick={close} aria-current={module.href.replace(/\/$/, "") === pathname ? "page" : undefined}><span>{label}</span></Link>;
  const tree = (prefix: string): ReactNode => modules.filter(module => module.name.startsWith(`${prefix}.`) && module.name.split(".").length === prefix.split(".").length + 1).map(module => {
    const children = modules.some(item => item.name.startsWith(`${module.name}.`));
    if (!children) return moduleLink(module, module.name.split(".").at(-1)!);
    return <details className="package-submodules" key={`${module.name}-${pathname}`} open={pathname.startsWith(module.href.replace(/\/$/, ""))}>
      <summary>{module.name.split(".").at(-1)}</summary><div>{moduleLink(module, de ? "Überblick" : "Overview")}{tree(module.name)}</div>
    </details>;
  });
  return <aside className="package-sidebar">
    <div className="package-sidebar-heading"><span>PYTHON API <span className="package-version">v{version}</span></span>
      <button className="package-mobile-toggle" type="button" aria-expanded={mobileOpen} aria-controls="package-navigation" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? (de ? "Schließen" : "Close") : (de ? "Module" : "Browse")} <span aria-hidden="true">{mobileOpen ? "−" : "+"}</span></button>
    </div>
    <div className="package-search">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg>
      <input type="search" aria-label={de ? "Python-API durchsuchen" : "Search Python API"} placeholder={de ? "API durchsuchen…" : "Search the API…"} value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === "Escape") { setQuery(""); setMobileOpen(false); } }} />
    </div>
    {query.trim() ? <div className="package-search-results">
      <p role="status">{results.length} {de ? "Ergebnisse" : "results"}{results.length > 60 ? (de ? " · erste 60" : " · first 60") : ""}</p>
      {results.length ? results.slice(0, 60).map(result => <Link key={`${result.module}-${result.name}-${result.kind}`} href={result.href} onClick={close}><strong>{result.name}</strong><small>{result.module} · {result.kind}</small></Link>) : <p>{de ? "Versuchen Sie einen Modul- oder Methodennamen." : "Try a module, class, or method name."}</p>}
    </div> : <nav id="package-navigation" className="package-navigation" data-open={mobileOpen} aria-label={de ? "Paketmodule" : "Package modules"}>
      <Link href="/documentation/package/" onClick={close} aria-current={pathname === "/documentation/package" ? "page" : undefined}>{de ? "Überblick & Schnellstart" : "Overview & quick start"}</Link>
      <Link href="/documentation/package/api/" onClick={close} aria-current={pathname === "/documentation/package/api" ? "page" : undefined}>{de ? "Öffentliche Exporte" : "Public exports"}<code>anomx</code></Link>
      {groups.map(([key, en, german]) => {
        const items = modules.filter(module => module.name === `anomx.${key}` || module.name.startsWith(`anomx.${key}.`));
        const root = items.find(module => module.name === `anomx.${key}`);
        return <details key={`${key}-${pathname}`} open={items.some(module => module.href.replace(/\/$/, "") === pathname)}>
          <summary>{de ? german : en}<span>{items.length}</span></summary>
          <div>{root && moduleLink(root, de ? "Überblick" : "Overview")}{tree(`anomx.${key}`)}</div>
        </details>;
      })}
    </nav>}
    <a className="package-source-link" href="https://github.com/theorieken/anomx">GitHub <span aria-hidden="true">↗</span></a>
  </aside>;
}
