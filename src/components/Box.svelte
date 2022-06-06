<script lang="ts">
  import type { CrateIntro } from '~/contentScripts/interface';

  export let loading = false;
  export let title = 'Dependencies';
  export let style = '';
  export let dependencies: CrateIntro[] = [];
</script>

<div class="Box Box--condensed mt-5 file-holder">
  <div
    class="d-flex js-position-sticky border-top-0 border-bottom p-2 flex-justify-between color-bg-default rounded-top-2"
    style="position: sticky; {style}"
  >
    <h3 class="Box-title p-2">{title}</h3>
    <div class="cratehub-header BtnGroup">
      <slot />
    </div>
  </div>
  <ol class="cratehub-deps markdown-body" class:cratehub-loading={loading}>
    {#if dependencies}
      {#if dependencies.length === 0}
        <li class="cratehub-empty">
          No dependencies!
          <g-emoji
            class="g-emoji"
            alias="tada"
            fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f389.png"
          >
            🎉
          </g-emoji>
        </li>
      {:else}
        {#each dependencies as dep}
          <li>
            <a href={dep?.repository}>
              {dep?.name}
            </a>
            {#if dep?.description}
              {dep?.description}
            {:else}
              <em>No description.</em>
            {/if}
          </li>
        {/each}
      {/if}
    {/if}
  </ol>
</div>
