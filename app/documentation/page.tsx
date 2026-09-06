import type { Metadata } from "next";
import { DocumentationPage } from "@/components/documentation-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/documentation"
  },
  description:
    "Install the Anomx CLI agent, configure model providers, choose execution modes, connect your platform, and understand scheduled background agents.",
  title: "Documentation"
};

export default function Page() {
  return <DocumentationPage />;
}
