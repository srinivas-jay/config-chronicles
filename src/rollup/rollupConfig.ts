import type { RollupOptions } from 'rollup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import tailwindcss from 'tailwindcss';

interface RollupConfigOptions {
	isNode?: boolean;
	inputPath: string;
	sourceMap?: boolean;
	outputFileName: string;
	tsConfigPath?: string;
	isPeerDepsExternal?: boolean;
	optimization?: boolean;
	extractCss?: boolean;
	optionalPlugins?: any[];
	tailwindcssConfigPath?: string;
}

const getRollupConfig = ({
	isNode = false,
	inputPath,
	outputFileName,
	tsConfigPath,
	sourceMap = true,
	isPeerDepsExternal = true,
	optimization = true,
	extractCss = false,
	optionalPlugins = [],
	tailwindcssConfigPath
}: RollupConfigOptions): RollupOptions => {
	const basePlugins = [
		nodeResolve(),
		commonjs(),
		json(),
		image(),
		!isNode &&
			postcss({
				extensions: ['.css'],
				minimize: optimization,
				sourceMap: sourceMap,
				extract: extractCss,
				plugins: tailwindcssConfigPath
					? [tailwindcss(tailwindcssConfigPath)]
					: []
			}),
		tsConfigPath &&
			typescript({ tsconfig: tsConfigPath, sourceMap: sourceMap }),
		isPeerDepsExternal && peerDepsExternal(),
		optimization && terser(),
		...optionalPlugins
	].filter(Boolean);

	return {
		input: inputPath,
		output: [
			{
				file: outputFileName,
				format: isNode ? 'cjs' : 'esm',
				sourcemap: sourceMap
			}
		],
		plugins: basePlugins
	};
};

export default getRollupConfig;
