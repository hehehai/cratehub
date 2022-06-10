// generate stub index.html files for dev entry
import fs from 'fs-extra';
import chokidar from 'chokidar';
import { r, port, isDev, log } from './utils';
import { getManifest } from '../src/manifest'

const browser: string = process.env.TARGET_BROWSER ?? 'chrome';

/**
 * Stub index.html to use Vite in development
 */
async function stubIndexHtml() {
  const views = [];
  if (browser.includes('firefox')) {
    views.push('background');
  }

  for (const view of views) {
    await fs.ensureDir(r(`dist/${view}`));
    let data = await fs.readFile(r(`src/${view}/index.html`), 'utf-8');
    data = data
      .replace('"./main.ts"', `"http://localhost:${port}/${view}/main.ts"`)
      .replace(
        '<div id="app"></div>',
        '<div id="app">Vite server did not start</div>',
      );
    await fs.writeFile(r(`dist/${view}/index.html`), data, 'utf-8');
    log('PRE', `stub ${view}`);
  }
}

async function writeManifest() {
  await fs.ensureDir(r('dist/'));
  await fs.writeJSON(r('dist/manifest.json'), await getManifest(), {
    spaces: 2,
  });
  log('PRE', 'write manifest.json');
}

async function copyAssets() {
  await fs.ensureDir(r('dist/'));
  await fs.copy(r('src/assets/'), r('dist/assets'));
  log('PRE', 'copy assets');
}

if (isDev) {
  Promise.all([stubIndexHtml(), copyAssets(), writeManifest()]);

  chokidar.watch(r('src/**/*.html')).on('change', () => {
    stubIndexHtml();
  });

  chokidar.watch(r('src/assets/**/*')).on('change', () => {
    copyAssets();
  });

  chokidar
    .watch([r('package.json'), r('src/manifest.ts')])
    .on('change', () => {
      writeManifest();
    });
} else {
  writeManifest()
  copyAssets()
}
