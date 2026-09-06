"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

const navItems: NavItem[] = [
  { href: "/admin", label: "Website", icon: "🌐" },
  { href: "/admin/agent", label: "CLI Agent", icon: "🤖" },
  { href: "/admin/package", label: "Package", icon: "📦" },
  { href: "/admin/documentation", label: "Documentation", icon: "📄" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        if (!data.authenticated) {
          setIsAuthenticated(false);
          router.push("/login");
        } else {
          setIsAuthenticated(true);
          setUserName(data.user?.name || "Admin");
        }
      } catch {
        setIsAuthenticated(false);
        router.push("/login");
      }
    }
    checkSession();
  }, [router]);

  const handleLogout = useCallback(async () => {
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/login");
    router.refresh();
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="admin-shell">
        <p style={{ padding: "2rem", opacity: 0.6 }}>Checking authorization...</p>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return null;
  }

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link className="brand-link" href="/" aria-label="Anomx home">
            <Image
              alt="Anomx"
              className="site-logo-image site-logo-image-for-dark"
              height={30}
              src="/images/logo-light.png"
              width={130}
            />
            <Image
              alt="Anomx"
              className="site-logo-image site-logo-image-for-light"
              height={30}
              src="/images/logo-dark.png"
              width={130}
            />
          </Link>
        </div>

        <nav className="admin-sidebar-nav" aria-label="Admin navigation">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                className={`admin-nav-item${isActive ? " admin-nav-item-active" : ""}`}
                href={item.href}
                key={item.href}
              >
                <span className="admin-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user">
            <span className="admin-user-name">{userName}</span>
          </div>
          <div className="admin-sidebar-actions">
            <ThemeToggle />
            <button className="button button-secondary admin-logout-btn" onClick={handleLogout} type="button">
              Log out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">{children}</main>
    </div>
  );
}
