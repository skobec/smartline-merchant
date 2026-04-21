import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        minify: false,           // НЕ минимизировать
        sourcemap: false,        // без sourcemap
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'src/pages/login.html'),
                orders: resolve(__dirname, 'src/pages/orders.html')
            }
        },
        outDir: 'dist',
        assetsDir: 'assets',
        cssCodeSplit: false      // Один CSS файл
    },
    server: {
        port: 3000,
        open: '/'
    }
});