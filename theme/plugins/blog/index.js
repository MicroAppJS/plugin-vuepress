const { fs, path, hash } = require('@micro-app/shared-utils');

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

        // 主要处理 excerptKey 的 md 渲染
        async clientDynamicModules() {
            const code = `export default {\n${(await Promise.all(pages
                .filter(({ excerptKey }) => !!excerptKey)
                .map(async ({ excerptKey, _filePath, _content }) => {
                    const dir = path.dirname(_filePath);
                    const { parseFrontmatter } = require('@vuepress/shared-utils');
                    const { excerpt } = parseFrontmatter(_content);
                    const collectMap = {};
                    const newExcerpt = excerpt.replace(/\[.*\]\(\..+\)/igm, function(word) { // 修复所有相对路径
                        const p = word.replace(/\[.*\]\(/, '').replace(/\)$/, '')
                            .replace(/[\"|\'].+[\"|\']/, '')
                            .trim();
                        const op = path.resolve(dir, p);
                        if (fs.existsSync(op)) { // 存在收集
                            const name = hash(op);
                            const ext = path.extname(op);
                            collectMap[`${name}${ext}`] = op;
                            return word.replace(p, `./${excerptKey}/${name}${ext}`); // 替换
                        }
                        return word;
                    });
                    const arrs = Object.keys(collectMap);
                    const tempPath = path.join(ctx.tempPath, 'temp-excerpts', excerptKey);
                    if (arrs.length) { // 迁移
                        fs.ensureDirSync(tempPath);
                        arrs.forEach(key => {
                            fs.copySync(collectMap[key], path.join(tempPath, key));
                        });
                    }
                    const excerptTempFilePath = await ctx.writeTemp(`temp-excerpts/${excerptKey}.md`, newExcerpt);
                    return `  ${JSON.stringify(excerptKey)}: () => import(${JSON.stringify(excerptTempFilePath)})`;
                })))
                .join(',\n')} \n}`;
            return { name: 'page-excerpts-components.js', content: code, dirname: 'internal' };
        },
    };
};
