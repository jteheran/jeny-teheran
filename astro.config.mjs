// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import { template } from "./src/settings";

import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
    integrations: [react(), tailwind(), sitemap()],
    site: template.website_url,
    base: template.base,
    adapter: cloudflare()
});