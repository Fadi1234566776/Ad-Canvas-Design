import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/home";
import Admin from "./pages/admin";
import AdminCategory from "./pages/admin-category";
import AdminLogin from "./pages/admin-login";
import NotFound from "@/pages/not-found";
import { RequireAuth } from "@/components/require-auth";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/category/:id">
        {() => (
          <RequireAuth>
            <AdminCategory />
          </RequireAuth>
        )}
      </Route>
      <Route path="/admin">
        {() => (
          <RequireAuth>
            <Admin />
          </RequireAuth>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
