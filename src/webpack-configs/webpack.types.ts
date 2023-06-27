import * as webpack from 'webpack';

export type NxConfigs = webpack.Configuration;

export interface NxOptions {
	configuration: string;
}

export type PeerDependencies = Record<string, string>;

export interface ProjectConfigs {
	moduleFederationConfigs: {
		libraryName: string;
		filename: string;
		packageName: string;
		exposes: Record<string, string>;
		remotes: Record<string, string>;
		allowSharedDependencies: boolean;
		peerDependencies: PeerDependencies;
	};
	singleSpaConfigs: {
		libraryName: string;
		buildMode: string;
		externals: string[];
	};
}

export type ModuleFederationPluginOptions = ConstructorParameters<
	typeof webpack.container.ModuleFederationPlugin
>[0];

export interface ModuleFederationConfigOptions {
	libraryName: string;
	filename: string;
	packageName: string;
	exposes?: Record<string, string>;
	remotes?: Record<string, string>;
	allowSharedDependencies?: boolean;
	peerDependencies: PeerDependencies;
}

export interface SingleSpaConfigOptions {
	nxWebpackConfigs: webpack.Configuration;
	libraryName: string;
	buildMode?: webpack.Configuration['mode'];
	externals?: string[];
}
