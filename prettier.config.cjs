'use strict';

/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 100,
  // Plugins
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  // Sorted imports (React → libraries → local)
  importOrder: ['^react', '^@mui/(.*)$', '^@?\\w', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
