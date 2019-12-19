'use strict';

module.exports = (api, argv, opts) => {
    const createConfig = require('./createConfig');

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
