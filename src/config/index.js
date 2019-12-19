'use strict';

const path = require('path');

module.exports = {
    // TODO custom theme
    theme: path.resolve(__dirname, '../../theme/index.js'),
    plugins: {
        '@vuepress/back-to-top': true,
        '@vuepress/pwa': {
            serviceWorker: true,
            updatePopup: true,
        },
        '@vuepress/medium-zoom': true,
    },
};
