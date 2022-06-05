/* eslint-disable no-console */
import { onMessage } from 'webext-bridge';
import elementReady from 'element-ready';
import { gitHubInjection } from '~/util/github-injection';
import Deps from './views/Deps.svelte';
import { getCargoTomlURL, hasCargoToml, isCargoToml } from '~/logic/cargo-toml';

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value.
const init = async () => {
  console.info('[vitesse-webext] Hello world from content script');

  // If this fragment exists, then the list is deferred.
  // Adapted from https://github.com/sindresorhus/refined-github/blob/b141596/source/github-events/on-file-list-update.ts
  const ajaxFiles = await elementReady('#files ~ include-fragment[src*="/file-list/"]');
  if (ajaxFiles && ajaxFiles.parentNode) {
    await new Promise(resolve => {
      new MutationObserver(resolve).observe(ajaxFiles.parentNode!, {
        childList: true,
      });
    });
  }

  if (
    document.querySelector('.cratehub-header')
    || !(isCargoToml() || hasCargoToml())
  ) {
    return;
  }

  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({ data }) => {
    console.log(`[vitesse-webext] Navigate from page "${data.title}"`);
  });

  new Deps({
    props: {
      isCargoToml: isCargoToml(),
      cargoTomlURL: getCargoTomlURL(),
    },
    target: document.querySelector('.repository-content')!
  });
}

gitHubInjection(init)
