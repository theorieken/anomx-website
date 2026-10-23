"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Native details keep long APIs scannable. Search and direct links reveal the
// referenced member before scrolling, including after client-side navigation.
export function ReferenceAnchors() {
  const pathname = usePathname();
  useEffect(() => {
    let frame = 0;
    const reveal = (hash: string) => {
      let id: string;
      try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      for (let element: HTMLElement | null = target; element; element = element.parentElement) {
        if (element instanceof HTMLDetailsElement) element.open = true;
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => target.scrollIntoView({ behavior: "instant", block: "start" }));
    };
    const hashchange = () => reveal(window.location.hash);
    const click = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest("a") : null;
      if (anchor && anchor.hash && anchor.origin === window.location.origin && anchor.pathname === window.location.pathname) {
        // Next's same-page pushState may not fire hashchange. Use the clicked
        // destination immediately, before Next performs its own anchor scroll.
        reveal(anchor.hash);
      }
    };
    hashchange();
    window.addEventListener("hashchange", hashchange);
    document.addEventListener("click", click);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("hashchange", hashchange); document.removeEventListener("click", click); };
  }, [pathname]);
  return null;
}
