import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import tailwind from "rollup-plugin-tailwindcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";

const extensions = [".js", ".ts", ".jsx", ".tsx", ".svg", ".css"];

const config = [
  {
    input: "index.ts",
    output: [
      {
        file: "dist/cjs/index.js",
        format: "cjs",
        sourcemap: "inline",
        exports: "named",
      },
      {
        file: "dist/esm/index.js",
        format: "esm",
        sourcemap: "inline",
        exports: "named",
      },
    ],
    plugins: [
      peerDepsExternal(),
      tailwind({
        input: "./tailwind-entry.css",
        purge: false,
      }),
      resolve({ extensions }),
      typescript(),
    ],
  },
  {
    input: "./dist/cjs/types/index.d.ts",
    output: [{ file: "dist/cjs/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
  {
    input: "./dist/esm/types/index.d.ts",
    output: [{ file: "dist/esm/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];

export default config;
