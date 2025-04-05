import {promisify} from "node:util";
import {execFile} from "node:child_process";
import type {Plugin} from "vite";

type ViteDtsPluginOpts = {
  /** Name of the tsc binary */
  tsc?: string,
  /** Additional arguments passed to tsc */
  args?: Array<string>,
}

/** Vite plugin to generate type definitions */
export const dtsPlugin: (opts?: ViteDtsPluginOpts) => Plugin = ({tsc = "tsc", args = []}: ViteDtsPluginOpts = {}): Plugin => ({
  name: "vite-tsc-plugin",
  generateBundle: async () => {
    try {
      await promisify(execFile)("npx", [
        tsc,
        "--declaration",
        "--noEmit", "false",
        "--emitDeclarationOnly", "true",
        ...args,
      ]);
    } catch (err: any) {
      throw new Error(err.stdout ?? err.stderr ?? err.message);
    }
  },
});
