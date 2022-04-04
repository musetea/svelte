import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import Unocss from 'unocss/vite';
import { presetAttributify, presetUno } from 'unocss';
import presetIcons from '@unocss/preset-icons';



/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    preprocess({
      postcss: true,
      includePaths: [path.join(__dirname, 'relative/path')],
      scss:{
        prependData: "@import './static/style.scss'; ",
      }
    }),
  ],
  kit: {
    adapter: adapter(),
  },

  vite: {
    plugins: [
      Unocss({ 
        shortcuts: {
          // shortcuts to multiple utilities
          'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
          'btn-green': 'text-white bg-green-500 hover:bg-green-700',
          // single utility alias
          'red': 'text-red-100'
        },

        presets:[
          presetAttributify({ /* preset options */}),
          presetIcons({ /* options */ }),
          presetUno(),
        ]
       }),
    ],
  }
};

export default config;
