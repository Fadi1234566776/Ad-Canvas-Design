import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { creativesApiPlugin } from "./creativesApiPlugin";

const basePath = process.env.BASE_PATH || "/";
const port = Number(process.env.PORT || 3000);
const rootDir = path.resolve(__dirname, "../..");
const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    creativesApiPlugin({
      creativesFile: path.join(rootDir, "data/creatives.json"),
      categoriesFile: path.join(rootDir, "data/categories.json"),
      assetsDir: path.join(rootDir, "attached_assets"),
    }),
    ...(isProd ? [] : [runtimeErrorOverlay()]),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "../../attached_assets"),
    },
  },
  build: {
    outDir: "dist/public",
    emptyOutDir: true,
  },
  server: {
    port,
  },
  preview: {
    port,
  },
});
