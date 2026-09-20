/// <reference lib="esnext" />
/// <reference lib="webworker" />

import type {
  PrecacheEntry,
  RuntimeCaching,
  SerwistGlobalConfig,
} from "serwist";
import { CacheFirst, ExpirationPlugin, NetworkOnly, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const runtimeCaching: RuntimeCaching[] = [
  {
    matcher: ({ request }) => request.mode === "navigate",
    handler: new NetworkOnly(),
  },
  {
    matcher: ({ request, url }) =>
      request.method === "GET" &&
      url.origin === self.location.origin &&
      url.pathname.startsWith("/_next/static/"),
    handler: new CacheFirst({
      cacheName: "kept-public-assets",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 96,
          maxAgeSeconds: 30 * 24 * 60 * 60,
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
];

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching,
  fallbacks: {
    entries: [
      {
        url: "/offline",
        matcher: ({ request }) => request.destination === "document",
      },
    ],
  },
});

serwist.addEventListeners();
