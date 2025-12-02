/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const dirname = typeof __dirname !== 'undefined' ? __dirname : fileURLToPath(new URL('.', import.meta.url));

// Library build configuration
const libraryConfig = defineConfig({
  plugins: [react(), tailwind()],
  build: {
    lib: {
      entry: {
        index: resolve(dirname, 'lib/index.ts'),
        hydration: resolve(dirname, 'lib/hydration.tsx'),
      },
      name: 'UiLibrary',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'mjs' : 'cjs';
        return entryName === 'index' 
          ? `ui-library.${ext}` 
          : `${entryName}.${ext}`;
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
        assetFileNames: 'style.css',
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
});

// App/Storybook development configuration
const appConfig = defineConfig({
  plugins: [react(), tailwind()],
  test: {
    projects: [{
      extends: true,
      plugins: [
        storybookTest({
          configDir: resolve(dirname, '.storybook')
        })
      ],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  }
});

// Export library config by default, app config when building for dev/storybook
export default process.env.BUILD_LIB === 'true' ? libraryConfig : appConfig;