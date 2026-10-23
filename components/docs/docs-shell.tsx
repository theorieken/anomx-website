"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Experience } from "@/components/experience";
import { useLanguage } from "@/components/language-switcher";

export function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const de = useLanguage() === "de";
  const active = pathname.startsWith("/documentation/package") ? "package" : pathname.startsWith("/documentation/system") ? "system" : "agent";
  const products = [
    { id: "agent", href: "/documentation/", label: "Anomx Agent", detail: "CLI & workflows", icon: ">_" },
    { id: "package", href: "/documentation/package/", label: "Anomx Package", detail: "Python API", icon: "{ }" },
    { id: "system", href: "/documentation/system/", label: "Anomx System", detail: de ? "Demnächst" : "Coming soon", icon: "⊞" },
  ];
  return <Experience className="docs-experience">
    <div className="documentation-header docs-width">
      <Link href="/documentation/" className="documentation-label">{de ? "Dokumentation" : "Documentation"}<span aria-hidden="true"> / </span><span>{active === "agent" ? "Agent" : active === "package" ? "Package" : "System"}</span></Link>
      <nav className="documentation-products" aria-label={de ? "Dokumentation auswählen" : "Choose documentation"}>
        {products.map(product => <Link key={product.id} href={product.href} aria-current={active === product.id ? "page" : undefined}>
          <span className="documentation-product-icon" aria-hidden="true">{product.icon}</span>
          <span><strong>{product.label}</strong><small>{product.detail}</small></span>
          <span className="documentation-product-arrow" aria-hidden="true">↗</span>
        </Link>)}
      </nav>
    </div>
    {children}
  </Experience>;
}
