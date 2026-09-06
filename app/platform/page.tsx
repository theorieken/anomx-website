import type { Metadata } from "next";
import { PlatformPage } from "@/components/platform-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/platform"
  },
  description:
    "Background AI agents connect data, models, machines, and infrastructure. Investigate anomalies and enable autonomous workflows with defined permissions and budgets.",
  title: "Platform"
};

export default function Page() {
  return <PlatformPage />;
}
