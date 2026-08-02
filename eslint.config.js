import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';

// Apply typed rules only to source roots represented by the root project.
export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/node_modules/**',
      '**/*.spec.ts',
      '**/*.test.ts',
    ],
  },
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  sonarjs.configs.recommended,
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules: {
      // Existing violations remain visible without turning the first rollout red.
      '@typescript-eslint/consistent-type-assertions': [
        'warn',
        { assertionStyle: 'never' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/array-type': 'warn',
      'sonarjs/slow-regex': 'warn',
      'sonarjs/no-invariant-returns': 'warn',
      'sonarjs/regex-complexity': 'warn',
      'sonarjs/no-os-command-from-path': 'warn',
      'sonarjs/no-alphabetical-sort': 'warn',
      // no-floating-promises uses `void promise` for intentional fire-and-forget.
      // Sonar forbids that construct, so promise-safety takes precedence.
      'sonarjs/void-use': 'off',
    },
  },
  {
    files: ['scripts/**/*.ts', 'packages/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-base-to-string': 'error',
    },
  }
);
