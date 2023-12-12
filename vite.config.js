import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { esbuildDecorators } from '@anatine/esbuild-decorators';

export default defineConfig({
  base: '',
  plugins: [
    react(),
    viteTsconfigPaths()
  ],
  server: {
    open: true,
    port: 3001,
  },
  //optimizeDeps: {
  //  include: ['linked-dep']
  //},
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        esbuildDecorators({
          tsconfig: './tsconfig.json',
        }),
      ],
    },
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