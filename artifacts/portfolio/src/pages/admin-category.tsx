import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { ArrowLeft, GripVertical, LogOut, Trash2, Upload } from "lucide-react";
import { useCategories } from "@/hooks/use-categories";
import {
  useCreatives,
  useAddCreative,
  useDeleteCreative,
  useReorderCreatives,
} from "@/hooks/use-creatives";
import { sortCategories, sortCreativesInCategory } from "@/lib/creatives";
import { categoryAspectRatio } from "@/types/category";
import type { Creative } from "@/types/creative";
import { layoutForAspectRatio } from "@/lib/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

function reorderItems(items: Creative[], fromId: string, toId: string): Creative[] {
  const fromIndex = items.findIndex((i) => i.id === fromId);
  const toIndex = items.findIndex((i) => i.id === toId);
  if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return items;
  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}

export default function AdminCategory() {
  const [, setLocation] = useLocation();
  const { logout } = useAuth();
  const [, params] = useRoute("/admin/category/:id");
  const categoryId = params?.id ?? "";

  const { data: categories = [] } = useCategories();
  const { data: creatives = [], isLoading } = useCreatives();
  const addCreative = useAddCreative();
  const deleteCreative = useDeleteCreative();
  const reorderCreatives = useReorderCreatives();
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [items, setItems] = useState<Creative[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const category = sortCategories(categories).find((c) => c.id === categoryId);
  const ratio = category ? categoryAspectRatio(category) : "1:1";
  const layout = layoutForAspectRatio(ratio);

  useEffect(() => {
    setItems(sortCreativesInCategory(creatives, categoryId));
  }, [creatives, categoryId]);

  const persistOrder = async (ordered: Creative[]) => {
    await reorderCreatives.mutateAsync({
      categoryId,
      ids: ordered.map((c) => c.id),
    });
  };

  const handleDragStart = (id: string) => {
    setDraggingId(id);
    setMessage(null);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setOverId(null);
  };

  const handleDrop = async (targetId: string) => {
    if (!draggingId || draggingId === targetId) return;
    const next = reorderItems(items, draggingId, targetId);
    setItems(next);
    setDraggingId(null);
    setOverId(null);
    try {
      await persistOrder(next);
      setMessage("Order saved.");
    } catch {
      setItems(sortCreativesInCategory(creatives, categoryId));
      setMessage("Could not save order");
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !category) return;
    setMessage(null);
    try {
      await addCreative.mutateAsync({
        file,
        aspectRatio: categoryAspectRatio(category),
        categoryId: category.id,
      });
      setMessage("Image added.");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Upload failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    setMessage(null);
    try {
      await deleteCreative.mutateAsync(id);
      setMessage("Deleted.");
    } catch {
      setMessage("Delete failed");
    }
  };

  const handleLogout = async () => {
    await logout.mutateAsync();
    setLocation("/admin/login");
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Category not found</p>
        <Link href="/admin">
          <Button variant="outline">Back to dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Categories
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold">{category.label}</h1>
            <p className="text-xs text-muted-foreground">
              {ratio} · {items.length} images
            </p>
          </div>
        </div>
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
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        <section className="rounded-lg border border-border/40 bg-card/50 p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">
            Add Image
          </h2>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
          <Button
            onClick={() => fileRef.current?.click()}
            disabled={addCreative.isPending}
            className="gap-2"
          >
            <Upload className="w-4 h-4" />
            {addCreative.isPending ? "Uploading…" : "Choose image"}
          </Button>
          {message && (
            <p className="text-sm text-muted-foreground">{message}</p>
          )}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">
              Images in this category
            </h2>
            {items.length > 1 && (
              <p className="text-xs text-muted-foreground">
                Drag to reorder
              </p>
            )}
          </div>
          {isLoading && (
            <p className="text-sm text-muted-foreground">Loading…</p>
          )}
          {items.length === 0 && !isLoading && (
            <p className="text-sm text-muted-foreground">
              No images yet. Upload one above.
            </p>
          )}
          <div className={`grid gap-4 ${layout.gridClass}`}>
            {items.map((c) => (
              <div
                key={c.id}
                draggable
                onDragStart={() => handleDragStart(c.id)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (draggingId && draggingId !== c.id) setOverId(c.id);
                }}
                onDragLeave={() => {
                  if (overId === c.id) setOverId(null);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  handleDrop(c.id);
                }}
                className={`group relative rounded-lg overflow-hidden border bg-card transition-all ${
                  draggingId === c.id
                    ? "opacity-40 scale-[0.98] border-dashed border-primary/50"
                    : overId === c.id
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border/30"
                }`}
              >
                <div className="absolute top-2 left-2 z-10 p-1 rounded bg-black/50 text-white opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-4 h-4" />
                </div>
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: layout.aspectRatioCss }}
                >
                  <img
                    src={`/attached-assets/${c.imagePath}`}
                    alt={c.id}
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />
                </div>
                <div className="p-2 text-xs text-muted-foreground flex justify-between items-center">
                  <span className="truncate">{c.id}</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(c.id)}
                    disabled={deleteCreative.isPending}
                    className="p-1 rounded hover:bg-destructive/20 text-destructive opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    aria-label={`Delete ${c.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
