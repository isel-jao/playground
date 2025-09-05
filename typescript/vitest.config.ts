import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/**/*.ts"],
      exclude: [
        // "src/main.ts",
        "**/*types.ts",
        "**/*.d.ts",
        "src/config/env.ts",
        "src/config/index.ts",
        "src/main.ts",
      ],
    },
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
