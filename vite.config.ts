import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    hmr: {
      host: "192.168.18.9",
      clientPort: 8080,
    },
  },
});
