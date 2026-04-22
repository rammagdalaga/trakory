import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["@tanstack/react-router"],
          ui: ["lucide-react"],
        },
      },
    },
    // Compress with gzip
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Report compressed size
    reportCompressedSize: true,
    // Chunk size warning limit
    chunkSizeWarningLimit: 500,
  },
  server: {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  },
});
