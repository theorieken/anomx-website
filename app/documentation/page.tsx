import type { Metadata } from "next";
import { DocumentationPage } from "@/components/documentation-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/documentation"
  },
  description:
    "Documentation for the Anomx Platform, the Anomx CLI agent, and the evolving Anomx Python package.",
  title: "Documentation"
};

export default function Page() {
  return <DocumentationPage />;
}
