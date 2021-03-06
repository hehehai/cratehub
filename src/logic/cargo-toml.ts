import elementReady from 'element-ready';
import toml from 'toml'
import fetchDom from '~/util/fetch-dom';

export const CARGO_TOML_FILE = 'Cargo.toml'
export const ERROR_MESSAGE = 'cratehub: there was an error while';

export function isCargoToml() {
  // Example URLs:
  // https://github.com/rust-lang/rust/blob/master/Cargo.toml
  const pathnameParts = window.location.pathname.split('/');
  return pathnameParts[3] === 'blob' && pathnameParts.pop() === CARGO_TOML_FILE;
}

export function hasCargoToml() {
  return Boolean(getCargoTomlURL());
}

export function getCargoTomlURL() {
  const packageLink = (document.querySelector(`#files ~ div [title="${CARGO_TOML_FILE}"]`) || document.querySelector(`.files [title="${CARGO_TOML_FILE}"]`)) as HTMLAnchorElement;

  if (packageLink) {
    return packageLink.href;
  }
}

export function tomlToJson(tomlData: string) {
  return toml.parse(tomlData);
}

// https://github.com/zellij-org/zellij/blob/bg-and-fg-color-ansi/Cargo.toml
export function getRepoBlobPath(link: string): string | undefined {
  return (link.match(/.+blob\/.+\//) || [])[0];
}

export async function getCargoJson(isCargoToml: boolean, cargoTomlURL?: string) {
  const codeDoc = isCargoToml ? document : cargoTomlURL ? await fetchDom(cargoTomlURL) : null;
  if (codeDoc) {
    const tomlBlobElement = await elementReady('.blob-wrapper table', {
      target: <Document>codeDoc,
    });
    if (tomlBlobElement && tomlBlobElement.textContent) {
      return tomlToJson(tomlBlobElement.textContent)
    }
  }
}

export function getCargoDepMap(cargoData: any) {
  const deps: string[] = [];

  const depMap = Object.keys(cargoData)
  .filter((key) => key.includes('dependencies'))
  .reduce((acc, key) => {
    if (key.startsWith('dependencies')) {
      acc.dependencies = [
        ...(acc.dependencies ?? []),
        ...Object.keys(cargoData[key]),
      ];
      deps.push(...acc.dependencies);
    } else {
      acc[key] = Object.keys(cargoData[key]);
      deps.push(...acc[key]);
    }
    return acc;
  }, {} as Record<string, string[]>)

  return { depMap, deps }
}
