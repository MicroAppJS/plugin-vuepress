'use strict';

module.exports = function createConfig(api, args, opts) {
    const { _, smartMerge } = require('@micro-app/shared-utils');
    const path = require('path');

    const vuepressConfig = api.vuepressConfig;
    const sourceDir = args._ && args._[1] || vuepressConfig.sourceDir || '.';
    const root = vuepressConfig.root;
    vuepressConfig.sourceDir = path.resolve(root, sourceDir);

    const loadConfig = require('@vuepress/core/lib/node/loadConfig');

    // const vuepressDir = api.resolveWorkspace('.vuepress'); // 不能使用，vuepress内部代码太乱
    const vuepressDir = path.resolve(vuepressConfig.sourceDir, '.vuepress');
    const siteConfig = loadConfig(vuepressDir) || {};

    const customConfig = require('../config');
    const config = smartMerge({}, customConfig, siteConfig, vuepressConfig, opts, _.pick(args, [ 'base' ]));
    config.root = root;
    // reset vuepressDir
    config.vuepressDir = vuepressDir;
    config.cacheDir = path.resolve(api.tempDir, '.cache');
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

    // blog
    const blogConfig = config.themeConfig && config.themeConfig.blogConfig || {};
    const postsDir = blogConfig.postsDir || 'posts';
    config.extraWatchFiles.push(postsDir); // add watcher files

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
