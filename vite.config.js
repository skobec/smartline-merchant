import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Автоматически находим все HTML в src/pages/
const pagesDir = resolve(__dirname, 'src/pages');
const input = {};
fs.readdirSync(pagesDir).forEach(file => {
    if (file.endsWith('.html')) {
        input[file.replace('.html', '')] = resolve(pagesDir, file);
    }
});

export default defineConfig({
    root: 'src',
    publicDir: resolve(__dirname, 'public'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        minify: false,
        sourcemap: false,
        cssCodeSplit: false,
        rollupOptions: {
            input,
            output: {
                entryFileNames: 'js/[name].js',
                chunkFileNames: 'js/[name].js',

                assetFileNames: (assetInfo) => {
                    const ext = assetInfo.name.split('.').pop();

                    if (/css/i.test(ext)) {
                        return 'css/[name][extname]';
                    }

                    if (/(png|jpe?g|svg|gif|webp)$/i.test(ext)) {
                        return 'images/[name][extname]';
                    }

                    if (/(woff2?|ttf|otf|eot)$/i.test(ext)) {
                        return 'fonts/[name][extname]';
                    }

                    return 'assets/[name][extname]';
                }
            }
        }
    },
    server: {
        port: 3000,
        open: '/pages/login.html'
    }
});