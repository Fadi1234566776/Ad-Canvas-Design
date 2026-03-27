import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const basePath = process.env.BASE_PATH || "/";
const port = Number(process.env.PORT || 3000);

export default defineConfig(async () => ({
  base: basePath,
  plugins: [react(), tailwindcss(), runtimeErrorOverlay()],
  server: {
    port,
  },
}));
