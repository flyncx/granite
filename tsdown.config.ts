import rolldownBabel from "@rolldown/plugin-babel"
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin"
import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: true,
  exports: true,
  platform: 'neutral',
  format: 'cjs',
  target: 'es2021',
  entry: ['./src/main.tsx'],
  minify: false,
  plugins: [
    vanillaExtractPlugin({
      extract: {
        name: "styles.css",
      }
    }),
    rolldownBabel({
      plugins: [
        ['babel-plugin-styled-components', {
          displayName: true,
          pure: true,
        }]
      ]
    })
  ],
  copy: [
    /**
     * hot reloader plugin marker
     * https://github.com/pjeby/hot-reload
     */
    ".hotreload",
    /**
     * Obsidian plugin manifest.
     */
    "./manifest.json"
  ],
  outExtensions({ format }) {
    return {
      /**
       * Obsidian expect a non-esm `.js` file.
       * Rolldown outpus `.cjs` for CJS format.
       * So, rename the `.cjs` to `js`  
       */
      js: format === "cjs" ? ".js" : ".js",
    };
  },
})
