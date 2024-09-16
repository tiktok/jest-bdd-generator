import { moduleTools, defineConfig, PartialBaseBuildConfig } from '@modern-js/module-tools';

export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: [
    {
      input: ['src/*.tsx'],
      format: 'umd',
      platform: 'browser',
      buildType: 'bundle',
      dts: false,
      outDir: './dist',
      autoExternal: false,
      externals: ['fs', 'path', 'perf_hooks'],
      copy: {
        patterns: [{ from: './*.html' }]
      }
    }
  ]
});
