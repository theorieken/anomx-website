import type { Metadata } from "next";
import { PlatformPage } from "@/components/platform-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/platform"
  },
  description:
    "Anomx Platform connects datasets, jobs, findings, workers, and distributed runtime services into one control and intelligence layer.",
  title: "Platform"
};

export default function Page() {
  return <PlatformPage />;
}
