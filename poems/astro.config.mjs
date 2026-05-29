// @ts-check
import { defineConfig } from 'astro/config';

// Static site — Vercel deploys the built `dist/` automatically.
// `site` is used for canonical/Open Graph URLs; update if a custom
// domain is attached later.
export default defineConfig({
  site: 'https://saxenasaheb.vercel.app',
  trailingSlash: 'ignore',
});
