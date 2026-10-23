export type SourceReference = { path: string; line: number };
export type ApiParameter = { name: string; annotation: string; default: string; kind: string };
export type ApiMember = {
  name: string; kind: string; signature: string; parameters: ApiParameter[];
  returns: string; docstring: string; source: SourceReference; async: boolean;
};
export type ApiSymbol = Omit<ApiMember, "async"> & {
  async?: boolean; members: ApiMember[]; constructorDocstring: string;
  bases: { name: string; href: string | null }[];
  inherited: { name: string; from: string; href: string }[];
};
export type ApiModule = {
  name: string; slug: string[]; href: string; docstring: string; source: SourceReference;
  symbols: ApiSymbol[];
  aliases: { name: string; target: string; href: string | null; summary: string }[];
};
export type PackageReference = {
  schemaVersion: number; version: string; python: string; repository: string;
  revision: string; sourceDigest: string; extras: Record<string, string[]>; modules: ApiModule[];
};
export type SearchEntry = { name: string; module: string; kind: string; href: string };
export type ModuleNavigation = { name: string; href: string; count: number };
