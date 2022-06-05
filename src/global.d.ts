import 'vite/client';
import 'unplugin-icons/types/svelte';
import type { AttributifyAttributes } from 'windicss/types/jsx';

declare global {
  declare namespace svelte.JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars
    interface HTMLAttributes<T> extends AttributifyAttributes {}
  }

  declare const __DEV__: boolean;
}
