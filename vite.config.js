import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { vitePluginForArco } from '@arco-plugins/vite-vue';
import path from 'path';
import pkg from './package.json';

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  build: {
    sourcemap: true,
    outDir: path.resolve(__dirname, `../../electron-main/dist/apps/${pkg.name}`), // 指定输出目录
    assetsDir: 'assets', // 静态资源目录
    emptyOutDir: true, // 构建前清空输出目录
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
  plugins: [
    vue(),
    vitePluginForArco({
      style: 'css',
    }),
  ],
  server: {
    port: 7103,
    headers: {
      'access-control-allow-origin': '*',
    },
    proxy: {
      '/apps': {
        target: 'http://localhost:8080', // 目标服务器地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apps/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
