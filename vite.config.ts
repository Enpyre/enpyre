import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Enpyre',
      fileName: (format) => `enpyre.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'pixi.js', 'ace-builds', 'react-ace'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'pixi.js': 'pixijs',
          'ace-build': 'aceBuilds',
          'react-ace': 'reactAce',
        },
      },
    },
  },
});
