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
        async extendPageData($page) {
            const frontmatter = $page.frontmatter;
            if (frontmatter && frontmatter.private === true) {
                // TODO 私有内容
                // const strippedContent = $page._strippedContent;
                // if (strippedContent) {
                // console.warn($page);
                // }
            }
            if ($page.excerpt) { // excerpt 处理（图片等）
                const { parseFrontmatter } = require('@vuepress/shared-utils');
                const { excerpt } = parseFrontmatter($page._content);
                $page.excerptTempFilePath = await $page._context.writeTemp(`temp-excerpts/${$page.key}.md`, excerpt);
            }
            return extendPageData($page, ctx);
        },
    };
};
