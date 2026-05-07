import type { CardVisualVariant } from "@/lib/home-content";

const visualGroups: Record<CardVisualVariant, "flow" | "matrix" | "network" | "radar" | "stack" | "wave"> = {
  architecture: "stack",
  compute: "matrix",
  connectors: "network",
  control: "flow",
  data: "matrix",
  detect: "wave",
  enterprise: "stack",
  explain: "flow",
  forecast: "wave",
  human: "radar",
  memory: "stack",
  network: "network",
  operations: "flow",
  radar: "radar",
  realtime: "wave",
  research: "network",
  signal: "wave",
  stack: "stack",
  workflow: "flow"
};

type CardVisualProps = {
  variant: CardVisualVariant;
};

function NetworkVisual() {
  return (
    <>
      <path className="visual-line visual-line-soft" d="M46 148 L112 78 L190 118 L270 58 L336 104" />
      <path className="visual-line" d="M64 206 L142 150 L226 176 L312 122" />
      <circle className="visual-node visual-node-primary" cx="46" cy="148" r="13" />
      <circle className="visual-node" cx="112" cy="78" r="10" />
      <circle className="visual-node visual-node-accent" cx="190" cy="118" r="14" />
      <circle className="visual-node" cx="270" cy="58" r="10" />
      <circle className="visual-node visual-node-primary" cx="336" cy="104" r="12" />
      <circle className="visual-node" cx="64" cy="206" r="11" />
      <circle className="visual-node visual-node-accent" cx="142" cy="150" r="9" />
      <circle className="visual-node" cx="226" cy="176" r="12" />
      <circle className="visual-node visual-node-primary" cx="312" cy="122" r="9" />
    </>
  );
}

function WaveVisual() {
  return (
    <>
      <path className="visual-line visual-line-soft" d="M34 162 C84 106 128 212 178 154 S278 94 346 154" />
      <path className="visual-line" d="M34 118 C88 64 128 178 184 116 S278 66 346 108" />
      <path className="visual-line visual-line-accent" d="M34 204 C92 176 116 236 178 202 S282 156 346 184" />
      <rect className="visual-block" x="54" y="70" width="42" height="108" rx="10" />
      <rect className="visual-block visual-block-primary" x="154" y="104" width="42" height="92" rx="10" />
      <rect className="visual-block visual-block-accent" x="260" y="76" width="42" height="126" rx="10" />
    </>
  );
}

function FlowVisual() {
  return (
    <>
      <rect className="visual-card" x="36" y="58" width="92" height="62" rx="16" />
      <rect className="visual-card visual-card-primary" x="154" y="108" width="92" height="62" rx="16" />
      <rect className="visual-card visual-card-accent" x="272" y="158" width="92" height="62" rx="16" />
      <path className="visual-line" d="M128 89 C156 89 128 139 154 139" />
      <path className="visual-line visual-line-accent" d="M246 139 C274 139 246 189 272 189" />
      <circle className="visual-node visual-node-primary" cx="82" cy="89" r="9" />
      <circle className="visual-node" cx="200" cy="139" r="9" />
      <circle className="visual-node visual-node-accent" cx="318" cy="189" r="9" />
    </>
  );
}

function RadarVisual() {
  return (
    <>
      <circle className="visual-ring" cx="200" cy="140" r="92" />
      <circle className="visual-ring" cx="200" cy="140" r="58" />
      <circle className="visual-ring visual-ring-primary" cx="200" cy="140" r="24" />
      <path className="visual-fill" d="M200 140 L286 104 A92 92 0 0 1 266 204 Z" />
      <path className="visual-line" d="M200 48 V232" />
      <path className="visual-line visual-line-soft" d="M108 140 H292" />
      <circle className="visual-node visual-node-accent" cx="266" cy="204" r="12" />
      <circle className="visual-node visual-node-primary" cx="286" cy="104" r="10" />
    </>
  );
}

function MatrixVisual() {
  return (
    <>
      <rect className="visual-card" x="42" y="54" width="74" height="74" rx="16" />
      <rect className="visual-card visual-card-primary" x="132" y="54" width="74" height="74" rx="16" />
      <rect className="visual-card" x="222" y="54" width="74" height="74" rx="16" />
      <rect className="visual-card visual-card-accent" x="84" y="146" width="74" height="74" rx="16" />
      <rect className="visual-card" x="174" y="146" width="74" height="74" rx="16" />
      <rect className="visual-card visual-card-primary" x="264" y="146" width="74" height="74" rx="16" />
      <path className="visual-line visual-line-soft" d="M79 128 V146 M169 128 V146 M259 128 V146" />
    </>
  );
}

function StackVisual() {
  return (
    <>
      <rect className="visual-card" x="58" y="64" width="236" height="54" rx="18" />
      <rect className="visual-card visual-card-primary" x="86" y="112" width="236" height="54" rx="18" />
      <rect className="visual-card visual-card-accent" x="114" y="160" width="236" height="54" rx="18" />
      <path className="visual-line" d="M92 91 H246" />
      <path className="visual-line visual-line-soft" d="M120 139 H274" />
      <path className="visual-line visual-line-accent" d="M148 187 H302" />
    </>
  );
}

export function CardVisual({ variant }: CardVisualProps) {
  const group = visualGroups[variant];

  return (
    <svg
      aria-hidden="true"
      className="card-visual"
      data-variant={variant}
      focusable="false"
      viewBox="0 0 400 280"
    >
      {group === "network" ? <NetworkVisual /> : null}
      {group === "wave" ? <WaveVisual /> : null}
      {group === "flow" ? <FlowVisual /> : null}
      {group === "radar" ? <RadarVisual /> : null}
      {group === "matrix" ? <MatrixVisual /> : null}
      {group === "stack" ? <StackVisual /> : null}
    </svg>
  );
}
