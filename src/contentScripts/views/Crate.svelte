<script lang="ts">
  import '~/styles';
  import { getCrateDetail } from '../fetch';

  import type { CrateDetailVO } from '../interface';
  import CopyInput from '~/components/CopyInput.svelte';
  import AttrList from '~/components/AttrList.svelte';
  import DetailList from '~/components/DetailList.svelte';
  import { sizeFormat } from '~/util/size';

  export let cargoData: any;
  export let crateInfo: CrateDetailVO | undefined;

  let loading = false;

  $: console.log(crateInfo);
  $: copyVal = `${crateInfo?.crate?.name} = "${crateInfo?.crate?.max_version}"`;
  $: sizeVal = crateInfo?.versions?.at(0)?.crate_size
    ? sizeFormat(crateInfo?.versions?.at(0)?.crate_size!)
    : '';

  const getCreateInfo = async () => {
    if (!cargoData?.package?.name) {
      return;
    }
    loading = true;
    try {
      const res = await getCrateDetail(cargoData?.package?.name);
      if (res) {
        crateInfo = res;
      }
    } catch (e) {
      console.log(e);
      // do something
    } finally {
      loading = false;
    }
  };

  getCreateInfo();
</script>

<div class="BorderGrid-row cratehub-crate-row">
  <div class="BorderGrid-cell">
    {#if loading}
      <span>Loading...</span>
    {:else}
      {#if crateInfo?.crate}
        <h2 class="h4 mb-3">
          <a
            href="https://crates.io/crates/{crateInfo?.crate?.name}"
            class="Link--primary no-underline"
          >
            {crateInfo?.crate?.name}
          </a>
        </h2>
        <div>
          <AttrList size={sizeVal} download={crateInfo?.crate?.downloads} />
        </div>
        <div class="mt-2">
          <div class="mb-2 color-fg-muted text-xs">
            Add the following line to your Cargo.toml file:
          </div>
          <CopyInput value={copyVal} />
        </div>
      {/if}
      {#if cargoData?.workspace?.members?.length}
        <DetailList
          title="WorkSpaces"
          workspaces={cargoData?.workspace?.members}
        />
      {/if}
    {/if}
  </div>
</div>
