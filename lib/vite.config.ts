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
        name: 'Pyongine',
        formats: ['es', 'umd'],
        fileName: (format) => `pyongine.${format}.js`,
    },
    rollupOptions: {
        external: [
          'react',
          'react-dom',
          '@inlet/react-pixi',
          'pyodide',
          'pixi.js',
          'error-stack-parser',
        ],
        output: {
            inlineDynamicImports: true,
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                'styled-components': 'styled',
                '@inlet/react-pixi': 'ReactPIXI',
                pyodide: 'pyodide',
                'pixi.js': 'pixijs',
                'error-stack-parser': 'errorStackParser',
            },
        },
    },
  },
})
