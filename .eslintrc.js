module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	env: {
		browser: true,
		node: true,
		es2021: true
	},
	extends: ['eslint:recommended', 'prettier'],
	plugins: ['prettier']
};
