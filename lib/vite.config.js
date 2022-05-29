const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Pyongine',
      fileName: (format) => `pyongine.${format}.js`,
    }
  },
  rollupOptions: {
    external: ['react', 'react-dom']
  },
  plugins: [react()]
})
