import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
// https://vite.dev/config/
dotenv.config();
console.log('ENV từ dotenv:', process.env.VITE_API_URL);
export default defineConfig({
  plugins: [react()],
  base: './',
})
