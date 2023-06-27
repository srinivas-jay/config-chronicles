const postCssConfig = {
	plugins: [
		require('postcss-preset-env'), // for providing sensible defaults for PostCSS
		require('autoprefixer'), // for adding vendor prefixes to CSS rules
		require('cssnano') // for minifying CSS
	]
};

module.exports = postCssConfig;
