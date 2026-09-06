import type { Metadata } from "next";
import { AgentPage } from "@/components/agent-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/agent"
  },
  description:
    "One AI agent across the platform, scheduled background workflows, and the terminal. Explore modes, tools, permissions, and persistent system context.",
  title: "Agent"
};

export default function Page() {
  return <AgentPage />;
}
