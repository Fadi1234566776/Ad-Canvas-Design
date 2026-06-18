import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  ChevronRight,
  FolderOpen,
  LogOut,
  Plus,
  Trash2,
} from "lucide-react";
import { RATIO_PRESETS, categoryAspectRatio } from "@/types/category";
import {
  useCategories,
  useAddCategory,
  useDeleteCategory,
  useReorderCategories,
} from "@/hooks/use-categories";
import { useCreatives } from "@/hooks/use-creatives";
import { sortCategories } from "@/lib/creatives";
import { parseAspectRatio } from "@/lib/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { logout } = useAuth();
  const { data: categories = [], isLoading, error } = useCategories();
  const { data: creatives = [] } = useCreatives();
  const addCategory = useAddCategory();
  const deleteCategory = useDeleteCategory();
  const reorderCategories = useReorderCategories();

  const [label, setLabel] = useState("");
  const [aspectRatio, setAspectRatio] = useState("4:5");
  const [message, setMessage] = useState<string | null>(null);

  const sorted = sortCategories(categories);

  const countFor = (id: string) =>
    creatives.filter((c) => c.categoryId === id).length;

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;
    if (!parseAspectRatio(aspectRatio)) {
      setMessage("Enter a valid aspect ratio like 4:5 or 16:9");
      return;
    }
    setMessage(null);
    try {
      await addCategory.mutateAsync({
        label: label.trim(),
        aspectRatio: aspectRatio.trim(),
      });
      setLabel("");
      setMessage("Category added.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to add category");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const n = countFor(id);
    const warn =
      n > 0
        ? `Delete "${name}" and its ${n} image(s)?`
        : `Delete category "${name}"?`;
    if (!confirm(warn)) return;
    setMessage(null);
    try {
      await deleteCategory.mutateAsync(id);
      setMessage("Category deleted.");
    } catch {
      setMessage("Delete failed");
    }
  };

  const move = async (index: number, direction: -1 | 1) => {
    const next = index + direction;
    if (next < 0 || next >= sorted.length) return;
    const ids = sorted.map((c) => c.id);
    [ids[index], ids[next]] = [ids[next], ids[index]];
    setMessage(null);
    try {
      await reorderCategories.mutateAsync(ids);
    } catch {
      setMessage("Reorder failed");
    }
  };

  const handleLogout = async () => {
    await logout.mutateAsync();
    setLocation("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Portfolio
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {sorted.length} categories · {creatives.length} images
          </span>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleLogout}
            disabled={logout.isPending}
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-8">
        {/* Add category */}
        <section className="rounded-lg border border-border/40 bg-card/50 p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Category
          </h2>
          <form onSubmit={handleAdd} className="flex flex-wrap gap-3 items-end">
            <div className="space-y-1 flex-1 min-w-[180px]">
              <label className="text-xs text-muted-foreground">Name</label>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. Carousel Ads"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">
                Aspect ratio (width:height)
              </label>
              <input
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                placeholder="e.g. 4:5, 16:9, 3:2"
                className="w-full min-w-[140px] rounded-md border border-border bg-background px-3 py-2 text-sm font-mono"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {RATIO_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAspectRatio(preset)}
                    className="text-xs px-2 py-0.5 rounded border border-border/60 hover:border-primary/50 hover:text-primary font-mono"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
            <Button type="submit" disabled={addCategory.isPending}>
              Add
            </Button>
          </form>
          {message && (
            <p className="text-sm text-muted-foreground">{message}</p>
          )}
        </section>

        {/* Category list */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">
            Categories (display order)
          </h2>
          {isLoading && (
            <p className="text-sm text-muted-foreground">Loading…</p>
          )}
          {error && (
            <p className="text-sm text-destructive">
              Could not load categories. Make sure the dev server is running.
            </p>
          )}
          <div className="space-y-2">
            {sorted.map((cat, index) => (
              <div
                key={cat.id}
                className="flex items-center gap-2 rounded-lg border border-border/30 bg-card/40 p-3"
              >
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0 || reorderCategories.isPending}
                    className="p-1 rounded hover:bg-muted disabled:opacity-30"
                    aria-label="Move up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={
                      index === sorted.length - 1 || reorderCategories.isPending
                    }
                    className="p-1 rounded hover:bg-muted disabled:opacity-30"
                    aria-label="Move down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{cat.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {categoryAspectRatio(cat)} · {countFor(cat.id)} images ·
                    order {cat.order + 1}
                  </p>
                </div>

                <Link href={`/admin/category/${cat.id}`}>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <FolderOpen className="w-3.5 h-3.5" />
                    Manage
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>

                <button
                  type="button"
                  onClick={() => handleDelete(cat.id, cat.label)}
                  disabled={deleteCategory.isPending}
                  className="p-2 rounded hover:bg-destructive/10 text-destructive"
                  aria-label={`Delete ${cat.label}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
