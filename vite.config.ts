import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: '/react-admin',
    define: {
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
      PERSIST_KEY: JSON.stringify(env.VITE_PERSIST_KEY),
      SECRET_KEY: JSON.stringify(env.VITE_SECRET_KEY),
    },
  };
});
