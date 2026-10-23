import type { Metadata } from "next";
import { PackageOverview } from "@/components/docs/package-overview";
import { packageReference } from "@/lib/package-docs";

export const metadata: Metadata = { title: "Anomx Package documentation", description: "Python quick start and generated API reference for Anomx datasets, time series, forecasting models, anomaly detection, metrics, and execution.", alternates: { canonical: "/documentation/package/" } };
export default function Page() {
  return <PackageOverview version={packageReference.version} python={packageReference.python} moduleCount={packageReference.modules.length} extras={Object.keys(packageReference.extras).filter(extra => !["dev", "release", "docs"].includes(extra))} />;
}
