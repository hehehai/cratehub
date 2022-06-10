import elementReady from 'element-ready';
import { gitHubInjection } from '~/util/github-injection';
import Deps from './views/Deps.svelte';
import Crate from './views/Crate.svelte';
import { getCargoJson, getCargoTomlURL, getRepoBlobPath, hasCargoToml, isCargoToml } from '~/logic/cargo-toml';

interface InitProps {
  isCargoToml: boolean;
  cargoTomlURL?: string;
  repoBlobPath?: string;
  cargoData?: any;
}

const initDeps = async (props: InitProps) => {
  const target = document.querySelector('.repository-content')
  if (!target) {
    return
  }

  new Deps({
    props,
    target
  });
}

const initCrate = async (props: InitProps) => {
  const target = document.querySelector('.Layout-sidebar .BorderGrid')
  if (!target) {
    return
  }

  new Crate({
    props: {
      repoBlobPath: props.repoBlobPath,
      cargoData: props.cargoData,
    },
    target
  });
}

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value.
const init = async () => {
  console.info('[vitesse-webext] Hello world from content script');

  try {
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

    const isCargoTomlVal = isCargoToml();
    const hasCargoTomlVal = hasCargoToml();

    if (!(isCargoTomlVal || hasCargoTomlVal)) {
      return;
    }

    const cargoTomlURL = getCargoTomlURL()
    const repoBlobPath = cargoTomlURL ? getRepoBlobPath(cargoTomlURL) : undefined;
    const cargoData = await getCargoJson(isCargoTomlVal, cargoTomlURL);

    if (!cargoData) {
      return;
    }

    const props = {
        isCargoToml: isCargoTomlVal,
        cargoTomlURL: cargoTomlURL,
        repoBlobPath,
        cargoData,
    }

    if (!document.querySelector('.cratehub-crate-row')) {
      await initCrate(props);
    }
    if (!document.querySelector('.cratehub-header')) {
      await initDeps(props);
    }
  } catch (err) {
    console.error(err);
  }
}

gitHubInjection(init)
