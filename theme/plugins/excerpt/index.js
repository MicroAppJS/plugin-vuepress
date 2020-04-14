const { fs, path, hash } = require('@micro-app/shared-utils');

module.exports = (optins = {}, ctx) => {

    const { pages } = ctx;

    return {
        name: 'blog-excerpt-ex',

        enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js'),

        async extendPageData($page) {
            if ($page.excerpt) { // excerpt 处理（图片等）
                $page.excerptKey = `${$page.key}-excerpt`;
            }
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
                    // 修复所有相对路径,
                    // eg: ![]()、[]()
                    const newExcerpt = excerpt.replace(/\[.*\]\(\..+\)/igm, function(word) {
                        const p = word.replace(/\[.*\]\(/, '').replace(/\)$/, '')
                            .replace(/[\"|\'].+[\"|\']/, '') // 处理： [t](./images/2020-04-13-19-00-59.png "cc text!")
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
