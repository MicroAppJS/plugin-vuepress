const { path, _ } = require('@micro-app/shared-utils');

// fixed chinese path...
const blogPluginUtil = require('@vuepress/plugin-blog/lib/node/util.js');
const oldCurryFrontmatterHandler = blogPluginUtil.curryFrontmatterHandler;
const FIXED_PATH = Symbol('FIXED_PATH');
blogPluginUtil.curryFrontmatterHandler = (scope, map, _path) => {
    const fn = oldCurryFrontmatterHandler(scope, map, _path)
    return (key, pageKey) => {
        const r = fn(key, pageKey);
        if (key) {
            if (map[key] && map[key].path && !map[key][FIXED_PATH]) {
                // map[key].path = `${path}${key}/`;
                map[key].path = encodeURI(`${_path}${key}/`); // fixed path
                map[key][FIXED_PATH] = true;
            }
        }
        return r;
    };
};

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
        plugins.push([ require('./rss'), blogConfig.rss ]);
    }

    // robots
    if (blogConfig.robots) {
        plugins.push([ require('./robots'), blogConfig.robots ]);
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
            return extendPageData($page, ctx);
        },
    };
};
