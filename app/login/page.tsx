import Image from "next/image";
import Link from "next/link";
import { SiteLogo } from "@/components/site-logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
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
            <Link className="button button-secondary" href="/">
              Back home
            </Link>
            <Link className="button button-primary" href="/register">
              Register
            </Link>
          </div>
        </div>
      </header>

      <section className="section auth-section">
        <div className="auth-shell">
          <div className="auth-copy animate-rise">
            <p className="eyebrow">Private access</p>
            <h1>Customer login will connect here when the application endpoint is ready.</h1>
            <p>
              This marketing site now exposes the entry point, but the actual auth flow
              still needs to be connected to your product infrastructure. Until then,
              request access through the beta registration flow.
            </p>

            <div className="hero-actions">
              <Link className="button button-primary" href="/register">
                Request access
              </Link>
              <Link className="button button-secondary" href="/">
                Explore the site
              </Link>
            </div>
          </div>

          <div className="auth-visual animate-rise delay-1">
            <div className="auth-visual-shell">
              <Image
                src="/images/auth-bg.webp"
                alt=""
                fill
                priority
                className="auth-background-image"
              />
              <div className="auth-visual-overlay" aria-hidden="true" />
              <div className="auth-visual-card">
                <span className="stack-label">Ready for integration</span>
                <h2>Theme-aware auth surfaces already fit the brand system.</h2>
                <p>
                  Use this route as the future hand-off to your hosted auth provider or
                  internal application gateway.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
