// Vercel deployment — Cloudflare plugin disabled, default TanStack Start server entry.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  cloudflare: false,
});
