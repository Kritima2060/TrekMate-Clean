import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from "dotenv";

dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
    define: {
    "process.env.VITE_REACT_APP_GEMINI_API_KEY": JSON.stringify(process.env.VITE_REACT_APP_GEMINI_API_KEY),
    "process.env.VITE_REACT_APP_OPENWEATHER_API_KEY": JSON.stringify(process.env.VITE_REACT_APP_OPENWEATHER_API_KEY),
    "process.env.VITE_REACT_APP_HUGGINGFACE_API_KEY": JSON.stringify(process.env.VITE_REACT_APP_HUGGINGFACE_API_KEY),
    "process.env.VITE_REACT_APP_GROQ_API_KEY": JSON.stringify(process.env.VITE_REACT_APP_GROQ_API_KEY),
    "process.env.VITE_PIXABAY_API_KEY": JSON.stringify(process.env.VITE_PIXABAY_API_KEY),
    "process.env.VITE_PEXELS_API_KEY": JSON.stringify(process.env.VITE_PEXELS_API_KEY),
    "process.env.VITE_FOURSQUARE_API_KEY": JSON.stringify(process.env.VITE_FOURSQUARE_API_KEY),
    "process.env.VITE_RAPIDAPI_KEY": JSON.stringify(process.env.VITE_RAPIDAPI_KEY),
  },
})
