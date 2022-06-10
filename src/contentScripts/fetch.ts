import { chunkIntoN } from "~/util";
import type { CrateDepsVO, CrateDetailVO, CrateIntroVO } from "./interface";

export async function getCrateDetail(name: string): Promise<CrateDetailVO | undefined | null> {
  try {
    const response = await fetch(`https://crates.io/api/v1/crates/${name}`);
    return response.status === 200 ? await response.json() : null;
  } catch (err) {
    console.error(err);
  }
}

export async function isPublicCrate(name: string): Promise<boolean> {
  return !!getCrateDetail(name)
}

export async function getCrateDeps(name: string, version: string): Promise<CrateDepsVO | undefined | null> {
  try {
    const response = await fetch(`https://crates.io/api/v1/${name}/rand/${version}/dependencies`);
    return response.status === 200 ? await response.json() : null;
  } catch (err) {
    console.error(err);
  }
}

export async function getCratesIntro(names: string[]): Promise<CrateIntroVO | undefined | null> {
  const baseUrl = 'https://crates.io/api/v1/crates'
  const query = names.map(name => `ids%5B%5D=${name}`).join('&')
  try {
    const response = await fetch(`${baseUrl}?${query}`);
    return response.status === 200 ? await response.json() : null;
  } catch (err) {
    console.error(err);
  }
}

export async function getAllCreatesIntroByChunk(names: string[]) {
  const depsName: string[] = [...new Set(names)];
  if (!depsName.length) return

  const preRequestChunk = chunkIntoN(depsName, 10).map((item) =>
    getCratesIntro(item),
  );
  
  const requestChunk = await Promise.all(preRequestChunk);
  if (!requestChunk) return

  return requestChunk.map((item) => item?.crates)
}
