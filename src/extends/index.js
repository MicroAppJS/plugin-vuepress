'use strict';

module.exports = function extendVuepress(api, opts) {

    api.assertVersion('>=0.2.0');

    const registerMethods = require('./methods');
    registerMethods(api);

    const registerExtends = require('./extends');
    registerExtends(api, opts);

};


module.exports.configuration = {
    description: '针对 vuepress 配置信息进行扩展.',
};
