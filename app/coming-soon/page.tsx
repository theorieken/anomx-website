import type { Metadata } from "next";
import { AvailabilityPage } from "@/components/availability-page";

export const metadata: Metadata = { title: "Platform Access", alternates: { canonical: "/coming-soon/" }, description: "Anomx Platform is available through early access. Request access for your team or start with the open-source CLI agent." };
export default function Page() { return <AvailabilityPage />; }
