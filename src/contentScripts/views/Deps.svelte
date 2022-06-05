<script lang="ts">
  import '~/styles';

  import { CARGO_TOML_FILE, getCargoJson } from '~/logic';

  import Box from '~/components/Box.svelte';
  import HeaderLink from '~/components/HeaderLink.svelte';
  import { getCratesIntro, isPublicCrate } from '../fetch';
  import type { CrateIntro } from '../interface';

  export let cargoTomlURL: string;
  export let isCargoToml: boolean;

  let dependencies: CrateIntro[] = [];
  let cargoData: any;

  $: crateName = cargoData?.package?.name;

  const getDependencies = async () => {
    try {
      cargoData = await getCargoJson(isCargoToml, cargoTomlURL);
      if (cargoData && cargoData?.dependencies) {
        let depsName = Object.keys(cargoData.dependencies);
        let depsIntro = await getCratesIntro(depsName);
        if (depsIntro && depsIntro?.crates) {
          dependencies = depsIntro.crates;
        }
      }
    } catch (e) {
      console.log(e);
      // do something
    }
  };

  getDependencies();
</script>

<div class="clearfix container-xl px-3 px-md-4 px-lg-5 mt-4">
  <!-- `z-index` due to https://github.com/npmhub/npmhub/issues/147 -->
  <Box {dependencies} style="z-index: 1">
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
</div>
