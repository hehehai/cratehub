<script lang="ts">
  import '~/styles';

  import type { CrateDetailVO } from '../interface';
  import CopyInput from '~/components/CopyInput.svelte';
  import AttrList from '~/components/AttrList.svelte';
  import DetailList from '~/components/DetailList.svelte';
  import { sizeFormat } from '~/util/size';

  export let isCrate: boolean = false;
  export let crateData: CrateDetailVO | null | undefined = null;
  export let cargoData: any;
  export let repoBlobPath: string | undefined = undefined;

  $: attrData =
    isCrate && crateData?.crate
      ? {
          name: crateData?.crate?.name,
          copyVal: `${crateData?.crate?.name} = "${crateData?.crate?.max_version}"`,
          sizeVal: crateData?.versions?.at(0)?.crate_size
            ? sizeFormat(crateData?.versions?.at(0)?.crate_size!)
            : '',
          downloadsVal: crateData?.crate?.downloads,
        }
      : null;
</script>

<div class="BorderGrid-row cratehub-crate-row">
  <div class="BorderGrid-cell">
    {#if attrData}
      <h2 class="h4 mb-3">
        <a
          href="https://crates.io/crates/{attrData?.name}"
          class="Link--primary no-underline"
        >
          {attrData?.name}
        </a>
      </h2>
      <AttrList size={attrData?.sizeVal} download={attrData?.downloadsVal} />
      <div class="mt-2">
        <div class="mb-2 color-fg-muted text-xs">
          Add the following line to your Cargo.toml file:
        </div>
        <CopyInput value={attrData?.copyVal} />
      </div>
    {/if}
    {#if cargoData?.workspace?.members?.length}
      <div class:mt-2={attrData}>
        <DetailList
          title="WorkSpaces"
          {repoBlobPath}
          workspaces={cargoData?.workspace?.members}
        />
      </div>
    {/if}
  </div>
</div>
