import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import browserslistToEsbuild from 'browserslist-to-esbuild'

export default defineConfig({
  base: '',
  plugins: [react(), viteTsconfigPaths()],
  server: {
    open: true,
    port: 3000,
  },
  optimizeDeps: {
    include: ['linked-dep']
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    },
    target: browserslistToEsbuild([
      ">= 0.5%",
      "last 2 major versions",
      "not dead",
      "Chrome >= 90",
      "Firefox >= 90",
      "Firefox ESR",
      "iOS >= 15",
      "Safari >= 15",
      "not Explorer <= 11"
    ]),
  },
});