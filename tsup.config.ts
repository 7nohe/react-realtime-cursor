import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  format: ["cjs", "esm"],
  entry: ["src/index.ts"],
  dts: true,
});
