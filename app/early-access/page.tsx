import type { Metadata } from "next";
import { EarlyAccessPage } from "@/components/early-access-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/early-access"
  },
  description:
    "Request early access to Anomx Platform and the Anomx CLI agent for complex operational and anomaly-intelligence workflows.",
  title: "Early Access"
};

export default function Page() {
  return <EarlyAccessPage />;
}
