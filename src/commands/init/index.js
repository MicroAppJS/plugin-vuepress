'use strict';

module.exports = function initCommand(api, opts) {

    const { prompt } = require('@micro-app/shared-utils');

    // api.addCommandInit({
    //     type: 'master',
    // });

    // api.beforeCommandInit(({ args }) => {
    //     console.warn('beforeCommandInit:', args);
    // });

    api.otherCommandInit(async ({ args }) => {
        if (args.name !== 'vuepress') return;
        const pkg = api.pkg;

        const info = {
            sourceDir: 'docs',
            title: 'MicroApp - VuePress',
            description: '一款简洁而优雅的 博客 & 文档 主题, 依赖于 Micro App 微应用框架',
            repo: 'MicroAppJS/vuepress',
            author: pkg.author && (pkg.author.name || pkg.author) || 'Zyao89',
        };

        await Object.keys(info).reduce((chain, key) => {
            return chain.then(() => {
                return prompt.input(`Enter ${key} (${info[key]}):`).then(answer => {
                    const text = answer.trim();
                    if (text) {
                        info[key] = text;
                    }
                });
            });
        }, Promise.resolve());

        info.sidebar = {};
        info.nav = [];

        return info;
    });

    // api.afterCommandInit(({ args, info }) => {
    //     if (args.name !== 'vuepress') return;

    //     api.logger.logo(`
    //     以后只需要修改 “microapp/config/vuepress.js” 目录下的配置即可

    //     npm run dev
    // `);
    // });
};


module.exports.configuration = {
    description: '增强模版初始化命令行',
};
