import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// host: true lets your phone open the dev server over Wi-Fi
export default defineConfig({ plugins: [react()], server: { host: true } })
