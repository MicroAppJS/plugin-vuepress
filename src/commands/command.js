'use strict';

module.exports = (api, argv, opts) => {
    function autoCreateConfig() {
        return createConfig(api, argv, opts);
    }

    const logger = api.logger;

    let chain = Promise.resolve();

    chain = chain.then(() => autoCreateConfig());
    chain = chain.then(vuepressConfig => {

        if (argv._[0] === 'dev') { // refresh
            const { watchFiles } = require('../utils');
            watchFiles(vuepressConfig, target => {
                logger.info('REFRESH Config !!! --> ', target);
                if (target.endsWith('.js')) { // Bust cache.
                    delete require.cache[target];
                }
                vuepressConfig = autoCreateConfig();
            });
        }

        const OPTIONS = {
            sourceDir: vuepressConfig.sourceDir,
            siteConfig: new Proxy(vuepressConfig, {
                get(target, name) {
                    return vuepressConfig[name];
                },
            }),
        };

        return OPTIONS;
    });

    chain.then(OPTIONS => {
        const { CLI } = require('vuepress/lib/util');
        const registerCoreCommands = require('vuepress/lib/registerCoreCommands');
        const handleUnknownCommand = require('vuepress/lib/handleUnknownCommand');

        return CLI({
            async beforeParse(cli) {
                registerCoreCommands(cli, OPTIONS);
                await handleUnknownCommand(cli, OPTIONS);
                cli.version(require('../../package.json').version).help();
            },

            async afterParse(cli) {
                if (!process.argv.slice(2).length) {
                    cli.outputHelp();
                }

                if (process.env.MICRO_APP_TEST) {
                    logger.debug('MICRO_APP_TEST --> Exit!!!');
                    process.exit(0);
                }
            },
        });
    });

    return chain;
};

function createConfig(api, args, opts) {
    const { _, smartMerge } = require('@micro-app/shared-utils');
    const path = require('path');

    const vuepressConfig = api.vuepressConfig;
    vuepressConfig.sourceDir = args._ && args._[1] || vuepressConfig.sourceDir || '.';

    const loadConfig = require('@vuepress/core/lib/node/loadConfig');

    const vuepressDir = path.resolve(vuepressConfig.sourceDir, '.vuepress');
    const siteConfig = loadConfig(vuepressDir) || {};

    const customConfig = require('../config');
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
        require('../constants').FILENAMES.map(filename => path.resolve(api.root, filename))
    );

    api.logger.debug('vuepressConfig: ', JSON.stringify(config, false, 4));
    return config;
}

function injectWebpackAlias(resolveAlias, config) {
    resolveAlias.forEach(alias => {
        Object.keys(alias).forEach(aliasKey => {
            config.resolve.alias.set(aliasKey, alias[aliasKey]);
        });
    });
    return config;
}
