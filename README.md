# <img src="docs/assets/createhub.png" width="45" align="left"> cratehub

On every GitHub repository or folder with a `Cargo.toml` file, scroll to the bottom of the page to see a list of its npm dependencies and their descriptions.

cratehub also adds convenient links to:

- the `Cargo.toml` file
- create info
- add create data copy (eg: `rustfmt-nightly = "1.4.21"`)
- `Cargo.toml` Workspaces
- [crates.io](https://crates.io/)
- [rust docs](https://docs.rs/)
- [rust playground](https://play.rust-lang.org/)

GitHub Enterprise is also supported by right-clicking on cratehub's icon in the toolbar and selecting <strong>Enable cratehub on this domain</strong>.

## Design

Here's what cratehub looks like:

![cratehub on Chrome](https://user-images.githubusercontent.com/12692552/172637024-4877982c-bcfd-4c79-a5a8-834e5463b5fa.png)

## Installation

[link-chrome]: https://chrome.google.com/webstore/detail/npmhub/kbbbjimdjbjclaebffknlabpogocablj 'Version published on Chrome Web Store'
[link-firefox]: https://addons.mozilla.org/en-US/firefox/addon/npm-hub/ 'Version published on Mozilla Add-ons'
[link-safari]: https://apps.apple.com/app/npmhub/id1542090429 'Version published on the Mac App Store'

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/chrome/chrome.svg" width="48" alt="Chrome" valign="middle">][link-chrome] in progress 🥰

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/firefox/firefox.svg" width="48" alt="Firefox" valign="middle">][link-firefox] in progress 🥰

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/safari/safari_128x128.png" width="48" alt="Safari" valign="middle">][link-safari] !todo dev

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
