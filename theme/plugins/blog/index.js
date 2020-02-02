// 初始化默认值
exports.initBlogConfig = require('./init');

exports.extendPageData = require('./extendPageData');

// blog plugin
exports.registerPlugins = function(ctx) {
    const themeConfig = ctx.themeConfig;
    const blogConfig = themeConfig.blogConfig;

    const plugins = [];

    const getBlogPluginOptions = require('./pluginOptions');

    plugins.push([ '@vuepress/blog', getBlogPluginOptions(ctx) ]);
    // rss
    if (blogConfig.rss) {
        plugins.push([ require('./rss'), blogConfig.rss ]);
    }

    // TODO more blog plugins...

    return plugins;
};
