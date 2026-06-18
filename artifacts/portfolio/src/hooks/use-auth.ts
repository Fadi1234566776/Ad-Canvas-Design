import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authHeaders, clearToken, getToken, setToken } from "@/lib/auth";

const SESSION_KEY = ["auth", "session"] as const;

async function fetchSession(): Promise<{ authenticated: boolean }> {
  const token = getToken();
  if (!token) return { authenticated: false };

  const res = await fetch("/api/auth/session", { headers: authHeaders() });
  if (!res.ok) {
    clearToken();
    return { authenticated: false };
  }
  return res.json();
}

export function useAuth() {
  const queryClient = useQueryClient();

  const session = useQuery({
    queryKey: SESSION_KEY,
    queryFn: fetchSession,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const login = useMutation({
    mutationFn: async (password: string) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error ?? "Login failed");
      }
      setToken(data.token);
      return data.token as string;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SESSION_KEY }),
  });

  const logout = useMutation({
    mutationFn: async () => {
      clearToken();
    },
    onSuccess: () => {
      queryClient.setQueryData(SESSION_KEY, { authenticated: false });
    },
  });

  return {
    isAuthenticated: session.data?.authenticated ?? false,
    isLoading: session.isLoading,
    login,
    logout,
  };
}
