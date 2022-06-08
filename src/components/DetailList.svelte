<script lang="ts">
  export let title = '';
  export let workspaces: string[] = [];

  $: total = workspaces.length;
</script>

<details data-view-component="true">
  <summary data-view-component="true">
    <h5 class="d-inline">{title}</h5>
    <span
      title={total.toString()}
      data-view-component="true"
      class="Counter ml-1">{total}</span
    >
  </summary>
  <div data-view-component="true">
    <div data-view-component="true" class="Box Box--condensed mt-3">
      <ul>
        {#each workspaces as workspace}
          <li
            data-view-component="true"
            class="Box-row d-flex flex-column flex-md-row"
          >
            <div
              data-view-component="true"
              class="d-flex flex-justify-start col-12 col-lg-9"
            >
              <svg
                aria-hidden="true"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                data-view-component="true"
                class="octicon octicon-package color-fg-muted"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z"
                />
              </svg>
              <a
                href="{workspace}"
                rel="nofollow"
                data-skip-pjax=""
              >
                <span class="px-1 text-bold">
                  {workspace}
                </span>
              </a>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</details>
