import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@axios": path.resolve(__dirname, './src/axios'),
      "@components": path.resolve(__dirname, './src/components'),
      "@services": path.resolve(__dirname, './src/services'),
      "@hooks": path.resolve(__dirname, './src/hooks'),
      "@utils": path.resolve(__dirname, './src/utils'),
      "@assets": path.resolve(__dirname, './src/assets'),
      "@interfaces": path.resolve(__dirname, './src/interfaces'),
      "@pages": path.resolve(__dirname, './src/pages'),
      "@context": path.resolve(__dirname, './src/context'),
      "@ui": path.resolve(__dirname, './src/ui'),
    },
  },
  server: {
    https: {
      key: 'codefact-2024.key',
      cert: 'codefact-2024.crt',
    },
    host: "0.0.0.0",
    port: 3000,
  },
});

