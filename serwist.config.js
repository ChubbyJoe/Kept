// @ts-check

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { serwist } from "@serwist/next/config";

const offlineSource = readFileSync("src/app/offline/page.tsx");
const offlineRevision = createHash("sha256")
  .update(offlineSource)
  .digest("hex");

export default serwist({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  precachePrerendered: false,
  additionalPrecacheEntries: [{ url: "/offline", revision: offlineRevision }],
});
