'use strict';

module.exports = function extendVuepress(api, opts) {

    api.assertVersion('>=0.2.0');

    const registerMethods = require('./methods');
    registerMethods(api);

    const registerExtends = require('./extends');
    registerExtends(api, opts);

};
