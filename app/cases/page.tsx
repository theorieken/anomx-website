import type { Metadata } from "next";
import { CasesPage } from "@/components/cases-page";
export const metadata: Metadata = { title:"Cases", description:"Explore Anomx's alpha integration at European XFEL / DESY and application concepts for machine intelligence and connected infrastructure.", alternates:{canonical:"/cases/"} };
export default function Page() { return <CasesPage/>; }
