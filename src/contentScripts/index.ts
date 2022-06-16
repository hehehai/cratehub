import elementReady from 'element-ready';
import { gitHubInjection } from '~/util/github-injection';
import Deps from './views/Deps.svelte';
import Crate from './views/Crate.svelte';
import { getCargoJson, getCargoTomlURL, getRepoBlobPath, hasCargoToml, isCargoToml } from '~/logic/cargo-toml';
import { getCrateDetail } from './fetch';
import type { CrateDetailVO } from './interface';

interface InitProps {
  isCrate: boolean;
  isCargoToml: boolean;
  cargoTomlURL?: string;
  repoBlobPath?: string;
  cargoData?: any;
  crateData?: CrateDetailVO | null;
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
    props,
    target
  });
}

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value.
const init = async () => {
  console.info('[cratehub] script init');

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

    let isCrate = false
    let crateData = null
    if (cargoData?.package?.name) {
      crateData = await getCrateDetail(cargoData?.package?.name);
      if (crateData) {
        if (crateData?.crate?.repository && cargoData?.package?.repository === crateData?.crate?.repository) {
          isCrate = true
        } else if (cargoData?.package?.version === crateData?.crate?.max_version) {
          // empty repository fallback equals version
          isCrate = true
        }
      }
    }

    const props: InitProps = {
        isCrate,
        isCargoToml: isCargoTomlVal,
        cargoTomlURL: cargoTomlURL,
        repoBlobPath,
        crateData,
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
