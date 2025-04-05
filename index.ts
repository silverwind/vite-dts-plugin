import {promisify} from "node:util";
import {execFile} from "node:child_process";
import {rm, writeFile} from "node:fs/promises";
import type {Plugin} from "vite";

export type ViteDtsPluginOpts = {
  /** Name of the tsc binary. Default: `tsc` */
  tsc?: string,
  /** Output directory. Default: `dist` */
  outDir?: string,
  /** Whether to use custom tsconfig with additional exlude patterns. Default: true */
  useCustomTsConfig?: boolean,
  /** Additional arguments passed to tsc. Default: `[]` */
  args?: Array<string>,
}

const tsConfig = `{
  "extends": "./tsconfig.json",
  "exclude": [
    "\${configDir}/**/*.config.*",
    "\${configDir}/**/*.test.*",
    "\${configDir}/**/.air/**",
    "\${configDir}/**/.git/**",
    "\${configDir}/**/.make/**",
    "\${configDir}/**/.ruff_cache/**",
    "\${configDir}/**/.venv/**",
    "\${configDir}/**/.swc/**",
    "\${configDir}/**/build/**",
    "\${configDir}/**/dist/**",
    "\${configDir}/**/node_modules/**",
    "\${configDir}/**/persistent/**",
  ],
}`;

/** Vite plugin to generate type definitions */
export const dtsPlugin: (opts?: ViteDtsPluginOpts) => Plugin = ({tsc = "tsc", outDir = "dist", useCustomTsConfig = false, args = []}: ViteDtsPluginOpts = {}): Plugin => ({
  name: "vite-tsc-plugin",
  writeBundle: async () => {
    try {
      if (useCustomTsConfig) await writeFile("tsconfig.dtsplugin.json", tsConfig);
      await promisify(execFile)("npx", [
        tsc,
        "--declaration",
        "--noEmit", "false",
        "--emitDeclarationOnly", "true",
        "--outDir", outDir,
        ...(useCustomTsConfig ? ["--project", "tsconfig.dtsplugin.json"] : []),
        ...args,
      ]);
      if (useCustomTsConfig) await rm("tsconfig.dtsplugin.json");
    } catch (err: any) {
      throw new Error(err.stdout ?? err.stderr ?? err.message);
    }
  },
});
