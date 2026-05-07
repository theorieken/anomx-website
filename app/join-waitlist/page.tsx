import type { Metadata } from "next";
import { JoinWaitlistPage } from "@/components/join-waitlist-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/join-waitlist"
  },
  description:
    "Join the Anomx waitlist for early access to System Intelligence for complex operational systems.",
  title: "Join the Waitlist"
};

export default function Page() {
  return <JoinWaitlistPage />;
}
