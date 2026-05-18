#!/usr/bin/env node
import { execSync } from "node:child_process";
import { cpSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

console.log("Building with Vite...");
execSync("npx vite build", { stdio: "inherit" });

const OUTPUT = ".vercel/output";
const STATIC = join(OUTPUT, "static");
const FUNC = join(OUTPUT, "functions", "ssr.func");

rmSync(OUTPUT, { recursive: true, force: true });
mkdirSync(STATIC, { recursive: true });
mkdirSync(FUNC, { recursive: true });

console.log("Copying static assets...");
cpSync("dist/client", STATIC, { recursive: true });

// Write the new adapter entry point
const ENTRY_SRC = "dist/server/_vercel-entry.mjs";
writeFileSync(
  ENTRY_SRC,
  `
import { createServer } from "node:http";
import { Readable } from "node:stream";
import handler from "./server.js";

// Convert Node IncomingMessage -> Web Request
async function toWebRequest(req) {
  const host =
    req.headers["x-forwarded-host"] ||
    req.headers["host"] ||
    "localhost";
  const proto =
    req.headers["x-forwarded-proto"] ||
    (host.startsWith("localhost") ? "http" : "https");
  const url = new URL(req.url, \`\${proto}://\${host}\`);

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) headers.set(key, Array.isArray(value) ? value.join(", ") : value);
  }

  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  let body = undefined;
  if (hasBody) {
    body = await new Promise((resolve, reject) => {
      const chunks = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", () => resolve(Buffer.concat(chunks)));
      req.on("error", reject);
    });
  }

  return new Request(url.toString(), {
    method: req.method,
    headers,
    body: hasBody ? body : undefined,
  });
}

// Convert Web Response -> Node ServerResponse
async function sendWebResponse(webRes, res) {
  res.statusCode = webRes.status;
  for (const [key, value] of webRes.headers.entries()) {
    res.setHeader(key, value);
  }
  if (webRes.body) {
    const reader = webRes.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  }
  res.end();
}

export default async function vercelHandler(req, res) {
  try {
    const webRequest = await toWebRequest(req);
    const webResponse = await handler.fetch(webRequest, {}, {});
    await sendWebResponse(webResponse, res);
  } catch (err) {
    console.error("SSR handler error:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
`
);

console.log("Bundling serverless function...");
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

writeFileSync(
  join(FUNC, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "nodejs22.x",
      handler: "index.mjs",
      launcherType: "Nodejs",
      supportsResponseStreaming: false,
    },
    null,
    2
  ) + "\n"
);

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

console.log("Done! .vercel/output ready.");