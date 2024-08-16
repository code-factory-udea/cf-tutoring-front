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
    },
  },
  server: {
    host: "localhost",
    port: 3000,
  },
});

