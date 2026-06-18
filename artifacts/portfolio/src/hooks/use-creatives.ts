import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Creative } from "@/types/creative";
import { authHeaders } from "@/lib/auth";

const QUERY_KEY = ["creatives"] as const;

async function fetchCreatives(): Promise<Creative[]> {
  const res = await fetch("/api/creatives");
  if (!res.ok) throw new Error("Failed to load creatives");
  return res.json();
}

export function useCreatives() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchCreatives,
  });
}

export function useAddCreative() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      file: File;
      aspectRatio: string;
      categoryId: string;
    }) => {
      const form = new FormData();
      form.append("image", input.file);
      form.append("aspectRatio", input.aspectRatio);
      form.append("categoryId", input.categoryId);
      const res = await fetch("/api/creatives", {
        method: "POST",
        headers: authHeaders(),
        body: form,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Upload failed");
      }
      return res.json() as Promise<Creative>;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useDeleteCreative() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/creatives/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useReorderCreatives() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { categoryId: string; ids: string[] }) => {
      const res = await fetch("/api/creatives/reorder", {
        method: "PUT",
        headers: {
          ...authHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error("Failed to reorder");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}
