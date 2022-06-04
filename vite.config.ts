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
      formats: ['es', 'umd'],
      fileName: (format) => `enpyre.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'pyodide',
        'pixi.js',
        'error-stack-parser',
        'ace-builds',
        'react-ace',
      ],
      output: {
        inlineDynamicImports: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
          pyodide: 'pyodide',
          'pixi.js': 'pixijs',
          'error-stack-parser': 'errorStackParser',
          'ace-build': 'aceBuilds',
          'react-ace': 'reactAce',
        },
      },
    },
  },
});
