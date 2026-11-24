import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    env: {
      PIN: "test-pin-123456",
      JWT_SECRET: "test-secret-0123456789abcdef0123456789abcdef",
    },
  },
});
