# Granite

Granite is an Obsidian plugin for my vaults, thus not for public use, although you can see the source codes to learn how-to build one yourself. 

Shadow root are used to make sure no CSS are inherited from Obsidian. This means styling through `styles.css` is impossible, so I opted for ol' reliable `styled-components`.

React is used because personal preference.

## Components

There is not a lot of components, but there is one:

### WebEmbed
As the name suggest, it embed web pages.
#### Options
```ts
type WebEmbedOptions = {
    url: string,
    minHeight: undefined | string | number
};
```

#### Example
````md
```granite-web-embed
url: https://google.com
```
````

## Development/Build

1. Run `pnpm dev` or `pnpm build`.
2. Make a directory on your vault's `.obsidian/plugins/Granite`
3. Symlink the `dist` folder
    ```sh
    ln -s ~/Documents/source-code/granite/dist ~/MyObsidianVault/.obsidian/plugins/Granite
    ```
4. Enable the plugin




