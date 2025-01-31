import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa'

const manifest: Partial<ManifestOptions> | false = {
  "theme_color": "#388eff", "background_color": "#2EC6FE", "icons": [{ "purpose": "maskable", "sizes": "512x512", "src": "icon512_maskable.png", "type": "image/png" }, { "purpose": "any", "sizes": "512x512", "src": "icon512_rounded.png", "type": "image/png" }],
  "screenshots": [{
    "src": '/screenshots/desktop.png',
    sizes: "1472x811",
    type: 'image/png',
    form_factor: "wide"
  },

  {
    "src": '/screenshots/mobile.png',
    sizes: "499x861",
    type: 'image/png',
    form_factor: "narrow"
  }],
  "orientation": "any", "display": "standalone", "lang": "ru-RU", "name": "My first magic PWA", "short_name": "Magic PWA", "start_url": "/"
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    base: './',
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{html,css,js,ico,png,svg}'],
    },
    manifest: manifest, 
    srcDir: 'src', // Каталог, где хранится service worker
    filename: 'sw.js', // Имя выходного файла
    strategies: 'injectManifest', // 'injectManifest' generateSW
  })],
})
