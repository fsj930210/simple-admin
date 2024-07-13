import path from 'node:path';

import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import UnoCSS from 'unocss/vite';
import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const envConfig = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      react(),
      // gz包
      {
        ...viteCompression(),
        apply: 'build',
      },
      // 分析生成包的大小
      visualizer({
        open: true,
      }),
      UnoCSS(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    base: envConfig.VITE_BASE_URL,
    server: {
      port: Number(envConfig.VITE_APP_PORT),
      proxy: {
        [envConfig.VITE_BASE_API_PATH]: {
          target: envConfig.VITE_BASE_API_ORIGIN,
          changeOrigin: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/index.scss";',
        },
      },
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom', 'zustand'],
            antd: ['antd'],
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  });
};
