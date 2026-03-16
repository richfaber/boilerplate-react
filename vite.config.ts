import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    ViteImageOptimizer({
      jpg: { quality: 80 },
      jpeg: { quality: 80 },
      png: { quality: 80 },
      gif: { optimizationLevel: 3 },
      svg: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'cleanupIDs', active: false },
        ]
      },
      webp: { quality: 80 },
    })
  ],
})
