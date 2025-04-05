import {defineConfig} from "vitest/config";
import {backend} from "vitest-config-silverwind";
import {dtsPlugin} from "./index.ts";

export default defineConfig(backend({
  url: import.meta.url,
  plugins: [dtsPlugin()],
}));
