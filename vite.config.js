import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import html from 'vite-plugin-html'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    html({
      inject: {
        injectData: {
          title: 'vite-plugin-html-example',
          injectScript: '<script src="./inject.js"></script>'
        }
      },
      minify: true
    })
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'), // 根路径
      '@': path.resolve(__dirname, 'src') // src 路径
    }
  }
})
