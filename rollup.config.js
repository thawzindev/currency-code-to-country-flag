import typescript from "rollup-plugin-typescript2";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx", ".svg"],
    }),
    url({
      include: ["**/*.svg"],
      limit: Infinity, // Inline all SVGs as base64 data URLs
    }),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfig: "tsconfig.json",
    }),
    commonjs(),
    terser(),
  ],
  external: ["react", "react-dom"],
};
