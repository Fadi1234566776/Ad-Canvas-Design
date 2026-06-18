import type { Creative } from "../types/creative";
import type { Category } from "../types/category";

export type { Creative } from "../types/creative";
export type { Category } from "../types/category";

export interface Project {
  id: string;
  imageUrl: string;
  aspectRatio: string;
}

export function toProject(creative: Creative & { format?: string }): Project {
  return {
    id: creative.id,
    imageUrl: `/attached-assets/${creative.imagePath}`,
    aspectRatio: creative.aspectRatio ?? creative.format ?? "1:1",
  };
}

export function projectsForCategory(
  creatives: (Creative & { format?: string; order?: number })[],
  categoryId: string,
): Project[] {
  return creatives
    .filter((c) => c.categoryId === categoryId)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(toProject);
}

export function sortCreativesInCategory(
  creatives: (Creative & { order?: number })[],
  categoryId: string,
): Creative[] {
  return creatives
    .filter((c) => c.categoryId === categoryId)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function sortCategories(categories: Category[]): Category[] {
  return [...categories].sort((a, b) => a.order - b.order);
}
