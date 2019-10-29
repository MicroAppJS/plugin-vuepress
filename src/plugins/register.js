'use strict';

const path = require('path');

const extendConfigs = [
    {
        name: 'vuepress',
        description: '针对 vuepress 配置信息进行扩展.',
    },
];

const commands = [
    {
        name: 'vuepress',
        description: '合并所有 vuepress 配置.',
    },
];

module.exports = function(service) {

    extendConfigs.forEach(item => {
        const name = item.name;
        const description = item.description;
        service.registerPlugin({
            id: `vuepress-cli:plugins-extends-${name}`,
            link: path.resolve(__dirname, './extends', name),
            description,
        });
    });

    commands.forEach(item => {
        const name = item.name;
        const description = item.description;
        service.registerPlugin({
            id: `vuepress-cli:plugins-commands-${name}`,
            link: path.resolve(__dirname, './commands', name),
            description,
        });
    });

};
