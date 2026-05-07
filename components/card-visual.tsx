import type { CardVisualVariant } from "@/lib/home-content";

type Tone = "accent" | "default" | "primary" | "soft";

type LineSpec = {
  d: string;
  tone?: Tone;
};

type CircleSpec = {
  cx: number;
  cy: number;
  r: number;
  tone?: Tone;
};

type RectSpec = {
  height: number;
  rx?: number;
  tone?: Tone;
  width: number;
  x: number;
  y: number;
};

type FillSpec = {
  d: string;
  tone?: Tone;
};

type VisualSpec = {
  circles?: CircleSpec[];
  fills?: FillSpec[];
  lines?: LineSpec[];
  rects?: RectSpec[];
  rings?: CircleSpec[];
};

type CardVisualProps = {
  variant: CardVisualVariant;
};

const visualSpecs: Record<CardVisualVariant, VisualSpec> = {
  "abnormal-detection": {
    circles: [
      { cx: 284, cy: 104, r: 10, tone: "primary" },
      { cx: 268, cy: 198, r: 13, tone: "accent" }
    ],
    fills: [{ d: "M200 140 L284 104 A91 91 0 0 1 268 198 Z", tone: "primary" }],
    lines: [
      { d: "M200 48 V232", tone: "primary" },
      { d: "M108 140 H292", tone: "soft" }
    ],
    rings: [
      { cx: 200, cy: 140, r: 88, tone: "soft" },
      { cx: 200, cy: 140, r: 56, tone: "soft" },
      { cx: 200, cy: 140, r: 24, tone: "primary" }
    ]
  },
  "changed-context": {
    circles: [
      { cx: 86, cy: 86, r: 8, tone: "primary" },
      { cx: 198, cy: 142, r: 8 },
      { cx: 314, cy: 196, r: 8, tone: "accent" }
    ],
    lines: [
      { d: "M116 86 C152 86 136 142 166 142", tone: "primary" },
      { d: "M230 142 C266 142 252 196 282 196", tone: "accent" }
    ],
    rects: [
      { x: 44, y: 58, width: 84, height: 56, rx: 14 },
      { x: 166, y: 114, width: 86, height: 56, rx: 14, tone: "primary" },
      { x: 282, y: 168, width: 76, height: 56, rx: 14, tone: "accent" }
    ]
  },
  "connect-sources": {
    circles: [
      { cx: 54, cy: 158, r: 10, tone: "primary" },
      { cx: 116, cy: 86, r: 8 },
      { cx: 188, cy: 126, r: 11, tone: "accent" },
      { cx: 272, cy: 70, r: 8 },
      { cx: 334, cy: 116, r: 10, tone: "primary" },
      { cx: 76, cy: 214, r: 8 },
      { cx: 154, cy: 160, r: 8, tone: "accent" },
      { cx: 232, cy: 188, r: 9 },
      { cx: 314, cy: 136, r: 8, tone: "primary" }
    ],
    lines: [
      { d: "M54 158 L116 86 L188 126 L272 70 L334 116", tone: "soft" },
      { d: "M76 214 L154 160 L232 188 L314 136", tone: "primary" }
    ]
  },
  "data-agnostic": {
    lines: [
      { d: "M92 126 V146 M170 126 V146 M248 126 V146", tone: "soft" },
      { d: "M120 184 H280", tone: "primary" }
    ],
    rects: [
      { x: 54, y: 62, width: 76, height: 60, rx: 14 },
      { x: 142, y: 62, width: 76, height: 60, rx: 14, tone: "primary" },
      { x: 230, y: 62, width: 76, height: 60, rx: 14 },
      { x: 92, y: 150, width: 60, height: 52, rx: 12, tone: "accent" },
      { x: 170, y: 150, width: 60, height: 52, rx: 12 },
      { x: 248, y: 150, width: 60, height: 52, rx: 12, tone: "primary" }
    ]
  },
  "data-enterprise": {
    circles: [
      { cx: 88, cy: 112, r: 7, tone: "primary" },
      { cx: 154, cy: 112, r: 7 },
      { cx: 220, cy: 112, r: 7, tone: "accent" },
      { cx: 286, cy: 112, r: 7 }
    ],
    lines: [
      { d: "M88 112 H286", tone: "soft" },
      { d: "M112 166 H264", tone: "primary" },
      { d: "M140 206 H236", tone: "accent" }
    ],
    rects: [
      { x: 54, y: 80, width: 268, height: 64, rx: 18 },
      { x: 92, y: 148, width: 196, height: 44, rx: 14, tone: "primary" },
      { x: 120, y: 194, width: 140, height: 36, rx: 12, tone: "accent" }
    ]
  },
  "detect-change": {
    circles: [
      { cx: 92, cy: 188, r: 7 },
      { cx: 176, cy: 152, r: 8, tone: "primary" },
      { cx: 268, cy: 120, r: 8, tone: "accent" }
    ],
    fills: [{ d: "M176 152 C210 94 250 98 286 128 L286 206 C238 174 210 166 176 152 Z", tone: "primary" }],
    lines: [
      { d: "M48 184 C88 138 126 208 176 152 S262 86 334 142", tone: "primary" },
      { d: "M48 218 C92 188 130 228 178 202 S276 160 334 184", tone: "accent" },
      { d: "M48 148 C90 108 128 172 174 136 S266 94 334 132", tone: "soft" }
    ],
    rects: [
      { x: 72, y: 78, width: 38, height: 92, rx: 10 },
      { x: 164, y: 108, width: 42, height: 88, rx: 10, tone: "primary" },
      { x: 262, y: 82, width: 42, height: 124, rx: 10, tone: "accent" }
    ]
  },
  "edge-compute": {
    circles: [
      { cx: 104, cy: 190, r: 8, tone: "primary" },
      { cx: 200, cy: 92, r: 8 },
      { cx: 296, cy: 190, r: 8, tone: "accent" }
    ],
    lines: [
      { d: "M104 166 V190 H296 V166", tone: "soft" },
      { d: "M200 120 V150", tone: "primary" }
    ],
    rects: [
      { x: 68, y: 120, width: 72, height: 48, rx: 12, tone: "primary" },
      { x: 154, y: 64, width: 92, height: 58, rx: 16 },
      { x: 260, y: 120, width: 72, height: 48, rx: 12, tone: "accent" },
      { x: 144, y: 150, width: 112, height: 46, rx: 12, tone: "primary" }
    ]
  },
  "energy-infrastructure": {
    circles: [
      { cx: 88, cy: 92, r: 9, tone: "primary" },
      { cx: 200, cy: 140, r: 10, tone: "accent" },
      { cx: 312, cy: 92, r: 9, tone: "primary" },
      { cx: 120, cy: 210, r: 8 },
      { cx: 280, cy: 210, r: 8 }
    ],
    lines: [
      { d: "M88 92 L200 140 L312 92", tone: "primary" },
      { d: "M200 140 L120 210 M200 140 L280 210", tone: "soft" },
      { d: "M178 118 L204 86 L196 126 L224 120 L188 194", tone: "accent" }
    ]
  },
  "enterprise-foundation": {
    lines: [
      { d: "M92 92 H282", tone: "primary" },
      { d: "M118 140 H308", tone: "soft" },
      { d: "M146 188 H322", tone: "accent" }
    ],
    rects: [
      { x: 62, y: 62, width: 250, height: 54, rx: 16 },
      { x: 90, y: 112, width: 250, height: 54, rx: 16, tone: "primary" },
      { x: 118, y: 162, width: 218, height: 54, rx: 16, tone: "accent" }
    ]
  },
  "explain-signal": {
    circles: [
      { cx: 90, cy: 88, r: 8, tone: "primary" },
      { cx: 210, cy: 140, r: 8 },
      { cx: 320, cy: 192, r: 8, tone: "accent" }
    ],
    lines: [
      { d: "M122 88 C150 88 130 140 158 140", tone: "primary" },
      { d: "M254 140 C286 140 268 192 296 192", tone: "accent" },
      { d: "M88 226 H304", tone: "soft" }
    ],
    rects: [
      { x: 48, y: 60, width: 84, height: 56, rx: 14 },
      { x: 158, y: 112, width: 96, height: 56, rx: 14, tone: "primary" },
      { x: 296, y: 164, width: 70, height: 56, rx: 14, tone: "accent" }
    ]
  },
  "explainable-findings": {
    circles: [
      { cx: 114, cy: 88, r: 8, tone: "primary" },
      { cx: 202, cy: 146, r: 7 },
      { cx: 290, cy: 198, r: 8, tone: "accent" }
    ],
    lines: [
      { d: "M114 118 V168 C114 192 140 200 166 190", tone: "soft" },
      { d: "M174 146 H242", tone: "primary" },
      { d: "M246 174 L290 198", tone: "accent" }
    ],
    rects: [
      { x: 72, y: 58, width: 84, height: 60, rx: 14 },
      { x: 158, y: 118, width: 88, height: 56, rx: 14, tone: "primary" },
      { x: 246, y: 174, width: 88, height: 48, rx: 14, tone: "accent" }
    ]
  },
  "focused-start": {
    circles: [
      { cx: 200, cy: 140, r: 10, tone: "primary" },
      { cx: 278, cy: 98, r: 8, tone: "accent" }
    ],
    fills: [{ d: "M200 140 L278 98 A88 88 0 0 1 286 174 Z", tone: "primary" }],
    lines: [
      { d: "M200 56 V224", tone: "primary" },
      { d: "M116 140 H284", tone: "soft" },
      { d: "M150 196 L250 84", tone: "accent" }
    ],
    rings: [
      { cx: 200, cy: 140, r: 82, tone: "soft" },
      { cx: 200, cy: 140, r: 44, tone: "primary" }
    ]
  },
  "guide-step": {
    circles: [
      { cx: 86, cy: 178, r: 8 },
      { cx: 192, cy: 120, r: 8, tone: "primary" },
      { cx: 300, cy: 82, r: 8, tone: "accent" }
    ],
    lines: [
      { d: "M72 178 C124 178 132 120 176 120 S250 82 300 82", tone: "primary" },
      { d: "M288 70 L304 82 L288 94", tone: "accent" },
      { d: "M94 214 H288", tone: "soft" }
    ],
    rects: [
      { x: 52, y: 154, width: 68, height: 48, rx: 12 },
      { x: 158, y: 96, width: 68, height: 48, rx: 12, tone: "primary" },
      { x: 274, y: 58, width: 68, height: 48, rx: 12, tone: "accent" }
    ]
  },
  "high-dimensional": {
    circles: [
      { cx: 84, cy: 84, r: 6 },
      { cx: 156, cy: 84, r: 6, tone: "primary" },
      { cx: 228, cy: 84, r: 6 },
      { cx: 300, cy: 84, r: 6, tone: "accent" },
      { cx: 84, cy: 184, r: 6, tone: "primary" },
      { cx: 156, cy: 184, r: 6 },
      { cx: 228, cy: 184, r: 6, tone: "accent" },
      { cx: 300, cy: 184, r: 6 }
    ],
    lines: [
      { d: "M84 84 C136 130 188 34 228 84 S276 140 300 84", tone: "primary" },
      { d: "M84 184 C138 142 184 238 228 184 S278 128 300 184", tone: "accent" },
      { d: "M156 84 V184 M228 84 V184", tone: "soft" }
    ]
  },
  "human-control": {
    circles: [
      { cx: 200, cy: 116, r: 24, tone: "primary" },
      { cx: 118, cy: 184, r: 10 },
      { cx: 282, cy: 184, r: 10, tone: "accent" }
    ],
    lines: [
      { d: "M200 140 V196", tone: "primary" },
      { d: "M158 178 C178 198 222 198 242 178", tone: "soft" },
      { d: "M118 184 H282", tone: "accent" }
    ],
    rings: [{ cx: 200, cy: 140, r: 88, tone: "soft" }]
  },
  "industrial-ops": {
    circles: [
      { cx: 112, cy: 184, r: 8, tone: "primary" },
      { cx: 204, cy: 184, r: 8 },
      { cx: 296, cy: 184, r: 8, tone: "accent" }
    ],
    lines: [
      { d: "M74 150 H326", tone: "soft" },
      { d: "M112 134 V184 M204 112 V184 M296 136 V184", tone: "primary" }
    ],
    rects: [
      { x: 72, y: 86, width: 80, height: 48, rx: 12 },
      { x: 164, y: 64, width: 80, height: 48, rx: 12, tone: "primary" },
      { x: 256, y: 88, width: 80, height: 48, rx: 12, tone: "accent" }
    ]
  },
  "modular-connectors": {
    circles: [
      { cx: 96, cy: 100, r: 7, tone: "primary" },
      { cx: 200, cy: 140, r: 7 },
      { cx: 304, cy: 180, r: 7, tone: "accent" }
    ],
    lines: [
      { d: "M128 100 H154 C176 100 166 140 188 140", tone: "primary" },
      { d: "M212 140 C236 140 226 180 250 180 H272", tone: "accent" }
    ],
    rects: [
      { x: 54, y: 76, width: 74, height: 48, rx: 12 },
      { x: 188, y: 116, width: 74, height: 48, rx: 12, tone: "primary" },
      { x: 272, y: 156, width: 74, height: 48, rx: 12, tone: "accent" }
    ]
  },
  "operational-memory": {
    lines: [
      { d: "M94 82 H284", tone: "primary" },
      { d: "M94 132 H250", tone: "soft" },
      { d: "M94 182 H304", tone: "accent" }
    ],
    rects: [
      { x: 64, y: 58, width: 252, height: 48, rx: 14 },
      { x: 64, y: 108, width: 204, height: 48, rx: 14, tone: "primary" },
      { x: 64, y: 158, width: 270, height: 48, rx: 14, tone: "accent" }
    ]
  },
  "operational-pain": {
    circles: [
      { cx: 100, cy: 100, r: 8, tone: "accent" },
      { cx: 198, cy: 172, r: 8, tone: "primary" },
      { cx: 304, cy: 92, r: 8, tone: "accent" }
    ],
    lines: [
      { d: "M54 196 C108 82 140 244 198 172 S270 54 346 118", tone: "accent" },
      { d: "M54 136 C116 88 146 176 198 140 S278 104 346 142", tone: "soft" }
    ],
    rects: [
      { x: 78, y: 80, width: 44, height: 94, rx: 12 },
      { x: 282, y: 76, width: 44, height: 116, rx: 12, tone: "accent" }
    ]
  },
  "operator-workspace": {
    circles: [
      { cx: 110, cy: 196, r: 7, tone: "primary" },
      { cx: 202, cy: 196, r: 7 },
      { cx: 294, cy: 196, r: 7, tone: "accent" }
    ],
    lines: [
      { d: "M82 116 H318", tone: "primary" },
      { d: "M112 156 H286", tone: "soft" },
      { d: "M98 196 H306", tone: "accent" }
    ],
    rects: [
      { x: 62, y: 86, width: 276, height: 112, rx: 18 },
      { x: 82, y: 132, width: 92, height: 40, rx: 12, tone: "primary" },
      { x: 202, y: 132, width: 96, height: 40, rx: 12, tone: "accent" }
    ]
  },
  "predict-next": {
    fills: [{ d: "M208 128 C238 102 276 102 328 132 L328 206 C276 174 238 168 208 188 Z", tone: "primary" }],
    lines: [
      { d: "M42 168 C92 112 128 202 178 150 S278 84 350 136", tone: "primary" },
      { d: "M42 204 C96 174 124 230 180 202 S280 160 350 184", tone: "accent" },
      { d: "M42 132 C90 96 130 166 178 130 S278 94 350 124", tone: "soft" }
    ],
    rects: [
      { x: 80, y: 78, width: 38, height: 98, rx: 10 },
      { x: 174, y: 116, width: 42, height: 84, rx: 10, tone: "primary" },
      { x: 284, y: 84, width: 42, height: 122, rx: 10, tone: "accent" }
    ]
  },
  "realtime-design": {
    circles: [
      { cx: 114, cy: 178, r: 7, tone: "primary" },
      { cx: 214, cy: 130, r: 7 },
      { cx: 306, cy: 94, r: 7, tone: "accent" }
    ],
    lines: [
      { d: "M48 170 C92 116 136 218 188 152 S278 66 348 112", tone: "primary" },
      { d: "M48 206 C98 166 134 238 188 204 S284 168 348 186", tone: "accent" },
      { d: "M48 134 C94 100 132 172 188 134 S284 96 348 128", tone: "soft" }
    ],
    rects: [
      { x: 74, y: 90, width: 38, height: 92, rx: 10 },
      { x: 190, y: 104, width: 42, height: 86, rx: 10, tone: "primary" },
      { x: 286, y: 82, width: 42, height: 112, rx: 10, tone: "accent" }
    ]
  },
  "repeatable-workflows": {
    circles: [
      { cx: 108, cy: 94, r: 7, tone: "primary" },
      { cx: 206, cy: 144, r: 7 },
      { cx: 302, cy: 194, r: 7, tone: "accent" }
    ],
    lines: [
      { d: "M132 94 H154 C176 94 166 144 188 144 H206", tone: "primary" },
      { d: "M230 144 H250 C272 144 260 194 284 194 H302", tone: "accent" },
      { d: "M118 214 H302", tone: "soft" }
    ],
    rects: [
      { x: 64, y: 68, width: 78, height: 52, rx: 12 },
      { x: 176, y: 118, width: 78, height: 52, rx: 12, tone: "primary" },
      { x: 284, y: 168, width: 78, height: 52, rx: 12, tone: "accent" }
    ]
  },
  "research-facilities": {
    circles: [
      { cx: 78, cy: 140, r: 9, tone: "primary" },
      { cx: 200, cy: 140, r: 16 },
      { cx: 322, cy: 140, r: 9, tone: "accent" }
    ],
    lines: [
      { d: "M78 140 H322", tone: "primary" },
      { d: "M200 62 V218", tone: "soft" },
      { d: "M112 92 C166 126 234 126 288 92", tone: "accent" },
      { d: "M112 188 C166 154 234 154 288 188", tone: "soft" }
    ],
    rings: [{ cx: 200, cy: 140, r: 58, tone: "primary" }]
  },
  "technical-depth": {
    lines: [
      { d: "M92 90 H308", tone: "primary" },
      { d: "M92 142 H308", tone: "soft" },
      { d: "M92 194 H308", tone: "accent" }
    ],
    rects: [
      { x: 58, y: 64, width: 70, height: 52, rx: 12 },
      { x: 156, y: 64, width: 70, height: 52, rx: 12, tone: "primary" },
      { x: 254, y: 64, width: 70, height: 52, rx: 12 },
      { x: 108, y: 168, width: 184, height: 52, rx: 14, tone: "accent" }
    ]
  }
};

function lineClass(tone: Tone = "primary") {
  return `visual-line${tone === "soft" ? " visual-line-soft" : ""}${tone === "accent" ? " visual-line-accent" : ""}`;
}

function shapeClass(base: "visual-block" | "visual-card" | "visual-node" | "visual-ring", tone: Tone = "default") {
  return `${base}${tone === "primary" ? ` ${base}-primary` : ""}${tone === "accent" ? ` ${base}-accent` : ""}${tone === "soft" ? ` ${base}-soft` : ""}`;
}

function fillClass(tone: Tone = "primary") {
  return `visual-fill${tone === "accent" ? " visual-fill-accent" : ""}${tone === "soft" ? " visual-fill-soft" : ""}`;
}

export function CardVisual({ variant }: CardVisualProps) {
  const spec = visualSpecs[variant];

  return (
    <svg
      aria-hidden="true"
      className="card-visual"
      data-variant={variant}
      focusable="false"
      shapeRendering="geometricPrecision"
      viewBox="0 0 400 280"
    >
      {spec.fills?.map((fill) => (
        <path className={fillClass(fill.tone)} d={fill.d} key={fill.d} />
      ))}
      {spec.rings?.map((ring) => (
        <circle
          className={shapeClass("visual-ring", ring.tone)}
          cx={ring.cx}
          cy={ring.cy}
          key={`${ring.cx}-${ring.cy}-${ring.r}`}
          r={ring.r}
        />
      ))}
      {spec.lines?.map((line) => (
        <path className={lineClass(line.tone)} d={line.d} key={line.d} />
      ))}
      {spec.rects?.map((rect) => (
        <rect
          className={shapeClass("visual-card", rect.tone)}
          height={rect.height}
          key={`${rect.x}-${rect.y}-${rect.width}-${rect.height}`}
          rx={rect.rx ?? 12}
          width={rect.width}
          x={rect.x}
          y={rect.y}
        />
      ))}
      {spec.circles?.map((circle) => (
        <circle
          className={shapeClass("visual-node", circle.tone)}
          cx={circle.cx}
          cy={circle.cy}
          key={`${circle.cx}-${circle.cy}-${circle.r}`}
          r={circle.r}
        />
      ))}
    </svg>
  );
}
