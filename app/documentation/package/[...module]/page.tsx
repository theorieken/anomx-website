import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApiReference } from "@/components/docs/api-reference";
import { getApiModule, packageReference } from "@/lib/package-docs";

export const dynamicParams = false;
export function generateStaticParams() {
  return packageReference.modules.map(module => ({ module: module.slug }));
}
type Props = { params: Promise<{ module: string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const apiModule = getApiModule((await params).module);
  if (!apiModule) return {};
  return { title: `${apiModule.name} — Python API`, description: (apiModule.docstring || `Classes, functions, signatures, and source documentation for ${apiModule.name}.`).slice(0, 160), alternates: { canonical: apiModule.href } };
}
export default async function Page({ params }: Props) {
  const apiModule = getApiModule((await params).module);
  if (!apiModule) notFound();
  return <ApiReference module={apiModule} />;
}
