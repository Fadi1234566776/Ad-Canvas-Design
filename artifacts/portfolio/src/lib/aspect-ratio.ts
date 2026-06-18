export interface ParsedAspectRatio {
  w: number;
  h: number;
  label: string;
}

/** Accepts "4:5", "4/5", "16 : 9", etc. */
export function parseAspectRatio(input: string): ParsedAspectRatio | null {
  const normalized = input.trim().replace(/\s+/g, "").replace("/", ":");
  const match = normalized.match(/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?)$/);
  if (!match) return null;

  const w = parseFloat(match[1]);
  const h = parseFloat(match[2]);
  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
    return null;
  }

  const label =
    Number.isInteger(w) && Number.isInteger(h)
      ? `${w}:${h}`
      : `${w}:${h}`;

  return { w, h, label };
}

export function layoutForAspectRatio(aspectRatio: string): {
  gridClass: string;
  aspectRatioCss: string;
  label: string;
} {
  const parsed = parseAspectRatio(aspectRatio);
  if (!parsed) {
    return {
      gridClass: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
      aspectRatioCss: "1 / 1",
      label: "1:1",
    };
  }

  const { w, h, label } = parsed;
  const ratio = w / h;

  let gridClass: string;
  if (ratio > 1.15) {
    gridClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  } else if (ratio < 0.65) {
    gridClass = "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6";
  } else if (ratio < 0.95) {
    gridClass = "grid-cols-2 sm:grid-cols-3";
  } else {
    gridClass = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
  }

  return {
    gridClass,
    aspectRatioCss: `${w} / ${h}`,
    label,
  };
}
