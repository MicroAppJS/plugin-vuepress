'use strict';

module.exports = function(api, argv, opts) {
    const type = argv.type || 'post';
    const base = argv.base || 'posts';

    const logger = api.logger;
    logger.info('[VP > Create]', 'Start Create...');

    const { fs, _, path } = require('@micro-app/shared-utils');

    let chain = Promise.resolve();

    const root = api.root;
    const createConfig = require('../createConfig');
    const vuepressConfig = createConfig(api, argv, opts);
    const docsDirRoot = path.resolve(root, vuepressConfig.sourceDir);

    const BASE_ROOT = path.resolve(docsDirRoot, base);

    chain = chain.then(() => {
        if (!fs.existsSync(BASE_ROOT)) {
            throw `Not Found "${BASE_ROOT}"!`;
        }
        logger.info('[VP > Create]', 'Base:', BASE_ROOT);
    });

    // before
    chain = chain.then(() => api.applyPluginHooks('beforeCommandVuepressCreate', { type, argv, options: opts, base: BASE_ROOT }));

    switch (type) {
        case 'post':
        {
            const postCMD = require('./post');
            chain = chain.then(() => postCMD(api, argv, opts, BASE_ROOT));
            break;
        }
        default:
            if (type) {
                // 自定义类型
                const otherTypes = [].concat(api.applyPluginHooks('addCommandVuepressCreate', []) || []);
                otherTypes.filter(item => item.type === type).reduce((_chain, item) => {
                    const run = item.run;
                    if (_.isFunction(run)) {
                        _chain = _chain.then(() => run(api, argv, opts, BASE_ROOT));
                    }
                    return _chain;
                }, chain);
            }
            chain = chain.then(() => {
                logger.warn('[VP > Create]', `Not Found type: ${type}!`);
            });
            break;
    }

    // affter
    chain = chain.then(() => api.applyPluginHooks('afterCommandVuepressCreate', { type, argv, options: opts, base: BASE_ROOT }));

    return chain.then(() => {
        logger.success('[VP > Create]', 'Done!');
    }).catch(err => {
        logger.error('[VP > Create]', err);
    });
};
