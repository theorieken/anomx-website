import type { Metadata } from "next";
import { AgentPage } from "@/components/agent-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/agent"
  },
  description:
    "Install `anomx` and run the Anomx CLI agent for anomaly detection, data analysis, and platform-connected edge workflows.",
  title: "Agent"
};

export default function Page() {
  return <AgentPage />;
}
