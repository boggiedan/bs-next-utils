import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";

const dts = require("rollup-plugin-dts").default;
const tailwindConfig = require("./tailwind.config.cjs");
const packageJson = require("./package.json");

const extensions = [".js", ".ts", ".jsx", ".tsx", ".svg", ".css"];

const config = [
  {
    input: "index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: "inline",
        exports: "named",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: "inline",
        exports: "named",
      },
    ],
    plugins: [
      postcss({
        config: {
          path: "./postcss.config.js",
        },
        extensions: [".css"],
        minimize: true,
        inject: {
          insertAt: "top",
        },
        plugins: [tailwindcss(tailwindConfig)],
      }),
      peerDepsExternal(),
      resolve({ extensions }),
      typescript(),
    ],
  },
  {
    input: "./dist/esm/types/index.d.ts",
    output: [{ file: "dist/esm/index.d.ts", format: "es" }],
    plugins: [dts()],
    external: [/\.css$/, /\.scss$/],
  },
];

export default config;
