export interface Category {
  id: string;
  label: string;
  aspectRatio: string;
  order: number;
}

/** Read aspect ratio from category, including legacy `format` field. */
export function categoryAspectRatio(
  category: Category & { format?: string },
): string {
  return category.aspectRatio ?? category.format ?? "1:1";
}

export const RATIO_PRESETS = ["4:5", "9:16", "1:1", "16:9", "3:2", "2:3"] as const;
