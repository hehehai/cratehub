/* eslint-disable camelcase */
import fs from 'fs-extra';
import type { Manifest } from 'webextension-polyfill';
import type PkgType from '../package.json';
import { isDev, port, r } from '../scripts/utils';

const browser: string = process.env.TARGET_BROWSER ?? 'chrome';

export async function getManifest() {
  const pkg = (await fs.readJSON(r('package.json'))) as typeof PkgType;

  if (browser.includes('firefox')) {
    const manifest: Manifest.WebExtensionManifest = {
      manifest_version: 2,
      name: pkg.displayName || pkg.name,
      version: pkg.version,
      description: pkg.description,
      browser_action: {
        default_icon: 'assets/icon-512.png',
        default_popup: 'popup/index.html',
      },
      background: {
        page: 'background/index.html',
        persistent: false,
      },
      icons: {
        16: 'assets/icon-512.png',
        48: 'assets/icon-512.png',
        128: 'assets/icon-512.png',
      },
      permissions: [
        "https://crates.io/",
        'activeTab',
        "contextMenus",
        'http://*/',
        'https://*/',
      ],
      browser_specific_settings: {
        gecko: {
          id: 'sveltesse-webext@fixme.com',
        },
      },
      content_scripts: [
        {
          matches: [
            "https://github.com/*",
            "https://gitlab.com/*"
          ],
          js: ['./contentScripts/index.global.js'],
          css: ['./contentScripts/style.css']
        },
      ],
      web_accessible_resources: [
        './contentScripts/style.css',
      ],
    };
    if (isDev) {
      manifest.permissions?.push('webNavigation');

      // this is required on dev for Vite script to load
      manifest.content_security_policy = `script-src 'self' http://localhost:${port} http://localhost:8098 http://localhost:8099; object-src 'self'`;
    }
    return manifest;
  } else {
    type Manifest = ReturnType<typeof chrome.runtime.getManifest>;

    const manifest: Manifest = {
      manifest_version: 3,
      name: pkg.displayName || pkg.name,
      version: pkg.version,
      description: pkg.description,
      action: {
        default_icon: {
          16: 'assets/icon-512.png',
          48: 'assets/icon-512.png',
          128: 'assets/icon-512.png',
        },
        default_popup: 'popup/index.html',
      },
      background: {
        service_worker: 'background/main.ts',
        type: 'module',
      },
      icons: {
        16: 'assets/icon-512.png',
        48: 'assets/icon-512.png',
        128: 'assets/icon-512.png',
      },
      permissions: [
        'activeTab',
        'contextMenus',
      ],
      content_scripts: [
        {
          matches: [
            "https://github.com/*",
            "https://gitlab.com/*"
          ],
          js: ['./contentScripts/index.global.js'],
          css: ['./contentScripts/style.css']
        },
      ],
    };
    return manifest;
  }
}
