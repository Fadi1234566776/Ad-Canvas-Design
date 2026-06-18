import type { Plugin } from "vite";
import { attachPortfolioMiddleware, type PortfolioApiOptions } from "./portfolioApi.ts";

export function creativesApiPlugin(options: PortfolioApiOptions): Plugin {
  const attach = (server: { middlewares: Parameters<typeof attachPortfolioMiddleware>[0] }) => {
    attachPortfolioMiddleware(server.middlewares, options);
  };

  return {
    name: "portfolio-api",
    configureServer: attach,
    configurePreviewServer: attach,
  };
}
