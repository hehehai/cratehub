import { defineConfig } from 'vite';
import windiCSS from 'vite-plugin-windicss';
import { sharedConfig } from './vite.config';
import { r } from './scripts/utils';
import windiConfig from './windi.config';
import packageJson from './package.json';

// bundling the content script using Vite
export default defineConfig({
  ...sharedConfig,
  mode: 'development',
  build: {
    watch: {},
    outDir: r('dist/contentScripts'),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: 'inline',
    lib: {
      entry: r('src/contentScripts/index.ts'),
      name: packageJson.name,
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.global.js',
        extend: true,
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...sharedConfig.plugins!,

    // https://github.com/antfu/vite-plugin-windicss
    windiCSS({
      config: {
        ...windiConfig,
        // disable preflight to avoid css population
        preflight: false,
      },
    }),
  ],
});
