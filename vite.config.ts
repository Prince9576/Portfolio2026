import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            if (
              id.includes("three") ||
              id.includes("@react-three/fiber") ||
              id.includes("@react-three/drei")
            ) {
              return "three-vendor";
            }
            if (
              id.includes("@react-three/postprocessing") ||
              id.includes("postprocessing")
            ) {
              return "postprocessing-vendor";
            }
            if (id.includes("gsap")) {
              return "animation-vendor";
            }
            if (id.includes("lucide-react")) {
              return "icons-vendor";
            }
            // Other node_modules go into a separate chunk
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: "esbuild",
    target: "esnext",
    cssMinify: true,
    sourcemap: false,
    reportCompressedSize: false,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "three"],
    exclude: ["leva"],
  },
});
