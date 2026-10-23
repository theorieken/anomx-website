import data from "@/lib/generated/package-docs.json";
import type { PackageReference, SearchEntry } from "@/lib/package-docs-types";

// This module is imported only by server components. The full reference never
// becomes a client-side search bundle; only the small symbol index is passed down.
export const packageReference = data as PackageReference;
export const moduleNavigation = packageReference.modules.map(module => ({
  name: module.name, href: module.href, count: module.symbols.length + module.aliases.length,
}));
export const packageSearch: SearchEntry[] = packageReference.modules.flatMap(module => [
  { name: module.name, module: module.name, kind: "module", href: module.href },
  ...module.symbols.flatMap(symbol => [
    { name: symbol.name, module: module.name, kind: symbol.kind, href: `${module.href}#${symbol.name}` },
    ...symbol.members.map(member => ({ name: `${symbol.name}.${member.name}`, module: module.name, kind: member.kind, href: `${module.href}#${symbol.name}.${member.name}` })),
  ]),
  ...module.aliases.map(alias => ({ name: alias.name, module: module.name, kind: "export", href: alias.href || `${module.href}#exports` })),
]);
export function getApiModule(slug: string[]) {
  return packageReference.modules.find(module => module.slug.join("/") === slug.join("/"));
}
export function sourceUrl(source: { path: string; line: number }) {
  return `${packageReference.repository}/blob/${packageReference.revision}/${source.path}#L${source.line}`;
}
