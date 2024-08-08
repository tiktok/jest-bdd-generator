import { moduleTools, defineConfig } from '@modern-js/module-tools';

export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: [{
    input: {index:'./index.tsx'},
    format: 'umd',
    platform: 'browser',
    buildType: 'bundle',
    outDir: './dist',
    autoExternal: false,
    externals: ['fs', 'path', 'perf_hooks']
  }]
});
