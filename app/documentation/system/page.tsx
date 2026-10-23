import type { Metadata } from "next";
import { SystemDocumentation } from "@/components/docs/system-documentation";

export const metadata: Metadata = { title: "Anomx System documentation", description: "Coming soon: practical guides and video walkthroughs for connecting data, running jobs, and working with agents and apps in Anomx System.", alternates: { canonical: "/documentation/system/" } };
export default function Page() { return <SystemDocumentation />; }
