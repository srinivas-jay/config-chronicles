import * as webpack from 'webpack';
import { merge } from 'webpack-merge';
import {
	getModuleFederationConfig,
	getEnvironmentVariables,
	getSingleSpaConfig
} from './webpack.helper';

import type { NxConfigs, NxOptions, ProjectConfigs } from './webpack.types';

const getWebpackNxConfigs = (
	nxConfigs: NxConfigs,
	nxOptions: NxOptions,
	projectConfigs: ProjectConfigs
): webpack.Configuration => {
	const PROD_CONFIGS = new Set([
		'webpackProd',
		'singleSpaProd',
		'standAloneProd',
		'production'
	]);
	const buildMode = PROD_CONFIGS.has(nxOptions.configuration)
		? 'production'
		: 'development';

	const baseConfig = {
		buildMode: buildMode as webpack.Configuration['mode']
	};

	const mfConfig = {
		...projectConfigs.moduleFederationConfigs,
		...baseConfig
	};

	const singleSpaConfigs = {
		...projectConfigs.singleSpaConfigs,
		...baseConfig
	};

	const commonConfig: webpack.Configuration = {
		plugins: [
			new webpack.DefinePlugin({
				...getEnvironmentVariables(buildMode)
			}),
			new webpack.container.ModuleFederationPlugin(
				getModuleFederationConfig(mfConfig)
			)
		]
	};

	const mergedConfig = merge(nxConfigs, commonConfig);

	const configurations: Record<string, () => webpack.Configuration> = {
		webpackDev: () => mergedConfig,
		webpackProd: () => mergedConfig,
		standAlone: () => mergedConfig,
		standAloneProd: () => mergedConfig,
		singleSpa: () =>
			getSingleSpaConfig({
				nxWebpackConfigs: nxConfigs,
				...singleSpaConfigs
			}),
		singleSpaProd: () =>
			getSingleSpaConfig({
				nxWebpackConfigs: nxConfigs,
				...singleSpaConfigs
			})
	};

	return configurations[nxOptions.configuration]?.() || nxConfigs;
};

export default getWebpackNxConfigs;
