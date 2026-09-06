import type { Metadata } from "next";
import { EarlyAccessPage } from "@/components/early-access-page";

export const metadata: Metadata = { title: "Early Access", alternates: { canonical: "/early-access/" }, robots: { index: false, follow: true } };
export default function RegisterPage() { return <EarlyAccessPage />; }
