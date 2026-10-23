import { Fragment, type ReactNode } from "react";
import { packageReference } from "@/lib/package-docs";

const symbols = new Map<string, string>();
for (const moduleEntry of packageReference.modules) {
  for (const symbol of moduleEntry.symbols) {
    symbols.set(`${moduleEntry.name}.${symbol.name}`, `${moduleEntry.href}#${symbol.name}`);
    if (!symbols.has(symbol.name)) symbols.set(symbol.name, `${moduleEntry.href}#${symbol.name}`);
    for (const member of symbol.members) {
      symbols.set(`${moduleEntry.name}.${symbol.name}.${member.name}`, `${moduleEntry.href}#${symbol.name}.${member.name}`);
      symbols.set(`${symbol.name}.${member.name}`, `${moduleEntry.href}#${symbol.name}.${member.name}`);
    }
  }
  for (const alias of moduleEntry.aliases) {
    if (alias.href) symbols.set(`${moduleEntry.name}.${alias.name}`, alias.href);
  }
}

function Inline({ text }: { text: string }) {
  const pattern = /(?::[\w:]+:)?`{1,2}([^`]+)`{1,2}(?:__?)?|\*\*([^*]+)\*\*/g;
  const parts: ReactNode[] = [];
  let previous = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    parts.push(text.slice(previous, index));
    if (match[2]) parts.push(<strong key={index}>{match[2]}</strong>);
    else {
      const reference = match[1].replace(/^~/, "");
      const named = reference.match(/^(.+?)\s+<([^>]+)>$/);
      const label = named ? named[1] : reference;
      const target = named ? named[2] : reference;
      const external = /^https?:\/\//.test(target);
      const href = external ? target : symbols.get(target.replace(/\(\)$/, ""));
      parts.push(href ? <a key={index} href={href}>{external ? label : <code>{label}</code>}</a> : <code key={index}>{label}</code>);
    }
    previous = index + match[0].length;
  }
  parts.push(text.slice(previous));
  return <>{parts}</>;
}

const headings = /^(Parameters|Args|Arguments|Keyword Args|Keyword Arguments|Returns|Yields|Raises|Attributes|Examples?|Notes?|Warnings?|References|See Also|Other Parameters)(:)?$/i;
function sections(text: string) {
  const result: { title: string; lines: string[] }[] = [{ title: "", lines: [] }];
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const title = lines[i].trim();
    const underlined = /^[-=]{3,}$/.test(lines[i + 1]?.trim() ?? "");
    if ((headings.test(title) && title.endsWith(":")) || (underlined && title.length > 0)) {
      result.push({ title: title.replace(/:$/, ""), lines: [] });
      if (underlined) i++;
    } else result[result.length - 1].lines.push(lines[i]);
  }
  return result;
}

function Prose({ lines }: { lines: string[] }) {
  // Preserve indentation: it distinguishes Python examples from paragraphs.
  const cleaned = [...lines];
  while (cleaned.length && !cleaned[0].trim()) cleaned.shift();
  while (cleaned.length && !cleaned[cleaned.length - 1].trim()) cleaned.pop();
  const blocks = cleaned.join("\n").split(/\n\s*\n/).filter(Boolean);
  return <>{blocks.map((block, index) => {
    if (block.split("\n").every(line => !line.trim() || /^\s*\.\.(?:\s+(?:highlight|code-block)::.*)?\s*$/.test(line))) return null;
    if (/^\s*(>>>|\.\. (code-block|math)::)/m.test(block) || block.split("\n").every(line => !line.trim() || /^ {4}/.test(line))) {
      const code = block.replace(/^\s*\.\. (?:code-block|highlight)::[^\n]*\n?/gm, "").replace(/^\s*\.\.\s*$/gm, "");
      const indent = Math.min(...code.split("\n").filter(line => line.trim()).map(line => line.length - line.trimStart().length));
      return <pre className="api-example" key={index}><code>{code.split("\n").map(line => line.slice(indent)).join("\n").trimEnd()}</code></pre>;
    }
    if (/^[-*] /.test(block)) return <ul key={index}>{block.split(/\n(?=[-*] )/).map((line, i) => <li key={i}><Inline text={line.replace(/^[-*] /, "").replace(/\n\s*/g, " ")} /></li>)}</ul>;
    return <p key={index}><Inline text={block.replace(/\n\s*/g, " ")} /></p>;
  })}</>;
}

function Definitions({ lines }: { lines: string[] }) {
  const nonempty = lines.filter(line => line.trim());
  const indent = Math.min(...nonempty.map(line => line.length - line.trimStart().length));
  const entries: { term: string; lines: string[] }[] = [];
  for (const line of lines) {
    if (!line.trim()) { if (entries.length) entries[entries.length - 1].lines.push(""); continue; }
    if (line.length - line.trimStart().length === indent) {
      const match = line.trim().match(/^([\w*,. ()\[\]|]+):\s+(.+)$/);
      // Google-style entries put descriptions on the same line; NumPy entries
      // use `name : type` and put descriptions in the indented block below.
      if (match && !line.includes(" : ")) entries.push({ term: match[1], lines: [match[2]] });
      else entries.push({ term: line.trim(), lines: [] });
    } else if (entries.length) entries[entries.length - 1].lines.push(line.slice(indent + 4));
  }
  return <dl className="api-definitions">{entries.map((entry, index) => <div key={index}><dt><Inline text={entry.term} /></dt><dd><Prose lines={entry.lines} /></dd></div>)}</dl>;
}

export function Docstring({ text }: { text: string }) {
  if (!text) return null;
  return <div className="api-docstring">{sections(text).map((section, index) => <Fragment key={index}>
    {section.title && <h4>{section.title}</h4>}
    {/^(Parameters|Args|Arguments|Keyword|Other Parameters|Attributes|Raises|Returns|Yields)/i.test(section.title)
      ? <Definitions lines={section.lines} /> : <Prose lines={section.lines} />}
  </Fragment>)}</div>;
}
