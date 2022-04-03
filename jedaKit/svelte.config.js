import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    preprocess({
      postcss: true,
      includePaths: [path.join(__dirname, 'relative/path')]
    }),
  ],
  kit: {
    adapter: adapter(),
  },
};

export default config;
