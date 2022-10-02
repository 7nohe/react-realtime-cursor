import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@7nohe/react-realtime-cursor": path.resolve(
        __dirname,
        "../../src/index.ts"
      ),
    },
  },
  define: {
    global: {},
  },
});
