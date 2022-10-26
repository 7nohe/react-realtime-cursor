import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import packageJson from "./package.json";

const config = {
  firebase: {
    entry: resolve(__dirname, "src/firebase.ts"),
    fileName: "firebase",
  },
  amplify: {
    entry: resolve(__dirname, "./src/amplify.ts"),
    fileName: "amplify",
  },
};

const currentConfig = config[process.env.BACKEND!];

if (currentConfig === undefined) {
  throw new Error("BACKEND is not defined or is not valid");
}

export default defineConfig({
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
  build: {
    lib: {
      ...currentConfig,
      name: "ReactRealtimeCursor",
      formats: ["cjs", "es"],
    },
    emptyOutDir: false,
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
