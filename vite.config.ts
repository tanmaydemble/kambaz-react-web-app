import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    'process.env': JSON.stringify(loadEnv(mode, process.cwd(), ''))
  }
}));
