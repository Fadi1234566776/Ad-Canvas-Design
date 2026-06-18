import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { IncomingMessage, ServerResponse } from "node:http";
import {
  createApiMiddleware,
  createAssetMiddleware,
  type PortfolioApiOptions,
} from "./portfolioApi.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../..");
const staticDir = path.resolve(__dirname, "dist/public");
const basePath = (process.env.BASE_PATH || "/").replace(/\/$/, "") || "";

const apiOptions: PortfolioApiOptions = {
  creativesFile: path.join(rootDir, "data/creatives.json"),
  categoriesFile: path.join(rootDir, "data/categories.json"),
  assetsDir: path.join(rootDir, "attached_assets"),
};

type Middleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: unknown) => void,
) => void;

const middlewares: Middleware[] = [
  stripBasePath,
  createAssetMiddleware(apiOptions),
  createApiMiddleware(apiOptions),
  serveStatic,
];

function stripBasePath(
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: unknown) => void,
) {
  if (!basePath || !req.url?.startsWith(basePath)) {
    next();
    return;
  }

  const rest = req.url.slice(basePath.length) || "/";
  req.url = rest.startsWith("/") ? rest : `/${rest}`;
  next();
}

function contentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const types: Record<string, string> = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
  };
  return types[ext] ?? "application/octet-stream";
}

function serveStatic(
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: unknown) => void,
) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    next();
    return;
  }

  const urlPath = decodeURIComponent(req.url?.split("?")[0] ?? "/");
  if (urlPath.startsWith("/api/")) {
    next();
    return;
  }

  const relativePath =
    urlPath === "/" ? "index.html" : urlPath.replace(/^\//, "");
  let filePath = path.join(staticDir, relativePath);

  if (!filePath.startsWith(staticDir)) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    filePath = path.join(staticDir, "index.html");
    if (!fs.existsSync(filePath)) {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", contentType(filePath));
  if (req.method === "HEAD") {
    res.end();
    return;
  }

  fs.createReadStream(filePath).pipe(res);
}

function runMiddleware(
  req: IncomingMessage,
  res: ServerResponse,
  index: number,
) {
  const fn = middlewares[index];
  if (!fn) {
    if (!res.headersSent) {
      res.statusCode = 404;
      res.end("Not found");
    }
    return;
  }

  fn(req, res, (err) => {
    if (err) {
      console.error("[portfolio-server]", err);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end("Server error");
      }
      return;
    }
    runMiddleware(req, res, index + 1);
  });
}

const port = Number(process.env.PORT || 21113);

if (!fs.existsSync(staticDir)) {
  console.error(
    `[portfolio-server] Missing build output at ${staticDir}. Run pnpm --filter @workspace/portfolio run build first.`,
  );
  process.exit(1);
}

http
  .createServer((req, res) => runMiddleware(req, res, 0))
  .listen(port, "0.0.0.0", () => {
    console.log(`[portfolio-server] listening on http://0.0.0.0:${port}${basePath || "/"}`);
  });
