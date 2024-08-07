import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
// https://vitejs.dev/config/
const aliases = {
  '/@/': path.resolve(__dirname, 'src') // Replace 'src' with your actual source directory
};

export default defineConfig({

  plugins: [react()],
  resolve: {
    alias: aliases
  }
})
