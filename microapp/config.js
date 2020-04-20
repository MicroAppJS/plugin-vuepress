'use strict';

const path = require('path');
const ROOT = path.resolve(__dirname, '../');

const config = {};

// 兼容两种启动方式
if (!process.env.MICRO_APP_VUEPRESS_DIRECT_RUNNING) {
    config.plugins = [
        ROOT,
        '@micro-app/plugin-deploy', // test
    ];
}

module.exports = config;
