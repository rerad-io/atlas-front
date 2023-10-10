import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import gzipPlugin from "rollup-plugin-gzip";
import analyze from "rollup-plugin-analyzer";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/atlas",
  plugins: [react()],
  build: {
    sourcemap: true,
    // TODO: Turn on minification for production
    minify: false,
    rollupOptions: {
        output: {
            plugins: [
                gzipPlugin(),
                analyze({
                    // show top 8 high files
                    limit: 8,
                    hideDeps: true,
                }),
            ],
        },
    },
},
  css: {
    preprocessorOptions: {
        scss: {
            additionalData: '@import "./src/styles/mixins/_colors.scss";@import "./src/styles/mixins/_mixins.scss";',
        },
    },
},
})
