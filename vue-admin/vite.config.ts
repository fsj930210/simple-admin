import path from 'node:path';

import vue from '@vitejs/plugin-vue';
import { visualizer } from 'rollup-plugin-visualizer';
import UnoCSS from 'unocss/vite';
import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const pwd = process.cwd();
  const envConfig = loadEnv(mode, pwd);

  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          AntDesignVueResolver({
            resolveIcons: true,
            importStyle: 'css-in-js',
          }),
        ],
        dts: path.resolve(pwd, 'src/types', 'auto-imports.d.ts'), // 指定自动导入函数TS类型声明文件路径
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            resolveIcons: true,
            importStyle: 'css-in-js',
          }),
        ],
        dts: path.resolve(pwd, 'src/types', 'components.d.ts'),
      }),
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
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
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
            vue: ['vue', 'vue-router', 'pinia'],
            antd: ['ant-design-vue'],
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  });
};
