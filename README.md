# vite-dts-plugin
[![](https://img.shields.io/npm/v/vite-dts-plugin.svg?style=flat)](https://www.npmjs.org/package/vite-dts-plugin) [![](https://img.shields.io/npm/dm/vite-dts-plugin.svg)](https://www.npmjs.org/package/vite-dts-plugin) [![](https://packagephobia.com/badge?p=vite-dts-plugin)](https://packagephobia.com/result?p=vite-dts-plugin)

Vite plugin to generate typescript definitions, with zero dependencies

## Usage

#### vite.config.js

```js
import {defineConfig} from "vite";
import {dtsPlugin} from "vite-dts-plugin";

export default defineConfig({
  plugins: [
    dtsPlugin(),
  ],
});
```

## Options

- `tsc`: Name of the `tsc` binary, default `tsc`.
- `outDir`: Output directory. Default: `dist`.
- `useCustomTsConfig`: Whether to use custom tsconfig with additional exlude patterns. Default: `false`.
- `args`: Additional arguments passed to tsc. Default: `[]`.
