'use strict';

const path = require('path');
const ROOT = path.resolve(__dirname, '../');

const config = {};

// 兼容两种启动方式
config.plugins = [
    ROOT,
    '@micro-app/plugin-deploy', // test
];

module.exports = config;
