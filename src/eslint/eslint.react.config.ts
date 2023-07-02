import baseConfig from './eslintbase';

const reactEslintConfig = {
	...baseConfig,
	extends: [
		...baseConfig.extends,
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: [
		...baseConfig.plugins,
		'react',
		'react-hooks',
		'@typescript-eslint',
		'react-refresh'
	],
	env: {
		browser: true,
		es6: true,
		node: true
	},
	settings: {
		react: {
			version: '18.x'
		}
	},
	rules: {
		'@typescript-eslint/ban-ts-comment': 'off',
		'react/react-in-jsx-scope': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'react/display-name': 'off',
		'no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_'
			}
		],
		'no-debugger': 'warn',
		'no-alert': 'warn',
		'no-await-in-loop': 'off',
		'arrow-body-style': ['error', 'as-needed'],
		'prefer-destructuring': [
			'error',
			{
				object: true,
				array: false
			}
		]
	}
};

export default reactEslintConfig;
