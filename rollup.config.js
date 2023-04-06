import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import tailwind from "rollup-plugin-tailwindcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const packageJson = await import("./package.json", {
  assert: {
    type: "json",
  },
});

const extensions = [".js", ".ts", ".jsx", ".tsx", ".svg"];

const config = {
  input: "src/index.ts",
  output: [
    {
      dir: packageJson.main,
      format: "cjs",
      sourcemap: "inline",
    },
    {
      dir: packageJson.module,
      format: "esm",
      sourcemap: "inline",
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ extensions }),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    tailwind({
      input: "./src/tailwind-entry.css",
    }),
  ],
};

export default config;
