import fs from "node:fs";
import path from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Connect } from "vite";
import type { Category } from "./src/types/category";
import type { Creative } from "./src/types/creative";
import { parseAspectRatio } from "./src/lib/aspect-ratio.ts";
import {
  createSessionToken,
  isAdminConfigured,
  isAuthorized,
  isMutatingMethod,
  verifyPassword,
} from "./adminAuth.ts";

export const ASSET_PREFIX = "/attached-assets/";

export interface PortfolioApiOptions {
  creativesFile: string;
  categoriesFile: string;
  assetsDir: string;
}

function readJson<T>(file: string, fallback: T): T {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

function writeJson(file: string, data: unknown) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function readBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

async function readJsonBody<T>(req: IncomingMessage): Promise<T> {
  const body = await readBody(req);
  return JSON.parse(body.toString("utf8")) as T;
}

function parseMultipart(
  req: IncomingMessage,
  body: Buffer,
): Promise<{ fields: Record<string, string>; file?: { name: string; data: Buffer } }> {
  return new Promise((resolve, reject) => {
    const contentType = req.headers["content-type"] ?? "";
    const boundaryMatch = contentType.match(/boundary=(.+)$/);
    if (!boundaryMatch) {
      reject(new Error("Missing multipart boundary"));
      return;
    }

    const boundary = `--${boundaryMatch[1]}`;
    const parts = body.toString("binary").split(boundary);
    const fields: Record<string, string> = {};
    let file: { name: string; data: Buffer } | undefined;

    for (const part of parts) {
      if (!part || part === "--\r\n" || part === "--") continue;
      const headerEnd = part.indexOf("\r\n\r\n");
      if (headerEnd === -1) continue;

      const headers = part.slice(0, headerEnd);
      const raw = part.slice(headerEnd + 4);
      const content = raw.endsWith("\r\n") ? raw.slice(0, -2) : raw;

      const nameMatch = headers.match(/name="([^"]+)"/);
      if (!nameMatch) continue;
      const fieldName = nameMatch[1];

      const filenameMatch = headers.match(/filename="([^"]+)"/);
      if (filenameMatch) {
        file = {
          name: filenameMatch[1],
          data: Buffer.from(content, "binary"),
        };
      } else {
        fields[fieldName] = content.trim();
      }
    }

    resolve({ fields, file });
  });
}

function slugify(label: string): string {
  const base = label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return base || `category-${Date.now()}`;
}

function uniqueCategoryId(label: string, categories: Category[]): string {
  let id = slugify(label);
  let n = 2;
  while (categories.some((c) => c.id === id)) {
    id = `${slugify(label)}-${n++}`;
  }
  return id;
}

function nextCreativeId(categoryId: string, creatives: Creative[]): string {
  const prefix = `${categoryId}-`;
  const nums = creatives
    .filter((c) => c.categoryId === categoryId && c.id.startsWith(prefix))
    .map((c) => parseInt(c.id.slice(prefix.length), 10))
    .filter((n) => !Number.isNaN(n));
  const next = nums.length > 0 ? Math.max(...nums) + 1 : 1;
  return `${prefix}${next}`;
}

function safeFilename(name: string): string {
  const base = path.basename(name).replace(/[^a-zA-Z0-9._-]/g, "_");
  const stamp = Date.now();
  const ext = path.extname(base) || ".png";
  const stem = path.basename(base, ext) || "upload";
  return `${stem}_${stamp}${ext}`;
}

function json(res: ServerResponse, status: number, data: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

function sortCategories(categories: Category[]): Category[] {
  return [...categories].sort((a, b) => a.order - b.order);
}

type NextFunction = (err?: unknown) => void;

export function createAssetMiddleware({ assetsDir }: PortfolioApiOptions) {
  return (
    req: IncomingMessage,
    res: ServerResponse,
    next: NextFunction,
  ) => {
    const url = req.url?.split("?")[0] ?? "";
    if (!url.startsWith(ASSET_PREFIX)) {
      next();
      return;
    }

    const urlPath = decodeURIComponent(url.slice(ASSET_PREFIX.length));
    const filePath = path.join(assetsDir, urlPath);
    if (!filePath.startsWith(assetsDir) || !fs.existsSync(filePath)) {
      next();
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const types: Record<string, string> = {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".webp": "image/webp",
      ".gif": "image/gif",
    };
    res.setHeader("Content-Type", types[ext] ?? "application/octet-stream");
    fs.createReadStream(filePath).pipe(res);
  };
}

export function createApiMiddleware(options: PortfolioApiOptions) {
  const { creativesFile, categoriesFile, assetsDir } = options;

  return async (
    req: IncomingMessage,
    res: ServerResponse,
    next: NextFunction,
  ) => {
    const url = req.url?.split("?")[0] ?? "";
    if (!url.startsWith("/api/")) {
      next();
      return;
    }

    try {
      if (url === "/api/auth/login" && req.method === "POST") {
        if (!isAdminConfigured()) {
          json(res, 503, {
            error: "Admin password is not configured on the server",
          });
          return;
        }

        const body = await readJsonBody<{ password?: string }>(req);
        if (!body.password || !verifyPassword(body.password)) {
          json(res, 401, { error: "Invalid password" });
          return;
        }

        const token = createSessionToken();
        if (!token) {
          json(res, 500, { error: "Could not create session" });
          return;
        }

        json(res, 200, { token });
        return;
      }

      if (url === "/api/auth/session" && req.method === "GET") {
        json(res, 200, { authenticated: isAuthorized(req) });
        return;
      }

      if (isMutatingMethod(req.method) && url !== "/api/auth/login") {
        if (!isAdminConfigured()) {
          json(res, 503, {
            error: "Admin password is not configured on the server",
          });
          return;
        }
        if (!isAuthorized(req)) {
          json(res, 401, { error: "Unauthorized" });
          return;
        }
      }

      if (url === "/api/categories" && req.method === "GET") {
        json(
          res,
          200,
          sortCategories(readJson<Category[]>(categoriesFile, [])),
        );
        return;
      }

      if (url === "/api/categories" && req.method === "POST") {
        const body = await readJsonBody<{
          label: string;
          aspectRatio?: string;
          format?: string;
        }>(req);
        if (!body.label?.trim()) {
          json(res, 400, { error: "Label is required" });
          return;
        }

        const rawRatio = body.aspectRatio ?? body.format ?? "";
        const parsed = parseAspectRatio(rawRatio);
        if (!parsed) {
          json(res, 400, {
            error: "Invalid aspect ratio. Use width:height (e.g. 4:5, 16:9)",
          });
          return;
        }

        const categories = readJson<Category[]>(categoriesFile, []);
        const maxOrder = categories.reduce((max, c) => Math.max(max, c.order), -1);
        const category: Category = {
          id: uniqueCategoryId(body.label, categories),
          label: body.label.trim(),
          aspectRatio: parsed.label,
          order: maxOrder + 1,
        };
        categories.push(category);
        writeJson(categoriesFile, categories);
        json(res, 201, category);
        return;
      }

      if (url === "/api/categories/reorder" && req.method === "PUT") {
        const body = await readJsonBody<{ ids: string[] }>(req);
        if (!Array.isArray(body.ids)) {
          json(res, 400, { error: "ids array required" });
          return;
        }

        const categories = readJson<Category[]>(categoriesFile, []);
        const byId = new Map(categories.map((c) => [c.id, c]));
        const reordered: Category[] = [];

        for (let i = 0; i < body.ids.length; i++) {
          const cat = byId.get(body.ids[i]);
          if (cat) reordered.push({ ...cat, order: i });
        }

        for (const cat of categories) {
          if (!body.ids.includes(cat.id)) {
            reordered.push({ ...cat, order: reordered.length });
          }
        }

        writeJson(categoriesFile, reordered);
        json(res, 200, sortCategories(reordered));
        return;
      }

      const categoryDeleteMatch = url.match(/^\/api\/categories\/([^/]+)$/);
      if (categoryDeleteMatch && req.method === "DELETE") {
        const id = decodeURIComponent(categoryDeleteMatch[1]);
        let categories = readJson<Category[]>(categoriesFile, []);
        if (!categories.some((c) => c.id === id)) {
          json(res, 404, { error: "Category not found" });
          return;
        }

        categories = categories
          .filter((c) => c.id !== id)
          .map((c, i) => ({ ...c, order: i }));
        writeJson(categoriesFile, categories);

        let creatives = readJson<Creative[]>(creativesFile, []);
        const removed = creatives.filter((c) => c.categoryId === id);
        creatives = creatives.filter((c) => c.categoryId !== id);
        writeJson(creativesFile, creatives);

        for (const c of removed) {
          const filePath = path.join(assetsDir, c.imagePath);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        json(res, 200, { ok: true });
        return;
      }

      if (url === "/api/creatives" && req.method === "GET") {
        json(res, 200, readJson<Creative[]>(creativesFile, []));
        return;
      }

      if (url === "/api/creatives/reorder" && req.method === "PUT") {
        const body = await readJsonBody<{ categoryId: string; ids: string[] }>(
          req,
        );
        if (!body.categoryId || !Array.isArray(body.ids)) {
          json(res, 400, { error: "categoryId and ids required" });
          return;
        }

        const creatives = readJson<(Creative & { order?: number })[]>(
          creativesFile,
          [],
        );
        const orderById = new Map(body.ids.map((id, index) => [id, index]));

        for (const creative of creatives) {
          if (creative.categoryId === body.categoryId) {
            const nextOrder = orderById.get(creative.id);
            if (nextOrder !== undefined) {
              creative.order = nextOrder;
            }
          }
        }

        writeJson(creativesFile, creatives);
        json(res, 200, { ok: true });
        return;
      }

      if (url === "/api/creatives" && req.method === "POST") {
        const body = await readBody(req);
        const { fields, file } = await parseMultipart(req, body);

        if (!file) {
          json(res, 400, { error: "Image file is required" });
          return;
        }

        const rawRatio = fields.aspectRatio ?? fields.format ?? "";
        const categoryId = fields.categoryId ?? fields.section ?? "";

        const parsed = parseAspectRatio(rawRatio);
        if (!parsed) {
          json(res, 400, { error: "Invalid aspect ratio" });
          return;
        }

        const categories = readJson<(Category & { format?: string })[]>(
          categoriesFile,
          [],
        );
        const category = categories.find((c) => c.id === categoryId);
        if (!category) {
          json(res, 400, { error: "Invalid category" });
          return;
        }

        const creatives = readJson<Creative[]>(creativesFile, []);
        const imagePath = safeFilename(file.name);
        fs.mkdirSync(assetsDir, { recursive: true });
        fs.writeFileSync(path.join(assetsDir, imagePath), file.data);

        const categoryRatio =
          category.aspectRatio ?? category.format ?? parsed.label;

        const inCategory = creatives.filter((c) => c.categoryId === categoryId);
        const maxOrder = inCategory.reduce(
          (max, c) => Math.max(max, c.order ?? 0),
          -1,
        );

        const creative: Creative = {
          id: nextCreativeId(categoryId, creatives),
          imagePath,
          aspectRatio: categoryRatio,
          categoryId,
          order: maxOrder + 1,
        };
        creatives.push(creative);
        writeJson(creativesFile, creatives);
        json(res, 201, creative);
        return;
      }

      const creativeDeleteMatch = url.match(/^\/api\/creatives\/([^/]+)$/);
      if (creativeDeleteMatch && req.method === "DELETE") {
        const id = decodeURIComponent(creativeDeleteMatch[1]);
        const creatives = readJson<Creative[]>(creativesFile, []);
        const index = creatives.findIndex((c) => c.id === id);
        if (index === -1) {
          json(res, 404, { error: "Not found" });
          return;
        }

        const [removed] = creatives.splice(index, 1);
        writeJson(creativesFile, creatives);

        const filePath = path.join(assetsDir, removed.imagePath);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        json(res, 200, { ok: true });
        return;
      }

      json(res, 404, { error: "Not found" });
    } catch (err) {
      console.error("[portfolio-api]", err);
      json(res, 500, { error: "Server error" });
    }
  };
}

export function attachPortfolioMiddleware(
  middlewares: Connect.Server,
  options: PortfolioApiOptions,
) {
  middlewares.use(createAssetMiddleware(options));
  middlewares.use(createApiMiddleware(options));
}
