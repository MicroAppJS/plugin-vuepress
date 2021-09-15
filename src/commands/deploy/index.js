'use strict';

module.exports = function(api, argv, opts) {
    const type = argv.type || 'github';

    const logger = api.logger;

    const { _ } = require('@micro-app/shared-utils');

    let chain = Promise.resolve();

    // before
    chain = chain.then(() => api.applyPluginHooks('beforeCommandVuepressDeploy', { type, argv, options: opts }));

    switch (type) {
        case 'github':
        {
            const githubCMD = require('./github');
            chain = chain.then(() => githubCMD(api, argv, opts));
            break;
        }
        default:
            if (type) {
                // 自定义类型
                const otherTypes = [].concat(api.applyPluginHooks('addCommandVuepressDeploy', []) || []);
                otherTypes.filter(item => item.type === type).reduce((_chain, item) => {
                    const run = item.run;
                    if (_.isFunction(run)) {
                        _chain = _chain.then(() => run(api, argv, opts));
                    }
                    return _chain;
                }, chain);
            }
            chain = chain.then(() => {
                logger.warn('[VP > Deploy]', `Not Found type: ${type}!`);
            });
            break;
    }

    // affter
    chain = chain.then(() => api.applyPluginHooks('afterCommandVuepressDeploy', { type, argv, options: opts }));

    return chain.then(() => {
        logger.success('[VP > Deploy]', 'Done!');
    }).catch(err => {
        logger.error('[VP > Deploy]', err);
    });
};
