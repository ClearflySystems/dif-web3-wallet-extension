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
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    },
    target: browserslistToEsbuild([
      ">= 0.5%",
      "last 2 major versions",
      "not dead",
      "Chrome >= 60",
      "Firefox >= 60",
      "Firefox ESR",
      "iOS >= 12",
      "Safari >= 12",
      "not Explorer <= 11"
    ]),
  },
});