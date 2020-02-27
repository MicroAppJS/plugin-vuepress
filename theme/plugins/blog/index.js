const path = require('path');

// 初始化默认值
const initBlogConfig = require('./init');

const extendPageData = require('./extendPageData');

// blog plugin
const registerPlugins = function(ctx) {
    const themeConfig = ctx.themeConfig;
    const blogConfig = themeConfig.blogConfig;

    const plugins = [];

    const getBlogPluginOptions = require('./pluginOptions');

    plugins.push([ '@vuepress/blog', getBlogPluginOptions(ctx) ]);
    // rss
    if (blogConfig.rss) {
        plugins.push([ require('../rss'), blogConfig.rss ]);
    }

    // TODO more blog plugins...

    return plugins;
};

module.exports = (optins = {}, ctx) => {
    const themeConfig = ctx.themeConfig;
    // blog config
    themeConfig.blogConfig = initBlogConfig(ctx);

    console.warn(ctx.addPage);

    return {
        name: 'blog',

        enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js'),

        plugins: [
            ...registerPlugins(ctx),
        ],

        // Blog https://github.com/meteorlxy/vuepress-theme-meteorlxy/blob/master/lib/plugins/blog/index.js
        extendPageData($page) {
            return extendPageData($page, ctx);
        },
    };
};
