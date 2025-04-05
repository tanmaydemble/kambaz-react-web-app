import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// import { env } from 'process';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_REMOTE_SERVER': JSON.stringify(process.env.VITE_REMOTE_SERVER || 'http://localhost:4000'),
    'process.env': JSON.stringify(loadEnv(mode, process.cwd(), ''))
  }
}));
