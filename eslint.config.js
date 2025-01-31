import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      'plugin:prettier/recommended', // Включаем Prettier
    ],
    files: ['/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error', // Обрабатывать ошибки Prettier как ошибки ESLint
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }], // Разрешить JSX только в TSX файлах
      'react/react-in-jsx-scope': 'off', // Не требуется для React 17+
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Предупреждать о console.log
      'no-unused-vars': 'off', // Отключаем правило для TypeScript
      '@typescript-eslint/no-unused-vars': ['warn'], // Включаем TypeScript правило для неиспользуемых переменных
    },
  },
);
