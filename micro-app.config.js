'use strict';

module.exports = {
    type: '', // types 类型

    alias: { // 前端
        '@config': {
            link: 'src',
            description: '配置',
        },
    },

    plugins: [
        '@micro-app/plugin-webpack-adapter',
        '@micro-app/plugin-deploy-command',
    ],
};
