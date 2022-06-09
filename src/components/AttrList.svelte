<script lang="ts">
  export let size: string | undefined | null = undefined;
  export let download: string | number | undefined | null = undefined;
</script>

<div>
  {#if size}
    <div class="mt-2">
      <span class="Link--muted">
        <svg
          class="octicon octicon-database mr-2"
          aria-hidden="true"
          height="16"
          version="1.1"
          viewBox="0 0 12 16"
          width="16"
        >
          <path
            d="M6 15c-3.31 0-6-.9-6-2v-2c0-.17.09-.34.21-.5.67.86 3 1.5 5.79 1.5s5.12-.64 5.79-1.5c.13.16.21.33.21.5v2c0 1.1-2.69 2-6 2zm0-4c-3.31 0-6-.9-6-2V7c0-.11.04-.21.09-.31.03-.06.07-.13.12-.19C.88 7.36 3.21 8 6 8s5.12-.64 5.79-1.5c.05.06.09.13.12.19.05.1.09.21.09.31v2c0 1.1-2.69 2-6 2zm0-4c-3.31 0-6-.9-6-2V3c0-1.1 2.69-2 6-2s6 .9 6 2v2c0 1.1-2.69 2-6 2zm0-5c-2.21 0-4 .45-4 1s1.79 1 4 1 4-.45 4-1-1.79-1-4-1z"
          />
        </svg>
        <span>{size}</span>
      </span>
    </div>
  {/if}

  {#if download}
    <div class="mt-2">
      <span class="Link--muted">
        <svg
          class="octicon octicon-cloud-download mr-2"
          aria-hidden="true"
          height="16"
          version="1.1"
          viewBox="0 0 16 16"
          width="16"
        >
          <path
            d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"
          />
        </svg>
        <strong>{download}</strong>
        <span> downloads</span>
      </span>
    </div>
  {/if}
</div>
