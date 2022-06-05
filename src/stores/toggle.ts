// Taken from https://github.com/stephane-vanraes/svelte-toggleable/blob/4dde7b66b9911a30e9da05b4275dde7ee851d7f5/src/index.js.
export default function toggleable(initial = false) {
  const { subscribe, set, update } = writable(initial);

  return {
    set,
    subscribe,
    update,
    on: () => set(true),
    off: () => set(false),
    toggle: () => update((s) => !s),
  };
}
