import tseslint from 'typescript-eslint';

const sharedRestrictedImports = [
  {
    group: ['lodash', 'lodash/*', 'lodash-es'],
    message: 'This repo is stdlib-first (see AGENTS.md).',
  },
  {
    group: ['../../*'],
    message: 'No deep relative imports; use the package name across packages (see AGENTS.md).',
  },
];

export default tseslint.config(
  { ignores: ['**/node_modules/**', 'coverage/**'] },
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: 'Use a union type instead of an enum (see AGENTS.md).',
        },
      ],
      'no-restricted-imports': ['error', { patterns: sharedRestrictedImports }],
    },
  },
  {
    files: ['packages/core/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            ...sharedRestrictedImports,
            {
              group: ['node:*'],
              message: 'core stays pure: no Node built-ins (see packages/core/AGENTS.md).',
            },
          ],
        },
      ],
    },
  },
);
