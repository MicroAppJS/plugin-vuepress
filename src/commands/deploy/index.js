'use strict';

module.exports = function(api, argv, opts) {
    const type = argv.type || 'github';

    const logger = api.logger;

    let chain = Promise.resolve();

    switch (type) {
        case 'github':
        {
            const githubCMD = require('./github');
            chain = chain.then(() => githubCMD(api, argv, opts));
            break;
        }
        default:
            chain = chain.then(() => {
                logger.warn('[VP > Deploy]', `Not Found type: ${type}!`);
            });
            break;
    }

    return chain.then(() => {
        logger.success('[VP > Deploy]', 'Done!');
    }).catch(err => {
        logger.error('[VP > Deploy]', err);
    });
};
