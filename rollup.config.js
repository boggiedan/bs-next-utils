import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import tailwind from 'rollup-plugin-tailwindcss';
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const packageJson = await import("./package.json", {
    assert: {
        type: "json"
    }
});

export default {
    input: "src/index.ts",
    output: [
        {
            file: packageJson.main,
            format: "cjs",
            sourcemap: 'inline',
        },
        {
            file: packageJson.module,
            format: "esm",
            sourcemap: 'inline',
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" }),
        tailwind({
            input: './src/tailwind-entry.css',
        }),
    ],
}