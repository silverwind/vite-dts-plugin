import {promisify} from "node:util";
import {execFile} from "node:child_process";
import type {Plugin} from "vite";

type ViteDtsPluginOpts = {
  /** Name of the tsc binary. Default: `tsc` */
  tsc?: string,
  /** Output directory. Default: `dist` */
  outDir?: string,
  /** Additional arguments passed to tsc. Default: `[]` */
  args?: Array<string>,
}

/** Vite plugin to generate type definitions */
export const dtsPlugin: (opts?: ViteDtsPluginOpts) => Plugin = ({tsc = "tsc", outDir = "dist", args = []}: ViteDtsPluginOpts = {}): Plugin => ({
  name: "vite-tsc-plugin",
  writeBundle: async () => {
    try {
      await promisify(execFile)("npx", [
        tsc,
        "--declaration",
        "--noEmit", "false",
        "--emitDeclarationOnly", "true",
        "--outDir", outDir,
        ...args,
      ]);
    } catch (err: any) {
      throw new Error(err.stdout ?? err.stderr ?? err.message);
    }
  },
});
