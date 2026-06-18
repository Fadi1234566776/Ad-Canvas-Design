import { useEffect, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { Lock } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const [, setLocation] = useLocation();
  const search = useSearch();
  const returnTo =
    new URLSearchParams(search).get("return")?.trim() || "/admin";

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setLocation(returnTo);
    }
  }, [isLoading, isAuthenticated, returnTo, setLocation]);

  if (isLoading || isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Checking access…</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login.mutateAsync(password);
      setLocation(returnTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-lg font-semibold">Dashboard sign in</h1>
          <p className="text-sm text-muted-foreground">
            Enter the admin password to manage categories and images.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="password" className="text-xs text-muted-foreground">
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={login.isPending || !password}
          >
            {login.isPending ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="text-center">
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">
            Back to portfolio
          </Link>
        </p>
      </div>
    </div>
  );
}
