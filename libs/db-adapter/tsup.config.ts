import { defineConfig } from 'tsup'
import { copy } from 'esbuild-plugin-copy'

const copyPlugin = copy({
  assets: [
    { from: './src/generated/schema.prisma', to: '.' },
    { from: './src/generated/*.node', to: '.' },
  ],
})

export default defineConfig({
  entry: ['src/index.ts', 'prisma/seed.ts'],
  minify: true,
  skipNodeModulesBundle: true,
  ignoreWatch: ['node_modules', 'dist'],
  sourcemap: true,
  clean: false,
  esbuildPlugins: [copyPlugin],
})
