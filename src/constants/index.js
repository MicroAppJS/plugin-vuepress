'use strict';

const NAME = 'vuepress';

module.exports = {
    NAME,
    FILENAMES: [
        'micro-app.config.js',
        'micro-app.extra.config.js',
        `micro-app.${NAME}.config.js`,
        'microapp/config.js',
        'microapp/extra.config.js',
        `microapp/${NAME}.config.js`,
        'microapp/config/index.js',
        'microapp/config/extra.js',
        `microapp/config/${NAME}.js`,
    ],
};
