import Link from "next/link";
import { CursorAtmosphere } from "@/components/cursor-atmosphere";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export default function ComingSoonPage() {
  return (
    <main className="page-shell legal-page" id="top">
      <CursorAtmosphere />
      <SiteHeader anchorPrefix="/" />

      <section className="section legal-section">
        <article className="legal-document">
          <h1>Coming Soon</h1>
          <p>
            The Anomx application login is not publicly available yet. This page is a
            placeholder for the future product entry point.
          </p>
          <p>
            Early access is currently handled through the waitlist while the platform is
            prepared for selected enterprise, research, and technical teams.
          </p>
          <Link className="legal-back-link" href="/#early-access">
            Join Waitlist
          </Link>
        </article>

        <SiteFooter anchorPrefix="/" />
      </section>
    </main>
  );
}
