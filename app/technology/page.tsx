import type { Metadata } from "next";
import { TechnologyPage } from "@/components/technology-page";

export const metadata: Metadata = {
    title: "Technology",
    description: "Explore the Anomx architecture: connectors, distributed acquisition and compute, agent runtimes, orchestration, and traceable data storage.",
    alternates: { canonical: "/technology/" }
};
export default function Page() { return <TechnologyPage />; }
