import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/', 
  plugins: [
    react(),
    {
      name: "load+transform-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) {
          return null;
        }
        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic",
        });
      },
    },
  ],
  optimizeDeps: {
    // exclude: ["recaptcha-v3"],
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  server: 5177,
  build: {
    outDir: 'dist',
    sourcemap: false, 
  },
});