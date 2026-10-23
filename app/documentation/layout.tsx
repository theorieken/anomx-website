import type { ReactNode } from "react";
import { DocsShell } from "@/components/docs/docs-shell";
import "./documentation.css";

export default function DocumentationLayout({ children }: { children: ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
