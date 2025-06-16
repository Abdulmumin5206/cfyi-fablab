import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { imagetools } from 'vite-imagetools';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    imagetools({
      defaultDirectives: new URLSearchParams([
        ['format', 'webp'],
        ['quality', '80'],
      ])
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    modulePreload: {
      polyfill: true
    },
    rollupOptions: {
      output: {
        format: 'es',
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    assetsInlineLimit: 4096, // 4kb
    cssCodeSplit: true,
    minify: 'esbuild',
    sourcemap: true
  }
}));
