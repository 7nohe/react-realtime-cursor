import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import packageJson from "./package.json";

export default defineConfig({
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ReactRealtimeCursor",
      fileName: "react-realtime-cursor",
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external:
        [
          ...Object.keys(packageJson.devDependencies),
          "firebase/database",
          "firebase/auth",
        ] || [],
      output: {
        globals: {
          react: "React",
          "aws-amplify": "awsAmplify",
        },
      },
    },
  },
  plugins: [dts()],
});
