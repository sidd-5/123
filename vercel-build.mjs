#!/usr/bin/env node
import { execSync } from "node:child_process";
import { cpSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

// 1. Run Vite build
console.log("Building with Vite...");
execSync("npx vite build", { stdio: "inherit" });

// 2. Prepare .vercel/output directory structure
const OUTPUT = ".vercel/output";
const STATIC = join(OUTPUT, "static");
const FUNC = join(OUTPUT, "functions", "ssr.func");

rmSync(OUTPUT, { recursive: true, force: true });
mkdirSync(STATIC, { recursive: true });
mkdirSync(FUNC, { recursive: true });

// 3. Copy client assets to static
console.log("Copying static assets...");
cpSync("dist/client", STATIC, { recursive: true });

// 4. Write a temporary entry point for esbuild
const ENTRY_SRC = "dist/server/_vercel-entry.mjs";
writeFileSync(
  ENTRY_SRC,
  `import server from "./server.js";

export default async function handler(req) {
  return await server.fetch(req);
}
`
);

// 5. Bundle the server + deps into a single file with esbuild
console.log("Bundling serverless function with esbuild...");
const banner = `import{createRequire as __cr}from"node:module";import{fileURLToPath as __fu}from"node:url";import{dirname as __dn}from"node:path";const require=__cr(import.meta.url);const __filename=__fu(import.meta.url);const __dirname=__dn(__filename);`;
execSync(
  [
    "npx esbuild",
    ENTRY_SRC,
    "--bundle",
    "--platform=node",
    "--target=node22",
    "--format=esm",
    "--outfile=" + join(FUNC, "index.mjs"),
    "--external:node:*",
    "--ignore-annotations",
    `--banner:js='${banner}'`,
    "--minify",
  ].join(" "),
  { stdio: "inherit" }
);

// 6. Write .vc-config.json for the function
writeFileSync(
  join(FUNC, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "nodejs22.x",
      handler: "index.mjs",
      launcherType: "Nodejs",
      supportsResponseStreaming: true,
    },
    null,
    2
  ) + "\n"
);

// 7. Write top-level config.json
writeFileSync(
  join(OUTPUT, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        {
          src: "/assets/(.*)",
          headers: { "Cache-Control": "public, max-age=31536000, immutable" },
          continue: true,
        },
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/ssr" },
      ],
    },
    null,
    2
  ) + "\n"
);

console.log("Vercel Build Output ready at .vercel/output/");
