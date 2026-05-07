import Link from "next/link";
import { SiteLogo } from "@/components/site-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { WaitlistForm } from "@/components/waitlist-form";

export default function RegisterPage() {
  return (
    <main className="page-shell auth-page">
      <div className="page-aura page-aura-left" aria-hidden="true" />
      <div className="page-aura page-aura-right" aria-hidden="true" />

      <header className="site-header animate-rise">
        <div className="site-header-inner">
          <Link className="brand-link" href="/" aria-label="Anomx home">
            <SiteLogo kind="header" />
          </Link>

          <div className="header-actions">
            <ThemeToggle />
            <Link className="button button-secondary" href="/login">
              Login
            </Link>
            <Link className="button button-secondary" href="/">
              Back home
            </Link>
          </div>
        </div>
      </header>

      <section className="section auth-section">
        <div className="auth-shell auth-shell-register">
          <div className="auth-copy animate-rise">
            <p className="eyebrow">Private beta registration</p>
            <h1>Public sign-up is not open yet, but early access requests are.</h1>
            <p>
              Share who you are and what you want to use Anomx for. The current
              registration flow is a waitlist request that routes to Theo for review.
            </p>

            <div className="hero-actions">
              <Link className="button button-secondary" href="/">
                Explore the platform
              </Link>
            </div>
          </div>

          <div className="auth-form-shell animate-rise delay-1">
            <WaitlistForm buttonLabel="Request beta access" />
          </div>
        </div>
      </section>
    </main>
  );
}
