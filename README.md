# cratehub

On every GitHub repository or folder with a `Cargo.toml` file, scroll to the bottom of the page to see a list of its npm dependencies and their descriptions.

cratehub also adds convenient links to:

- the **Cargo.toml** file
- [crates.io](https://crates.io/)
- [rust docs](https://docs.rs/)
- [rust playground](https://play.rust-lang.org/)

GitHub Enterprise is also supported by right-clicking on <a href="https://user-images.githubusercontent.com/12692552/172632130-3ed7d8af-db34-4b2f-b706-d6ac1f7cd506.png" target="_blank">cratehub's icon in the toolbar</a> and selecting <strong>Enable cratehub on this domain</strong>.

## Installation

in progress 🥰

### Development

```bash
pnpm dev
```

Then **load extension in browser with the `extension/` folder**.

For Firefox developers, you can run the following command instead:

```bash
pnpm start:firefox
```

`web-ext` auto reload the extension when `extension/` files changed.

> While Vite handles HMR automatically in the most of the case, [Extensions Reloader](https://chrome.google.com/webstore/detail/fimgfedafeadlieiabdeeaodndnlbhid) is still recommanded for cleaner hard reloading.

### Build

To build the extension, run

```bash
pnpm build
```

And then pack files under `extension`, you can upload `extension.crx` or `extension.xpi` to appropriate extension store.

## See Also

- [nmphub](https://github.com/npmhub/npmhub) - On every GitHub repository or folder with a package.json file, scroll to the bottom of the page to see a list of its npm dependencies and their descriptions.

## thx

- [crates.io](https://crates.io/) - crate info api
- [vitesse-webext](https://github.com/antfu/vitesse-webext) - ⚡️ WebExtension Vite Starter Template
