import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 3000, open: true },
  resolve: {
    alias: [
      { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@app-config', replacement: path.resolve(__dirname, 'src/app-config') },
      { find: '@contexts', replacement: path.resolve(__dirname, 'src/lib/contexts') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/lib/hooks') },
      { find: '@constants', replacement: path.resolve(__dirname, 'src/lib/constants') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/lib/utils') },
      { find: '@hoc', replacement: path.resolve(__dirname, 'src/lib/hoc') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@views', replacement: path.resolve(__dirname, 'src/views') },
      { find: '@layouts', replacement: path.resolve(__dirname, 'src/layouts') },
      { find: '@store', replacement: path.resolve(__dirname, 'src/store') },
      { find: '@app-types', replacement: path.resolve(__dirname, 'src/types') },
      { find: '@routes', replacement: path.resolve(__dirname, 'src/routes') },
      { find: '@lib', replacement: path.resolve(__dirname, 'src/lib') },
      { find: '@locales', replacement: path.resolve(__dirname, 'src/locales') },
    ],
  },
});
