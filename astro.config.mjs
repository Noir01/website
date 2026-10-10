// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://srivastava.dev',
  compressHTML: true,
  integrations: [mdx(), sitemap()],
  adapter: cloudflare(),
});