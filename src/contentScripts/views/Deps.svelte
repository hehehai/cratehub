<script lang="ts">
  import '~/styles';

  import { CARGO_TOML_FILE, getCargoDepMap } from '~/logic';

  import type { CrateIntro } from '../interface';
  import Box from '~/components/Box.svelte';
  import HeaderLink from '~/components/HeaderLink.svelte';
  import { getAllCreatesIntroByChunk, isPublicCrate } from '../fetch';

  export let cargoTomlURL: string;
  export let isCargoToml: boolean;
  export let cargoData: any;

  let depMap: Record<string, string[]> = {};
  let crateMap: Record<string, CrateIntro> = {};
  let loading = true;

  $: crateName = cargoData?.package?.name;
  $: depMapCrates = Object.keys(depMap).reduce((acc, key) => {
    acc[key] = depMap[key].map((create) => crateMap[create]).filter(Boolean);
    return acc;
  }, {} as Record<string, CrateIntro[]>);

  const getDependencies = async () => {
    if (!cargoData) {
      return;
    }

    loading = true;
    try {
      const { depMap: _depMap, deps } = getCargoDepMap(cargoData);
      depMap = _depMap;

      if (deps.length > 0) {
        const resChunk = await getAllCreatesIntroByChunk(deps);
        if (resChunk) {
          resChunk.forEach((item) => {
            item?.forEach((crate) => {
              if (crate.name) {
                crateMap[crate.name] = crate;
              }
            });
          });
        }
      }
    } catch (err) {
      console.log(err);
      // do something
    } finally {
      loading = false;
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
            href="https://docs.rs/{crateName}/latest/{crateName}"
            label="Docs.rs"
          />
          <HeaderLink
            href="https://play.rust-lang.org/?edition=2018&code=use%20{crateName}%3B%0A%0Afn%20main()%20%7B%0A%20%20%20%20%2F%2F%20try%20using%20the%20%60{crateName}%60%20crate%20here%0A%7D"
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
