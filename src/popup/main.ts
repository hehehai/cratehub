import App from './Popup.svelte';
import '../styles';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const target = document.getElementById('app')!;
target.innerHTML = '';
const app = new App({ target });

export default app;
