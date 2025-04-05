import {defineConfig} from "vite";
import {nodeLib} from "vite-config-silverwind";

export default defineConfig(nodeLib({
  url: import.meta.url,
  dtsOpts: {args: ["--project", "tsconfig.types.json"]},
}));
