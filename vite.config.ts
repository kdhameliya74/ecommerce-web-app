import { defineConfig, AliasOptions } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
const root = path.resolve(__dirname, './src');

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@': root,
        } as AliasOptions,
    },
});
