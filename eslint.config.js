const ngrx = require('@ngrx/eslint-plugin/v9');
const eslintConfigPrettier = require('eslint-config-prettier');
const tseslint = require('typescript-eslint');

const config = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [...ngrx.configs.store, ...ngrx.configs.effects, ...ngrx.configs.operators],
    parser: '@typescript-eslint/parser',
    plugins: ['@angular-eslint', '@typescript-eslint'],
    rules: {
      '@ngrx/with-state-no-arrays-at-root-level': 'off',
      '@ngrx/prefer-effect-callback-in-block-statement': 'off',
      '@ngrx/use-consistent-global-store-name': ['error', '_store'],
      '@ngrx/select-style': ['error', 'method'],
      '@ngrx/no-multiple-actions-in-effects': 'off',
      '@ngrx/no-typed-global-store': 'off',
    },
  },
  {
    ignores: ['**/dist', 'node_modules', 'apis'],
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    // Rules for JS files
    rules: {},
  },
  {
    files: ['**/*.html'],
    // Rules for HTML files
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        project: ['tsconfig.json', 'tsconfig.app.json'],
        sourceType: 'module',
      },
    },
    // Override or add rules here
    rules: {
      '@angular-eslint/use-component-view-encapsulation': 'error',
      '@angular-eslint/directive-class-suffix': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'require',
        },
        {
          selector: 'memberLike',
          modifiers: ['public'],
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
        },
        {
          selector: 'property',
          format: null,
        },
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'signature',
            'public-static-field',
            'protected-static-field',
            'private-static-field',
            'public-decorated-field',
            'protected-decorated-field',
            'private-decorated-field',
            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',
            'constructor',
            'public-instance-method',
            'protected-instance-method',
            'private-instance-method',
          ],
        },
      ],
      'brace-style': ['error', '1tbs'],
      'comma-dangle': ['error', 'always-multiline'],
      'max-classes-per-file': ['error', 2],
      'no-empty': 'error',
      'no-multiple-empty-lines': 'error',
      'no-underscore-dangle': 'off',
      'max-len': 'off',
      'no-multi-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-body-style': 'off',
      'object-shorthand': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'newline-before-return': 'error',
    },
  },
  eslintConfigPrettier,
);

module.exports = config;
