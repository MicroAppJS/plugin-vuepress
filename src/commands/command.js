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

    chain = chain.then(OPTIONS => {
        const { yUnParser } = require('@micro-app/shared-utils');
        const CAC = require('cac');
        const handleUnknownCommand = require('vuepress/lib/handleUnknownCommand');
        const registerCoreCommands = require('./lib/registerCoreCommands');

        const cli = CAC();
        return Promise.resolve()
            .then(() => registerCoreCommands(cli, OPTIONS))
            .then(() => handleUnknownCommand(cli, OPTIONS))
            .then(() => {
                const orginalArgv = process.argv.slice(0, 2).concat(yUnParser(argv));
                return cli.parse(orginalArgv, { run: false });
            })
            .then(() => {
                if (process.env.MICRO_APP_TEST) {
                    logger.debug('MICRO_APP_TEST --> Exit!!!');
                    return;
                }
                return cli.runMatchedCommand();
            });
    });

    return chain;
};
