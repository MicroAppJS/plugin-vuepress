'use strict';

module.exports = (api, opts) => {

    const chalk = require('chalk');
    const path = require('path');
    const _ = require('lodash');

    api.registerCommand('vuepress', {
        description: 'enhance vuepress cli.',
        usage: 'micro-app-vuepress <command> [options]',
        options: {
            build: '在指定的目录生成一个静态站点.',
            dev: '启动一个开发服务器。来自 vuepress build 的所有选项都可用.',
            eject: '将默认主题复制到 .vuepress/theme 目录，以供自定义.',
        },
        details: `
Examples:
    ${chalk.gray('# dev')}
    micro-app-vuepress dev
          `.trim(),
    }, args => {
        const vuepressConfig = api.vuepressConfig;
        vuepressConfig.sourceDir = args._ && args._[1] || vuepressConfig.sourceDir || '.';

        const loadConfig = require('@vuepress/core/lib/node/loadConfig');
        const { smartMerge } = require('@micro-app/shared-utils');

        const vuepressDir = path.resolve(vuepressConfig.sourceDir, '.vuepress');
        const siteConfig = loadConfig(vuepressDir) || {};

        const customConfig = require('../../../constants/custom');
        const config = smartMerge({}, customConfig, vuepressConfig, siteConfig, opts);

        const microsConfig = api.microsConfig;
        const resolveAlias = Object.keys(microsConfig).map(key => {
            const microConfig = microsConfig[key];
            return microConfig.resolveAlias;
        });
        api.logger.debug('resolveAlias: ', JSON.stringify(resolveAlias, false, 4));

        // suppoer some webpackConfig
        const webpackConfig = _.isFunction(api.resolveWebpackConfig) ? api.resolveWebpackConfig() : false;

        if (config.chainWebpack && _.isFunction(config.chainWebpack)) {
            const orginalChainWebpack = config.chainWebpack;
            config.chainWebpack = function(config, isServer) {
                if (webpackConfig) {
                    return orginalChainWebpack(config.merge(webpackConfig), isServer);
                }
                return orginalChainWebpack(injectWebpackAlias(resolveAlias, config, isServer), isServer);
            };
        } else {
            config.chainWebpack = function(config, isServer) {
                if (webpackConfig) {
                    return config.merge(webpackConfig);
                }
                return injectWebpackAlias(resolveAlias, config, isServer);
            };
        }

        // watcher
        config.extraWatchFiles = (config.extraWatchFiles || []).concat(
            require('../../../constants').FILENAMES.map(filename => path.resolve(api.root, filename))
        );

        api.logger.debug('vuepressConfig: ', JSON.stringify(config, false, 4));
        return config;
    });

};

function injectWebpackAlias(resolveAlias, config) {
    resolveAlias.forEach(alias => {
        Object.keys(alias).forEach(aliasKey => {
            config.resolve.alias.set(aliasKey, alias[aliasKey]);
        });
    });
    return config;
}
