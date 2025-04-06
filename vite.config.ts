import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/pomodoro/',
  test: {
    globals: true,
    environment: "jsdom", // Necesario para testear el DOM en React
    setupFiles: "./setupTests.ts", // Archivo opcional para configurar Testing Library
  },
})
