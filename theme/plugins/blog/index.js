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
    plugins.push([ require('./createCache'), true ]);

    return plugins;
};

module.exports = (optins = {}, ctx) => {
    const themeConfig = ctx.themeConfig;
    // blog config
    themeConfig.blogConfig = initBlogConfig(ctx);

    return {
        name: 'blog',

        enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js'),

        plugins: [
            ...registerPlugins(ctx),
        ],

        // Blog https://github.com/meteorlxy/vuepress-theme-meteorlxy/blob/master/lib/plugins/blog/index.js
        extendPageData($page) {
            const frontmatter = $page.frontmatter;
            if (frontmatter && frontmatter.private === true) {
                // TODO 私有内容
                // const strippedContent = $page._strippedContent;
                // if (strippedContent) {
                // console.warn($page);
                // }
            }
            // if ($page.excerpt) { // 处理图片
            //     console.warn($page.excerpt);
            // }
            return extendPageData($page, ctx);
        },
    };
};
