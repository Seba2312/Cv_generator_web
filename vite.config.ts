import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// Read mysheetlink if it exists
let sheetLink = ''
try {
  if (fs.existsSync('./mysheetlink')) {
    sheetLink = fs.readFileSync('./mysheetlink', 'utf-8').trim()
  }
} catch (e) {
  // Ignore error
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __GOOGLE_SHEET_URL__: JSON.stringify(sheetLink)
  }
})
