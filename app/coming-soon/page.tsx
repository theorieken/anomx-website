import Link from "next/link";
import type { Metadata } from "next";
import { CursorAtmosphere } from "@/components/cursor-atmosphere";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata: Metadata = {
  alternates: {
    canonical: "/coming-soon"
  },
  description:
    "Anomx is in research with petabyte-scale DESY data and preparing an alpha phase for early customers.",
  title: "Coming Soon"
};

export default function ComingSoonPage() {
  return (
    <main className="page-shell legal-page" id="top">
      <CursorAtmosphere />
      <SiteHeader anchorPrefix="/" />

      <section className="section legal-section">
        <article className="legal-document">
          <h1>Coming Soon</h1>
          <p>
            Anomx is currently in its research phase, working with petabyte-scale data
            from the largest linear particle accelerator on earth at DESY in Hamburg.
          </p>
          <p>
            We are turning that work into a System Intelligence platform for teams that
            operate complex, high-value systems. A first alpha phase for early customers
            is planned soon.
          </p>
          <Link className="legal-back-link" href="/join-waitlist">
            Join the Waitlist
          </Link>
        </article>

        <SiteFooter anchorPrefix="/" />
      </section>
    </main>
  );
}
