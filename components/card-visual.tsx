"use client";

import type { CardVisualVariant } from "@/lib/home-content";
import { ScrollScene } from "@/components/scroll-scene";

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

type MotionProfile = "control" | "explain" | "flow" | "network" | "signal";

const visualSpecs: Record<CardVisualVariant, VisualSpec> = {
  "abnormal-detection": {
    circles: [
      { cx: 272, cy: 92, r: 8, tone: "accent" },
      { cx: 318, cy: 150, r: 7, tone: "primary" }
    ],
    lines: [
      { d: "M42 166 C88 118 126 214 176 148 S276 82 348 126", tone: "soft" },
      { d: "M42 180 C88 132 126 222 176 166 S276 84 348 110", tone: "primary" },
      { d: "M42 194 C90 154 124 240 178 194 S278 150 348 176", tone: "accent" }
    ],
    rects: [{ x: 286, y: 70, width: 56, height: 28, rx: 14, tone: "primary" }],
    rings: [{ cx: 272, cy: 92, r: 18, tone: "soft" }]
  },
  "changed-context": {
    circles: [{ cx: 80, cy: 140, r: 8, tone: "primary" }, { cx: 314, cy: 145, r: 7, tone: "accent" }],
    lines: [
      { d: "M118 140 H154 C172 140 166 91 184 91", tone: "soft" },
      { d: "M118 140 H154 C172 140 166 140 184 140", tone: "primary" },
      { d: "M118 140 H154 C172 140 166 189 184 189", tone: "soft" },
      { d: "M268 140 H278", tone: "accent" }
    ],
    rects: [
      { x: 44, y: 116, width: 74, height: 48, rx: 14, tone: "primary" },
      { x: 184, y: 74, width: 84, height: 34, rx: 14 },
      { x: 184, y: 123, width: 84, height: 34, rx: 14 },
      { x: 184, y: 172, width: 84, height: 34, rx: 14 },
      { x: 278, y: 121, width: 74, height: 48, rx: 16, tone: "accent" }
    ]
  },
  "connect-sources": {
    circles: [{ cx: 357, cy: 140, r: 8, tone: "accent" }],
    lines: [
      { d: "M124 68 H168", tone: "soft" },
      { d: "M124 108 H168", tone: "soft" },
      { d: "M124 148 H168", tone: "soft" },
      { d: "M124 188 H168", tone: "soft" },
      { d: "M174 68 V212", tone: "primary" },
      { d: "M186 140 H244", tone: "primary" },
      { d: "M326 140 H350", tone: "accent" }
    ],
    rects: [
      { x: 50, y: 54, width: 74, height: 28, rx: 14 },
      { x: 50, y: 94, width: 74, height: 28, rx: 14 },
      { x: 50, y: 134, width: 74, height: 28, rx: 14 },
      { x: 50, y: 174, width: 74, height: 28, rx: 14 },
      { x: 168, y: 62, width: 12, height: 156, rx: 6, tone: "primary" },
      { x: 244, y: 94, width: 82, height: 92, rx: 20, tone: "primary" },
      { x: 350, y: 120, width: 14, height: 40, rx: 7, tone: "accent" }
    ]
  },
  "data-agnostic": {
    lines: [
      { d: "M120 72 H158", tone: "soft" },
      { d: "M120 112 H158", tone: "soft" },
      { d: "M120 152 H158", tone: "soft" },
      { d: "M120 192 H158", tone: "soft" },
      { d: "M164 72 V204", tone: "primary" },
      { d: "M176 140 H226", tone: "primary" }
    ],
    rects: [
      { x: 50, y: 58, width: 70, height: 28, rx: 14 },
      { x: 50, y: 98, width: 70, height: 28, rx: 14 },
      { x: 50, y: 138, width: 70, height: 28, rx: 14 },
      { x: 50, y: 178, width: 70, height: 28, rx: 14 },
      { x: 158, y: 64, width: 12, height: 148, rx: 6, tone: "primary" },
      { x: 226, y: 88, width: 112, height: 108, rx: 22, tone: "primary" },
      { x: 246, y: 112, width: 34, height: 20, rx: 10 },
      { x: 286, y: 112, width: 34, height: 20, rx: 10 },
      { x: 246, y: 144, width: 42, height: 20, rx: 10 },
      { x: 294, y: 144, width: 26, height: 20, rx: 10, tone: "accent" }
    ]
  },
  "data-enterprise": {
    circles: [{ cx: 226, cy: 140, r: 7, tone: "primary" }],
    lines: [
      { d: "M114 72 H160", tone: "soft" },
      { d: "M114 104 H160", tone: "soft" },
      { d: "M114 136 H160", tone: "soft" },
      { d: "M114 168 H160", tone: "soft" },
      { d: "M114 200 H160", tone: "soft" },
      { d: "M166 72 V208", tone: "primary" },
      { d: "M178 140 H226", tone: "primary" }
    ],
    rects: [
      { x: 50, y: 58, width: 64, height: 20, rx: 10 },
      { x: 50, y: 90, width: 64, height: 20, rx: 10 },
      { x: 50, y: 122, width: 64, height: 20, rx: 10 },
      { x: 50, y: 154, width: 64, height: 20, rx: 10 },
      { x: 50, y: 186, width: 64, height: 20, rx: 10 },
      { x: 160, y: 66, width: 12, height: 148, rx: 6, tone: "primary" },
      { x: 226, y: 82, width: 114, height: 116, rx: 22, tone: "primary" },
      { x: 246, y: 104, width: 74, height: 36, rx: 16 },
      { x: 246, y: 150, width: 34, height: 18, rx: 9, tone: "primary" },
      { x: 286, y: 150, width: 34, height: 18, rx: 9, tone: "accent" }
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
    circles: [{ cx: 88, cy: 140, r: 7, tone: "primary" }, { cx: 312, cy: 140, r: 7, tone: "accent" }],
    lines: [
      { d: "M130 140 H168", tone: "primary" },
      { d: "M240 92 H270", tone: "accent" },
      { d: "M240 140 H270", tone: "primary" },
      { d: "M240 188 H270", tone: "accent" }
    ],
    rects: [
      { x: 44, y: 102, width: 86, height: 76, rx: 18, tone: "primary" },
      { x: 168, y: 74, width: 72, height: 36, rx: 14 },
      { x: 168, y: 122, width: 72, height: 36, rx: 14 },
      { x: 168, y: 170, width: 72, height: 36, rx: 14 },
      { x: 270, y: 102, width: 84, height: 76, rx: 18, tone: "accent" }
    ]
  },
  "energy-infrastructure": {
    circles: [
      { cx: 72, cy: 88, r: 8, tone: "primary" },
      { cx: 136, cy: 68, r: 7 },
      { cx: 140, cy: 148, r: 9, tone: "primary" },
      { cx: 78, cy: 192, r: 8 },
      { cx: 154, cy: 208, r: 7, tone: "accent" }
    ],
    lines: [
      { d: "M72 88 L136 68 L140 148 L78 192 L154 208", tone: "primary" },
      { d: "M72 88 L140 148 L154 208", tone: "soft" },
      { d: "M178 140 H228", tone: "primary" }
    ],
    rects: [
      { x: 228, y: 76, width: 110, height: 74, rx: 18 },
      { x: 228, y: 162, width: 110, height: 46, rx: 16, tone: "primary" }
    ]
  },
  "enterprise-foundation": {
    lines: [
      { d: "M146 102 H184", tone: "soft" },
      { d: "M146 178 H184", tone: "soft" }
    ],
    rects: [
      { x: 50, y: 72, width: 96, height: 60, rx: 18 },
      { x: 50, y: 148, width: 96, height: 60, rx: 18 },
      { x: 184, y: 72, width: 154, height: 136, rx: 22, tone: "primary" },
      { x: 206, y: 96, width: 46, height: 20, rx: 10 },
      { x: 260, y: 96, width: 54, height: 20, rx: 10 },
      { x: 206, y: 128, width: 42, height: 20, rx: 10 },
      { x: 256, y: 128, width: 58, height: 20, rx: 10 },
      { x: 206, y: 160, width: 38, height: 20, rx: 10 },
      { x: 252, y: 160, width: 62, height: 20, rx: 10, tone: "accent" }
    ]
  },
  "explain-signal": {
    circles: [
      { cx: 92, cy: 122, r: 7, tone: "primary" },
      { cx: 92, cy: 150, r: 7 },
      { cx: 92, cy: 178, r: 7, tone: "accent" }
    ],
    lines: [
      { d: "M136 118 H172 C190 118 188 81 206 81", tone: "soft" },
      { d: "M136 146 H176 C194 146 192 137 206 137", tone: "primary" },
      { d: "M136 174 H172 C190 174 188 193 206 193", tone: "accent" },
      { d: "M72 214 H320", tone: "soft" }
    ],
    rects: [
      { x: 48, y: 92, width: 88, height: 104, rx: 20 },
      { x: 206, y: 62, width: 118, height: 38, rx: 16 },
      { x: 206, y: 118, width: 118, height: 38, rx: 16, tone: "primary" },
      { x: 206, y: 174, width: 118, height: 38, rx: 16, tone: "accent" }
    ]
  },
  "explainable-findings": {
    circles: [{ cx: 104, cy: 122, r: 8, tone: "primary" }, { cx: 206, cy: 116, r: 7 }, { cx: 304, cy: 116, r: 8, tone: "accent" }],
    lines: [
      { d: "M104 116 V132", tone: "soft" },
      { d: "M206 116 V132", tone: "primary" },
      { d: "M304 116 V132", tone: "accent" },
      { d: "M88 122 H320", tone: "soft" }
    ],
    rects: [
      { x: 64, y: 62, width: 272, height: 52, rx: 18 },
      { x: 64, y: 134, width: 80, height: 72, rx: 18 },
      { x: 160, y: 134, width: 92, height: 72, rx: 18, tone: "primary" },
      { x: 268, y: 134, width: 68, height: 72, rx: 18, tone: "accent" }
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
    circles: [{ cx: 296, cy: 116, r: 6, tone: "primary" }, { cx: 296, cy: 140, r: 6 }, { cx: 296, cy: 164, r: 6, tone: "accent" }],
    lines: [
      { d: "M118 140 H148", tone: "primary" },
      { d: "M224 91 H264", tone: "soft" },
      { d: "M224 140 H264", tone: "primary" },
      { d: "M224 189 H264", tone: "accent" }
    ],
    rects: [
      { x: 44, y: 116, width: 74, height: 48, rx: 14 },
      { x: 148, y: 74, width: 76, height: 34, rx: 14 },
      { x: 148, y: 123, width: 76, height: 34, rx: 14, tone: "primary" },
      { x: 148, y: 172, width: 76, height: 34, rx: 14 },
      { x: 264, y: 92, width: 92, height: 96, rx: 20, tone: "primary" }
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
      { cx: 200, cy: 156, r: 10, tone: "primary" },
      { cx: 108, cy: 198, r: 6 },
      { cx: 200, cy: 198, r: 6, tone: "primary" },
      { cx: 288, cy: 198, r: 6, tone: "accent" }
    ],
    lines: [
      { d: "M108 104 H292", tone: "soft" },
      { d: "M108 128 H244", tone: "primary" },
      { d: "M108 152 H204", tone: "accent" },
      { d: "M200 166 V182", tone: "primary" }
    ],
    rects: [
      { x: 74, y: 72, width: 252, height: 84, rx: 22 },
      { x: 74, y: 182, width: 72, height: 32, rx: 16, tone: "primary" },
      { x: 156, y: 182, width: 82, height: 32, rx: 16 },
      { x: 248, y: 182, width: 78, height: 32, rx: 16, tone: "accent" }
    ]
  },
  "industrial-ops": {
    circles: [{ cx: 286, cy: 126, r: 7, tone: "accent" }],
    lines: [
      { d: "M72 186 H164", tone: "soft" },
      { d: "M206 126 C230 110 252 120 274 102 C286 92 300 92 320 98", tone: "soft" },
      { d: "M206 146 C230 132 252 142 274 124 C286 114 300 114 320 120", tone: "primary" },
      { d: "M206 166 C230 152 252 162 274 144 C286 134 300 134 320 140", tone: "accent" }
    ],
    rects: [
      { x: 48, y: 92, width: 38, height: 78, rx: 12 },
      { x: 94, y: 118, width: 38, height: 52, rx: 12, tone: "primary" },
      { x: 140, y: 106, width: 32, height: 64, rx: 10 },
      { x: 206, y: 92, width: 122, height: 98, rx: 20 },
      { x: 226, y: 164, width: 86, height: 30, rx: 14, tone: "primary" }
    ]
  },
  "modular-connectors": {
    circles: [{ cx: 314, cy: 140, r: 8, tone: "accent" }],
    lines: [
      { d: "M114 82 H156", tone: "soft" },
      { d: "M114 122 H156", tone: "soft" },
      { d: "M114 162 H156", tone: "soft" },
      { d: "M232 98 H270", tone: "accent" },
      { d: "M232 140 H270", tone: "primary" },
      { d: "M232 182 H270", tone: "accent" }
    ],
    rects: [
      { x: 44, y: 68, width: 70, height: 28, rx: 14 },
      { x: 44, y: 108, width: 70, height: 28, rx: 14 },
      { x: 44, y: 148, width: 70, height: 28, rx: 14 },
      { x: 156, y: 82, width: 76, height: 32, rx: 14, tone: "primary" },
      { x: 156, y: 124, width: 76, height: 32, rx: 14, tone: "primary" },
      { x: 156, y: 166, width: 76, height: 32, rx: 14, tone: "primary" },
      { x: 270, y: 98, width: 72, height: 84, rx: 18 }
    ]
  },
  "operational-memory": {
    lines: [
      { d: "M64 140 H336", tone: "soft" }
    ],
    rects: [
      { x: 54, y: 72, width: 72, height: 34, rx: 14 },
      { x: 130, y: 174, width: 72, height: 34, rx: 14 },
      { x: 206, y: 72, width: 72, height: 34, rx: 14 },
      { x: 282, y: 174, width: 72, height: 34, rx: 14 }
    ],
    circles: [
      { cx: 90, cy: 140, r: 8, tone: "primary" },
      { cx: 166, cy: 140, r: 8, tone: "accent" },
      { cx: 242, cy: 140, r: 8, tone: "primary" },
      { cx: 318, cy: 140, r: 8 }
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
      { cx: 92, cy: 109, r: 5 },
      { cx: 108, cy: 109, r: 5, tone: "primary" },
      { cx: 124, cy: 109, r: 5, tone: "accent" }
    ],
    lines: [
      { d: "M84 110 H296", tone: "soft" },
      { d: "M96 140 H240", tone: "primary" },
      { d: "M96 178 H218", tone: "accent" }
    ],
    rects: [
      { x: 52, y: 68, width: 296, height: 146, rx: 22 },
      { x: 74, y: 122, width: 252, height: 30, rx: 14 },
      { x: 74, y: 160, width: 252, height: 30, rx: 14, tone: "primary" },
      { x: 74, y: 198, width: 252, height: 30, rx: 14 },
      { x: 258, y: 166, width: 52, height: 18, rx: 9, tone: "accent" }
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
    circles: [{ cx: 286, cy: 110, r: 6 }, { cx: 286, cy: 172, r: 6, tone: "accent" }],
    lines: [
      { d: "M116 140 H146", tone: "primary" },
      { d: "M224 92 H250", tone: "accent" },
      { d: "M224 140 H250", tone: "primary" },
      { d: "M224 188 H250", tone: "accent" }
    ],
    rects: [
      { x: 44, y: 116, width: 72, height: 48, rx: 14 },
      { x: 146, y: 74, width: 78, height: 34, rx: 14 },
      { x: 146, y: 123, width: 78, height: 34, rx: 14, tone: "primary" },
      { x: 146, y: 172, width: 78, height: 34, rx: 14 },
      { x: 250, y: 92, width: 72, height: 36, rx: 14 },
      { x: 250, y: 154, width: 72, height: 36, rx: 14, tone: "accent" }
    ]
  },
  "research-facilities": {
    circles: [
      { cx: 112, cy: 56, r: 7, tone: "accent" },
      { cx: 170, cy: 140, r: 7, tone: "accent" },
      { cx: 112, cy: 224, r: 7, tone: "accent" },
      { cx: 286, cy: 164, r: 7, tone: "accent" }
    ],
    lines: [
      { d: "M112 84 V56", tone: "primary" },
      { d: "M112 196 V224", tone: "primary" },
      { d: "M140 140 H170", tone: "primary" },
      { d: "M170 140 H220", tone: "soft" },
      { d: "M248 174 C260 154 272 164 286 140 C294 126 304 124 316 128", tone: "primary" }
    ],
    rects: [{ x: 220, y: 96, width: 108, height: 104, rx: 22 }],
    rings: [{ cx: 112, cy: 140, r: 30, tone: "primary" }, { cx: 112, cy: 140, r: 56, tone: "soft" }]
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

const motionProfiles: Record<CardVisualVariant, MotionProfile> = {
  "abnormal-detection": "signal",
  "changed-context": "explain",
  "connect-sources": "flow",
  "data-agnostic": "flow",
  "data-enterprise": "flow",
  "detect-change": "signal",
  "edge-compute": "flow",
  "energy-infrastructure": "network",
  "enterprise-foundation": "control",
  "explain-signal": "explain",
  "explainable-findings": "explain",
  "focused-start": "network",
  "guide-step": "control",
  "high-dimensional": "network",
  "human-control": "control",
  "industrial-ops": "network",
  "modular-connectors": "flow",
  "operational-memory": "control",
  "operational-pain": "signal",
  "operator-workspace": "control",
  "predict-next": "signal",
  "realtime-design": "signal",
  "repeatable-workflows": "control",
  "research-facilities": "network",
  "technical-depth": "control"
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
  const motionProfile = motionProfiles[variant];

  return (
    <ScrollScene className="card-visual-scene" motionProfile={motionProfile}>
      <svg
        aria-hidden="true"
        className="card-visual"
        data-motion-profile={motionProfile}
        data-variant={variant}
        focusable="false"
        shapeRendering="geometricPrecision"
        viewBox="0 0 400 280"
      >
        <g className="card-visual-layer card-visual-fill-layer">
          {spec.fills?.map((fill) => (
            <path className={fillClass(fill.tone)} d={fill.d} key={fill.d} />
          ))}
        </g>
        <g className="card-visual-layer card-visual-ring-layer">
          {spec.rings?.map((ring) => (
            <circle
              className={shapeClass("visual-ring", ring.tone)}
              cx={ring.cx}
              cy={ring.cy}
              key={`${ring.cx}-${ring.cy}-${ring.r}`}
              r={ring.r}
            />
          ))}
        </g>
        <g className="card-visual-layer card-visual-line-layer">
          {spec.lines?.map((line) => (
            <path className={lineClass(line.tone)} d={line.d} key={line.d} />
          ))}
        </g>
        <g className="card-visual-layer card-visual-structure-layer">
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
        </g>
        <g className="card-visual-layer card-visual-node-layer">
          {spec.circles?.map((circle) => (
            <circle
              className={shapeClass("visual-node", circle.tone)}
              cx={circle.cx}
              cy={circle.cy}
              key={`${circle.cx}-${circle.cy}-${circle.r}`}
              r={circle.r}
            />
          ))}
        </g>
      </svg>
    </ScrollScene>
  );
}
