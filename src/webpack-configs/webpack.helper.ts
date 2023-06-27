import * as webpack from 'webpack';
import { merge } from 'webpack-merge';

// @ts-ignore
import SystemJSPublicPathPlugin from 'systemjs-webpack-interop/SystemJSPublicPathWebpackPlugin';

import type {
	PeerDependencies,
	ModuleFederationConfigOptions,
	SingleSpaConfigOptions,
	ModuleFederationPluginOptions
} from './webpack.types';

const createSharedDependencies = (
	peerDependencies: PeerDependencies
): Record<string, object> => {
	const sharedDependencies: Record<string, object> = {};
	for (const dependency in peerDependencies) {
		sharedDependencies[dependency] = {
			singleton: true,
			requiredVersion: peerDependencies[dependency]
		};
	}
	return sharedDependencies;
};

const getModuleFederationConfig = ({
	libraryName,
	filename,
	packageName,
	exposes = {},
	remotes = {},
	allowSharedDependencies = false,
	peerDependencies
}: ModuleFederationConfigOptions): ModuleFederationPluginOptions => ({
	name: packageName,
	library: { type: 'var', name: libraryName },
	filename: filename,
	exposes: exposes,
	remotes: remotes,
	shared: allowSharedDependencies
		? createSharedDependencies(peerDependencies)
		: {}
});

const getEnvironmentVariables = (
	buildMode = 'production'
): Record<string, any> => {
	const envConfigurations: Record<string, string> = {};
	for (const key in process.env) {
		envConfigurations[key] = JSON.stringify(process.env[key]);
	}
	envConfigurations['NX_NODE_ENV'] = JSON.stringify(buildMode);
	return envConfigurations;
};

const getSingleSpaConfig = ({
	nxWebpackConfigs,
	libraryName,
	buildMode = 'production' as webpack.Configuration['mode'],
	externals = ['single-spa']
}: SingleSpaConfigOptions): webpack.Configuration =>
	merge(nxWebpackConfigs, {
		output: {
			uniqueName: libraryName,
			devtoolNamespace: libraryName,
			library: {
				type: 'system',
				name: libraryName
			},
			path: nxWebpackConfigs.output
				? nxWebpackConfigs.output.path
				: 'dist'
		},
		externals: externals,
		plugins: [
			new SystemJSPublicPathPlugin({
				systemjsModuleName: libraryName
			}),
			new webpack.DefinePlugin({
				...getEnvironmentVariables(buildMode)
			})
		]
	});

export {
	getModuleFederationConfig,
	getEnvironmentVariables,
	getSingleSpaConfig
};
