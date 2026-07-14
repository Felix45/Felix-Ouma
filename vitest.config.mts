import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      "server-only": new URL("./test/stubs/server-only.ts", import.meta.url).pathname,
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globalSetup: ["./test/global-setup.ts"],
    env: {
      DATABASE_URL: "file:./test.db",
      ADMIN_EMAIL: "felix@example.com",
      ADMIN_PASSWORD_HASH:
        "$2b$10$2pevYNInWxuuYSh9ibZY2umXAcLkexGh/vSbkL8dkRagfLeX4fRkG",
      AUTH_SECRET: "test-secret-for-vitest-only",
    },
  },
});
