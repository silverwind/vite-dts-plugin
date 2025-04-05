import {promisify} from "node:util";
import {execFile} from "node:child_process";
import {rm, writeFile} from "node:fs/promises";
import type {Plugin} from "vite";

export type ViteDtsPluginOpts = {
  /** Name of the tsc binary. Default: `tsc` */
  tsc?: string,
  /** Output directory. Default: `dist` */
  outDir?: string,
  /** Custom tsconfig as a string. Default: undefined */
  tsConfig?: string,
  /** Additional arguments passed to tsc. Default: `[]` */
  args?: Array<string>,
}


/** Vite plugin to generate type definitions */
export const dtsPlugin: (opts?: ViteDtsPluginOpts) => Plugin = ({tsc = "tsc", outDir = "dist", tsConfig, args = []}: ViteDtsPluginOpts = {}): Plugin => ({
  name: "vite-dts-plugin",
  writeBundle: async () => {
    try {
      if (tsConfig) await writeFile("tsconfig.vite-dts-plugin.json", tsConfig);
      await promisify(execFile)("npx", [
        tsc,
        "--declaration",
        "--noEmit", "false",
        "--emitDeclarationOnly", "true",
        "--outDir", outDir,
        ...(tsConfig ? ["--project", "tsconfig.vite-dts-plugin.json"] : []),
        ...args,
      ]);
      if (tsConfig) await rm("tsconfig.vite-dts-plugin.json");
    } catch (err: any) {
      throw new Error(err.stdout ?? err.stderr ?? err.message);
    }
  },
});
