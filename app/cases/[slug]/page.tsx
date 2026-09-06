import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetailPage } from "@/components/cases-page";
import { cases } from "@/lib/cases-content";

export const dynamicParams = false;
export function generateStaticParams() { return cases.map(({slug})=>({slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> {
    const {slug}=await params;
    const item=cases.find(entry=>entry.slug===slug);
    if(!item) return {};
    return {title:item.en.name,description:item.en.summary,alternates:{canonical:`/cases/${slug}/`},openGraph:{title:item.en.name,description:item.en.summary,url:`/cases/${slug}/`,images:[{url:item.kind==="alpha"?"/media/xfel-intelligence.webp":"/media/platform-intelligence.webp",width:1600,height:900}]}};
}
export default async function Page({params}:{params:Promise<{slug:string}>}) {
    const {slug}=await params;
    const item=cases.find(entry=>entry.slug===slug);
    if(!item) notFound();
    return <CaseDetailPage item={item}/>;
}
