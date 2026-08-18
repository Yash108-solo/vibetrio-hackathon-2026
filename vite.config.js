import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    watch: {
      ignored: ['**/*.pdf', '**/*.log', '**/scratch/**', '**/.git/**']
    }
  }
}))
