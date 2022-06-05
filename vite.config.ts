// import { dirname, relative } from 'path';
import { defineConfig, type UserConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import icons from 'unplugin-icons/vite';
import autoImport from 'unplugin-auto-import/vite';
import windiCSS from 'vite-plugin-windicss';
import windiConfig from './windi.config';
import { r, port, isDev } from './scripts/utils';

export const sharedConfig: UserConfig = {
  root: r('src'),
  envDir: r('.'),
  resolve: {
    alias: {
      '~/': `${r('src')}/`,
    },
  },
  define: {
    __DEV__: isDev,
  },
  plugins: [
    svelte({
      preprocess: [sveltePreprocess({ typescript: true })]
    }),

    autoImport({
      imports: [
        'svelte',
        'svelte/animate',
        'svelte/easing',
        'svelte/motion',
        'svelte/store',
        'svelte/transition',
        {
          'webextension-polyfill': [['*', 'browser']],
        },
      ],
      dts: r('src/auto-imports.d.ts'),
    }),

    // https://github.com/antfu/unplugin-icons
    icons({ compiler: 'svelte' }),
  ],
  optimizeDeps: {
    include: ['svelte', 'webextension-polyfill'],
  },
};

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === 'serve' ? `http://localhost:${port}/` : '/',
  server: {
    port,
    hmr: {
      host: 'localhost',
    },
  },
  build: {
    outDir: r('dist'),
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        background: r('src/background/index.html'),
        popup: r('src/popup/index.html'),
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...sharedConfig.plugins!,

    // https://github.com/antfu/vite-plugin-windicss
    windiCSS({
      config: windiConfig,
    }),
  ],
}));
