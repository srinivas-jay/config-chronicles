const baseEsLintConfig = {
	env: {
		node: true,
		es2021: true
	},
	extends: ['eslint:recommended', 'prettier'],
	parserOptions: {
		ecmaVersion: 'latest'
	},
	plugins: ['prettier']
};

export default baseEsLintConfig;
