import Link from "next/link";
import { Docstring } from "@/components/docs/docstring";
import { ReferenceAnchors } from "@/components/docs/reference-anchors";
import { packageReference, sourceUrl } from "@/lib/package-docs";
import type { ApiModule, ApiParameter, ApiSymbol } from "@/lib/package-docs-types";

function Parameters({ parameters }: { parameters: ApiParameter[] }) {
  if (!parameters.length) return null;
  return <div className="api-parameter-table"><table><caption>Signature parameters</caption><thead><tr><th>Parameter</th><th>Type</th><th>Default</th></tr></thead><tbody>
    {parameters.map(param => <tr key={param.name}><td><code>{param.name}</code>{param.kind === "keyword-only" && <small>keyword only</small>}{param.kind === "positional-only" && <small>positional only</small>}</td><td><code>{param.annotation || "—"}</code></td><td><code>{param.default || (param.kind === "variadic" ? "—" : "required")}</code></td></tr>)}
  </tbody></table></div>;
}

function SymbolReference({ symbol }: { symbol: ApiSymbol }) {
  return <section id={symbol.name} className="api-symbol">
    <div className="api-symbol-heading"><span className="api-kind">{symbol.kind}</span><a href={sourceUrl(symbol.source)} target="_blank" rel="noreferrer">View source ↗</a></div>
    <h2><a href={`#${symbol.name}`}>{symbol.name}</a></h2>
    <pre className="api-signature"><code>{symbol.async ? "async " : ""}{symbol.signature}</code></pre>
    {symbol.bases.length > 0 && <p className="api-bases">Bases: {symbol.bases.map((base, index) => <span key={index}>{index ? ", " : ""}{base.href ? <Link href={base.href}><code>{base.name}</code></Link> : <code>{base.name}</code>}</span>)}</p>}
    <Docstring text={symbol.docstring} />
    <Parameters parameters={symbol.parameters} />
    {symbol.constructorDocstring && symbol.constructorDocstring !== symbol.docstring && <Docstring text={symbol.constructorDocstring} />}
    {symbol.returns && <p className="api-returns">Returns <code>{symbol.returns}</code></p>}
    {symbol.members.length > 0 && <div className="api-members"><h3>Members</h3>{symbol.members.map(member => <details className="api-member" id={`${symbol.name}.${member.name}`} key={member.name}>
      <summary><span><code>{member.name}</code><small>{member.kind}</small></span><span aria-hidden="true">+</span></summary>
      <div className="api-member-body"><div className="api-member-actions"><a href={`#${symbol.name}.${member.name}`}># {symbol.name}.{member.name}</a><a href={sourceUrl(member.source)} target="_blank" rel="noreferrer">Source ↗</a></div>
        <pre className="api-signature"><code>{member.async ? "async " : ""}{member.signature}</code></pre>
        <Docstring text={member.docstring} />
        <Parameters parameters={member.parameters} />
        {member.returns && <p className="api-returns">Returns <code>{member.returns}</code></p>}
      </div>
    </details>)}</div>}
    {symbol.inherited.length > 0 && <div className="api-inherited"><h3>Inherited members</h3><div>{symbol.inherited.map(member => <Link key={member.name} href={member.href} title={`Inherited from ${member.from}`}><code>{member.name}</code><small>{member.from}</small></Link>)}</div></div>}
  </section>;
}

export function ApiReference({ module }: { module: ApiModule }) {
  const title = module.name.split(".").at(-1)!;
  return <div className="api-page-grid"><article className="api-article">
    <ReferenceAnchors />
    <nav className="api-breadcrumbs" aria-label="Breadcrumb"><Link href="/documentation/package/">Package</Link><span>/</span><span>API reference</span></nav>
    <header className="api-page-header"><p className="kicker">MODULE REFERENCE</p><h1>{title}</h1><code className="api-module-path">{module.name}</code><Docstring text={module.docstring} /></header>
    {module.aliases.length > 0 && <section id="exports" className="api-exports"><h2>Public exports</h2><p>Import these names directly from <code>{module.name}</code>.</p><div>{module.aliases.map(alias => <div className="api-export" key={alias.name}>
      <div>{alias.href ? <Link href={alias.href}><code>{alias.name}</code><span aria-hidden="true">↗</span></Link> : <code>{alias.name}</code>}
      {alias.summary && <p>{alias.summary}</p>}</div>
      {!alias.href && <small>External API · {alias.target}</small>}
    </div>)}</div></section>}
    {module.symbols.map(symbol => <SymbolReference key={symbol.name} symbol={symbol} />)}
    {!module.symbols.length && !module.aliases.length && <p className="api-empty">Explore this namespace using the module navigation.</p>}
    <footer className="api-page-footer"><span>Generated from Python signatures and docstrings.</span><a href={sourceUrl(module.source)} target="_blank" rel="noreferrer">Module source ↗</a><a href={`${packageReference.repository}/blob/${packageReference.revision}/THIRD_PARTY_NOTICES.md`} target="_blank" rel="noreferrer">Third-party notices ↗</a></footer>
  </article><aside className="api-toc" aria-label="On this page"><span>ON THIS PAGE</span>
    {module.aliases.length > 0 && <a href="#exports">Public exports <small>{module.aliases.length}</small></a>}
    {module.symbols.map(symbol => symbol.members.length ? <details key={symbol.name}><summary><a href={`#${symbol.name}`}>{symbol.name}</a></summary><div>{symbol.members.map(member => <a key={member.name} href={`#${symbol.name}.${member.name}`}>{member.name}</a>)}</div></details> : <a key={symbol.name} href={`#${symbol.name}`}>{symbol.name}</a>)}
    <a className="api-back-top" href="#main-content">Back to top ↑</a>
  </aside></div>;
}
