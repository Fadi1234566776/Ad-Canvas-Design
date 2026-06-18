export interface Creative {
  id: string;
  imagePath: string;
  aspectRatio: string;
  categoryId: string;
  order: number;
}

/** Read aspect ratio from creative, including legacy `format` field. */
export function creativeAspectRatio(
  creative: Creative & { format?: string },
): string {
  return creative.aspectRatio ?? creative.format ?? "1:1";
}
