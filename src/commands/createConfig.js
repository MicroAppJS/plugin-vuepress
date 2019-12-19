'use strict';

module.exports = function createConfig(api, args, opts) {
    const { _, smartMerge } = require('@micro-app/shared-utils');
    const path = require('path');

    const root = api.root;

    const vuepressConfig = api.vuepressConfig;
    vuepressConfig.sourceDir = args._ && args._[1] || vuepressConfig.sourceDir || '.';

    const loadConfig = require('@vuepress/core/lib/node/loadConfig');

    const vuepressDir = path.resolve(root, vuepressConfig.sourceDir, '.vuepress');
    const siteConfig = loadConfig(vuepressDir) || {};

    const customConfig = require('../config');
    const config = smartMerge({}, customConfig, siteConfig, vuepressConfig, opts, _.pick(args, [ 'base' ]));
    // reset dest
    config.dest = path.resolve(vuepressConfig.sourceDir, config.dest);

    const options = api.config || {};
    const resolveAlias = options.resolveAlias || {};
    const resolveShared = options.resolveShared || {};
    const nodeModulesPaths = options.nodeModulesPaths || [];

    api.logger.debug('resolveAlias: ', JSON.stringify(resolveAlias, false, 4));
    api.logger.debug('resolveShared: ', JSON.stringify(resolveShared, false, 4));

    if (config.chainWebpack && _.isFunction(config.chainWebpack)) {
        const orginalChainWebpack = config.chainWebpack;
        config.chainWebpack = function(config, isServer) {
            if (isServer) {
                return orginalChainWebpack(injectWebpackAlias(config, resolveShared, nodeModulesPaths), isServer);
            }
            return orginalChainWebpack(injectWebpackAlias(config, resolveAlias, nodeModulesPaths), isServer);
        };
    } else {
        config.chainWebpack = function(config, isServer) {
            if (isServer) {
                return injectWebpackAlias(config, resolveShared, nodeModulesPaths);
            }
            return injectWebpackAlias(config, resolveAlias, nodeModulesPaths);
        };
    }

    // watcher
    config.extraWatchFiles = (config.extraWatchFiles || []).concat(
        require('../constants').FILENAMES.map(filename => path.resolve(api.root, filename))
    );

    api.logger.debug('vuepressConfig: ', JSON.stringify(config, false, 4));
    return config;
};

function injectWebpackAlias(config, alias, nodeModulesPaths) {
    config.resolve
        .modules
        .merge(nodeModulesPaths)
        .end()
        .alias
        .merge(alias);
    return config;
}
