# <img src="docs/assets/createhub.svg" width="45" align="left"> cratehub

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

![cratehub on Chrome](https://user-images.githubusercontent.com/12692552/173165981-414dc36d-a11b-4e09-b92f-7c1333f84ea0.png)

## Installation

[link-chrome]: https://chrome.google.com/webstore/detail/createhub/ipcffemefdnmgnhkpdkenddfoebpejei 'Version published on Chrome Web Store'
[link-firefox]: https://addons.mozilla.org/addon/cratehub/ 'Version published on Mozilla Add-ons'

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/chrome/chrome.svg" width="48" alt="Chrome" valign="middle">][link-chrome] [<img valign="middle" src="https://img.shields.io/chrome-web-store/v/ipcffemefdnmgnhkpdkenddfoebpejei.svg?label=%20">][link-chrome] also compatible with [<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/edge/edge.svg" width="24" alt="Edge" valign="middle">][link-chrome] [<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/opera/opera.svg" width="24" alt="Opera" valign="middle">][link-chrome]

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/firefox/firefox.svg" width="48" alt="Firefox" valign="middle">][link-firefox] [<img valign="middle" src="https://img.shields.io/amo/v/cratehub.svg?label=%20">][link-firefox]

<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/safari/safari_128x128.png" width="48" alt="Safari" valign="middle"> ! todo dev

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

- [npmhub](https://github.com/npmhub/npmhub) - On every GitHub repository or folder with a package.json file, scroll to the bottom of the page to see a list of its npm dependencies and their descriptions.

## thx

- [crates.io](https://crates.io/) - crate info api
- [vitesse-webext](https://github.com/antfu/vitesse-webext) - ?????? WebExtension Vite Starter Template
