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

    const { pages } = ctx;

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
                $page.excerptKey = `${$page.key}-excerpt`;
            }
            return extendPageData($page, ctx);
        },

        async clientDynamicModules() {
            const code = `export default {\n${(await Promise.all(pages
                .filter(({ excerptKey }) => !!excerptKey)
                .map(async ({ excerptKey, _filePath, _content }) => {
                    const dir = path.dirname(_filePath);
                    const { parseFrontmatter } = require('@vuepress/shared-utils');
                    const { excerpt } = parseFrontmatter(_content);
                    const tempPath = path.join(ctx.tempPath, 'temp-excerpts');
                    const newExcerpt = excerpt.replace(/\[.*\]\(\..+\)/igm, function(word) { // 修复所有相对路径
                        const p = word.replace(/\[.*\]\(/, '').replace(/\)$/, '');
                        const op = path.resolve(dir, p);
                        const a = word.replace(p, path.relative(tempPath, op));
                        return a;
                    });
                    const excerptTempFilePath = await ctx.writeTemp(`temp-excerpts/${excerptKey}.md`, newExcerpt);
                    return `  ${JSON.stringify(excerptKey)}: () => import(${JSON.stringify(excerptTempFilePath)})`;
                })))
                .join(',\n')} \n}`;
            return { name: 'page-excerpts-components.js', content: code, dirname: 'internal' };
        },
    };
};
