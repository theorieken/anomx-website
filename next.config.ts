import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function config(phase: string): NextConfig {
  const nodeServer = phase === PHASE_DEVELOPMENT_SERVER || process.env.ANOMX_NODE_SERVER === "1";
  return {
    output: nodeServer ? undefined : "export",
    // Node-only API and administration routes stay available for local development
    // and optional Node hosting, but cannot be included in a static export.
    pageExtensions: nodeServer ? ["ts", "tsx", "node.ts", "node.tsx"] : ["ts", "tsx"],
    env: { NEXT_PUBLIC_STATIC_EXPORT: nodeServer ? "0" : "1" },
    poweredByHeader: false,
    devIndicators: false,
    images: { unoptimized: true },
    trailingSlash: true
  };
}
