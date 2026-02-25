import detemiroStrictConfig from 'eslint-config-detemiro/configs/strict.mjs'

export default [
  {
    ignores: [
      '.commitlintrc.ts',
      '.prettierrc.js',
      'apps/action-manager/.prettierrc.js',
      'libs/db-adapter/prisma.config.ts',
      'libs/db-adapter/prisma/seed.ts',
      'libs/db-adapter/tsup.config.ts',
    ],
  },
  ...detemiroStrictConfig,
]
