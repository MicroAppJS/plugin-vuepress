'use strict';

module.exports = function(api, argv, opts) {
    const type = argv.type || 'post';
    const base = argv.base || 'posts';

    const logger = api.logger;
    logger.info('[VP > Create]', 'Start Create...');

    const path = require('path');
    const { fs } = require('@micro-app/shared-utils');

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

    switch (type) {
        case 'post':
        {
            const postCMD = require('./post');
            chain = chain.then(() => postCMD(api, argv, opts, BASE_ROOT));
            break;
        }
        default:
            chain = chain.then(() => {
                logger.warn('[VP > Create]', `Not Found type: ${type}!`);
            });
            break;
    }

    return chain.then(() => {
        logger.success('[VP > Create]', 'Done!');
    }).catch(err => {
        logger.error('[VP > Create]', err);
    });
};
