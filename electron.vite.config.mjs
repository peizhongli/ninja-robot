import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@hooks': resolve('src/renderer/src/hooks'),
        '@components': resolve('src/renderer/src/components'),
        '@api': resolve('src/renderer/src/api'),
        '@utils': resolve('src/renderer/src/utils')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "@renderer/assets/styles/global.less";'
        }
      }
    },
    plugins: [react()]
  }
})
