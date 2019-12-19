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
                logger.warn('[VuePress > Deploy]', `Not Found type: ${type}!`);
            });
            break;
    }

    return chain.then(() => {
        logger.success('[VuePress > Deploy]', 'Done!');
    }).catch(err => {
        logger.error('[VuePress > Deploy]', err);
    });
};
