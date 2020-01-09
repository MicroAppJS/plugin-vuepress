'use strict';

const config = {};

// 兼容两种启动方式
if (!process.env.MICRO_APP_VUEPRESS_DIRECT_RUNNING) {
    config.plugins = [
        __dirname,
        '@micro-app/plugin-deploy-command',
    ];
}

module.exports = config;
