"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { SiteLogo } from "@/components/site-logo";
import { ThemeToggle } from "@/components/theme-toggle";

type PageMode = "loading" | "login" | "register" | "authenticated";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<PageMode>("loading");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // Check session and user count on mount
  useEffect(() => {
    async function init() {
      try {
        // Check if already authenticated
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        if (sessionData.authenticated) {
          setMode("authenticated");
          return;
        }

        // Check if users exist by trying to count via register endpoint (we'll use a simpler check)
        setMode("login");
      } catch {
        setMode("login");
      }
    }
    init();
  }, []);

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setSuccessMessage("");

      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Login failed.");
          return;
        }

        setSuccessMessage("Login successful! Redirecting...");
        setTimeout(() => {
          router.push("/admin");
          router.refresh();
        }, 500);
      } catch {
        setError("Network error. Please try again.");
      }
    },
    [loginEmail, loginPassword, router]
  );

  const handleRegister = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setSuccessMessage("");

      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: regName,
            email: regEmail,
            password: regPassword,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Registration failed.");
          return;
        }

        setSuccessMessage("Account created! Redirecting...");
        setTimeout(() => {
          router.push("/admin");
          router.refresh();
        }, 500);
      } catch {
        setError("Network error. Please try again.");
      }
    },
    [regName, regEmail, regPassword, router]
  );

  if (mode === "loading") {
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
            </div>
          </div>
        </header>
        <section className="section auth-section">
          <div className="auth-shell" style={{ justifyContent: "center" }}>
            <p style={{ textAlign: "center", opacity: 0.6 }}>Loading...</p>
          </div>
        </section>
      </main>
    );
  }

  if (mode === "authenticated") {
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
            </div>
          </div>
        </header>
        <section className="section auth-section">
          <div className="auth-shell" style={{ justifyContent: "center" }}>
            <div className="auth-copy animate-rise" style={{ textAlign: "center" }}>
              <p className="eyebrow">Already logged in</p>
              <h1>You are already signed in.</h1>
              <div className="hero-actions" style={{ justifyContent: "center" }}>
                <Link className="button button-primary" href="/admin">
                  Go to Admin Panel
                </Link>
                <Link className="button button-secondary" href="/">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

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
          </div>
        </div>
      </header>

      <section className="section auth-section">
        <div className="auth-shell">
          <div className="auth-copy animate-rise">
            <p className="eyebrow">Admin access</p>
            <h1>Sign in to the administration panel.</h1>
            <p>
              This area is for managing Anomx content and configuration.
            </p>
          </div>

          <div className="auth-form-shell animate-rise delay-1">
            <div className="admin-auth-form">
              {/* Tab switcher */}
              <div className="admin-auth-tabs" role="tablist">
                <button
                  aria-selected={mode === "login"}
                  className="admin-auth-tab"
                  onClick={() => {
                    setMode("login");
                    setError("");
                    setSuccessMessage("");
                  }}
                  role="tab"
                  type="button"
                >
                  Sign In
                </button>
                <button
                  aria-selected={mode === "register"}
                  className="admin-auth-tab"
                  onClick={() => {
                    setMode("register");
                    setError("");
                    setSuccessMessage("");
                  }}
                  role="tab"
                  type="button"
                >
                  Create First Admin
                </button>
              </div>

              {/* Login form */}
              {mode === "login" && (
                <form className="admin-auth-fields" onSubmit={handleLogin}>
                  <label className="admin-auth-label">
                    Email
                    <input
                      className="admin-auth-input"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                    />
                  </label>
                  <label className="admin-auth-label">
                    Password
                    <input
                      className="admin-auth-input"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
                    />
                  </label>

                  {error && <p className="admin-auth-error">{error}</p>}
                  {successMessage && (
                    <p className="admin-auth-success">{successMessage}</p>
                  )}

                  <button className="button button-primary admin-auth-submit" type="submit">
                    Sign In
                  </button>
                </form>
              )}

              {/* Register form */}
              {mode === "register" && (
                <form className="admin-auth-fields" onSubmit={handleRegister}>
                  <p className="admin-auth-hint">
                    No admin account exists yet. Create the first one.
                  </p>
                  <label className="admin-auth-label">
                    Name
                    <input
                      className="admin-auth-input"
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Your name"
                      required
                      autoComplete="name"
                    />
                  </label>
                  <label className="admin-auth-label">
                    Email
                    <input
                      className="admin-auth-input"
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                    />
                  </label>
                  <label className="admin-auth-label">
                    Password
                    <input
                      className="admin-auth-input"
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      required
                      minLength={8}
                      autoComplete="new-password"
                    />
                  </label>

                  {error && <p className="admin-auth-error">{error}</p>}
                  {successMessage && (
                    <p className="admin-auth-success">{successMessage}</p>
                  )}

                  <button className="button button-primary admin-auth-submit" type="submit">
                    Create Account &amp; Sign In
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
