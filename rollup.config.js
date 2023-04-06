import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import tailwind from "rollup-plugin-tailwindcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const extensions = [".js", ".ts", ".jsx", ".tsx", ".svg", ".css"];

const config = {
  input: "src/index.ts",
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
      input: "./src/tailwind-entry.css",
      purge: false,
    }),
    resolve({ extensions }),
    typescript(),
  ],
};

export default config;
