import {defineConfig} from "vite";
import {nodeLib} from "vite-config-silverwind";
import {dtsPlugin} from "./index.ts";

export default defineConfig(nodeLib({
  url: import.meta.url,
  dts: false,
  plugins: [dtsPlugin()],
}));
