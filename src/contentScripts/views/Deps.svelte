<script lang="ts">
  import '~/styles';

  import { CARGO_TOML_FILE } from '~/logic';

  import type { CrateIntro } from '../interface';
  import Box from '~/components/Box.svelte';
  import HeaderLink from '~/components/HeaderLink.svelte';
  import { getCratesIntro, isPublicCrate } from '../fetch';
  import { chunkIntoN } from '~/util';

  export let cargoTomlURL: string;
  export let isCargoToml: boolean;
  export let cargoData: any;

  let depMap: Record<string, string[]> = {};
  let crateMap: Record<string, CrateIntro> = {};
  let loading = true

  $: crateName = cargoData?.package?.name;
  $: depMapCrates = Object.keys(depMap).reduce((acc, key) => {
    acc[key] = depMap[key].map((create) => crateMap[create]).filter(Boolean);
    return acc;
  }, {} as Record<string, CrateIntro[]>);

  const getDependencies = async () => {
    loading = true
    try {
      if (cargoData) {
        const deps: string[] = [];
        depMap = Object.keys(cargoData)
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
          }, {} as Record<string, string[]>);
        if (deps.length > 0) {
          const depsName: string[] = Array(...new Set(deps));
          const preRequestChunk = chunkIntoN(depsName, 10).map((item) =>
            getCratesIntro(item),
          );
          const requestChunk = await Promise.all(preRequestChunk);
          if (requestChunk) {
            requestChunk
              .map((item) => item?.crates)
              .forEach((item) => {
                item?.forEach((crate) => {
                  if (crate.name) {
                    crateMap[crate.name] = crate;
                  }
                });
              });
          }
        }
      }
    } catch (err) {
      console.log(err);
      // do something
    } finally {
      loading = false
    }
  };

  getDependencies();
</script>

<div class="clearfix container-xl px-3 px-md-4 px-lg-5 mt-4">
  <!-- `z-index` due to https://github.com/npmhub/npmhub/issues/147 -->
  <Box {loading} dependencies={depMapCrates?.dependencies} style="z-index: 1">
    {#if !isCargoToml}
      <HeaderLink href={cargoTomlURL} label={CARGO_TOML_FILE} />
    {/if}

    {#if crateName}
      {#await isPublicCrate(crateName) then isPublic}
        {#if isPublic}
          <HeaderLink
            href="https://crates.io/crates/{crateName}"
            label="Crates.io"
          />
          <HeaderLink
            href="https://docs.rs/rand/latest/{crateName}"
            label="Docs.rs"
          />
          <HeaderLink
            href="https://play.rust-lang.org/?edition=2018&code=use%20{crateName}%3B%0A%0Afn%20main()%20%7B%0A%20%20%20%20%2F%2F%20try%20using%20the%20%60rand%60%20crate%20here%0A%7D"
            label="Rust Playground"
          />
          <details
            class="dropdown details-reset details-overlay d-inline-block BtnGroup-parent"
          >
            <summary class="btn btn-sm BtnGroup-item" aria-haspopup="true">
              <div class="dropdown-caret m-0" />
            </summary>

            <ul class="dropdown-menu dropdown-menu-sw">
              <li>
                <a
                  class="dropdown-item"
                  href="https://crates.io/crates/{crateName}/versions"
                >
                  Version
                </a>
              </li>
            </ul>
          </details>
        {/if}
      {/await}
    {/if}
  </Box>
  {#each Object.entries(depMapCrates) as [title, crates]}
    {#if title !== 'dependencies'}
      <Box {loading} {title} dependencies={crates} />
    {/if}
  {/each}
</div>
