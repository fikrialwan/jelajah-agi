import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
    },
  },
  resolve: {
    alias: [{ find: "~", replacement: resolve(__dirname, "./src") }],
  },
});
