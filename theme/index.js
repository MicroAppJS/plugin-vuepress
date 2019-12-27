const path = require('path');

module.exports = (options, ctx) => {
    const defaultTheme = require('@vuepress/theme-default');
    const defaultThemeConfig = defaultTheme(options, ctx);

    let themeConfig = ctx.themeConfig || {};
    themeConfig = Object.assign(themeConfig, {
        summary: themeConfig.summary === undefined ? true : themeConfig.summary,
        summaryLength: typeof themeConfig.summaryLength === 'number'
            ? themeConfig.summaryLength
            : 200,
        pwa: !!themeConfig.pwa,
    });

    const vuepressDir = ctx.vuepressDir;
    const iconsDir = path.resolve(vuepressDir, 'public', 'icons');
    const iconsLibDir = path.resolve(__dirname, 'icons');
    const svgIconsDir = themeConfig.svgIconsDir && path.resolve(vuepressDir, themeConfig.svgIconsDir) || '';

    const iconsFilterFn = filePath => {
        if (filePath.startsWith(iconsLibDir)) {
            return true;
        }
        if (filePath.startsWith(iconsDir)) {
            return true;
        }
        // TODO 通过配置可扩展地址，如：options.svgIconsDir = []
        if (svgIconsDir && filePath.startsWith(svgIconsDir)) {
            return true;
        }
        return false;
    };

    const type = options.type || themeConfig.type || 'doc';
    const plugins = [ ...defaultThemeConfig.plugins || [] ];

    console.warn(type);

    // TODO more
    if (type === 'blog') {
        const blogConfig = themeConfig.blog = themeConfig.blog || {};
        plugins.push([ '@vuepress/blog', getBlogPluginOptions(blogConfig) ]);
    }
    if (themeConfig.pwa) {
        plugins.push([
            '@vuepress/pwa',
            {
                serviceWorker: true,
                updatePopup: true,
            },
        ]);
    }

    // 流程图
    plugins.push('flowchart');

    const finalConfig = {
        define: {
            THEME_BLOG_PAGINATION_COMPONENT: themeConfig.paginationComponent
                ? themeConfig.paginationComponent
                : 'Pagination',
        },
        alias() {
            const defaultThemeConfigAlias = defaultThemeConfig.alias();
            const defaultThemeDir = path.dirname(require.resolve('@vuepress/theme-default'));
            return {
                ...defaultThemeConfigAlias,
                '@default-theme': defaultThemeDir,
                '@icons': iconsDir,
                '@internal-icons': iconsLibDir,
                ...(svgIconsDir ? {
                    '@svg-icons': svgIconsDir,
                } : {}),
            };
        },
        chainWebpack(config /* , isServer */) {
            config.module
                .rule('svg').exclude.add(iconsFilterFn);

            config.module
                .rule('svg-icon')
                .test(/\.(svg)(\?.*)?$/)
                .include.add(iconsFilterFn).end()
                .use('svg-sprite-loader')
                .loader('svg-sprite-loader')
                .options({
                    symbolId: 'icon-[name]',
                })
                .end()
                .use('svgo-loader')
                .loader('svgo-loader')
                .options({
                    plugins: [
                        // 还有很多配置，具体可以查看https://github.com/svg/svgo
                        {
                            removeViewBox: false,
                        },
                        {
                            removeXMLNS: true,
                        },
                    ],
                });
        },
        chainMarkdown(config) {
            config
                .plugin('custom-style')
                .use(require('./plugins/customStyle'));
        },
        plugins,
    };

    // Generate summary.
    if (themeConfig.summary) {
        const removeMd = require('remove-markdown');
        finalConfig.extendPageData = function(pageCtx) {
            const strippedContent = pageCtx._strippedContent;
            if (!strippedContent) {
                return;
            }
            pageCtx.summary =
                removeMd(
                    strippedContent
                        .trim()
                        .replace(/^#+\s+(.*)/, '')
                )
                    .slice(0, themeConfig.summaryLength)
        + ' ...';
        };
    }

    return finalConfig;
};


function getBlogPluginOptions(blogConfig) {
    // 初始化默认值
    blogConfig.categoriesPath = blogConfig.categoriesPath || '/categories/';
    blogConfig.tagsPath = blogConfig.tagsPath || '/tags/';
    blogConfig.timelinePath = blogConfig.timelinePath || '/timeline/';
    blogConfig.pageSize = parseInt(blogConfig.pageSize) || 10;
    return {
        frontmatters: [
            {
                id: 'categories',
                keys: [ 'category', 'categories' ],
                path: blogConfig.categoriesPath,
                layout: 'CategoriesLayout',
                scopeLayout: 'CategoriesLayout',
            },
            {
                id: 'tags',
                keys: [ 'tag', 'tags' ],
                path: blogConfig.tagsPath,
                layout: 'TagsLayout',
                scopeLayout: 'TagsLayout',
            },
            {
                id: 'timeline',
                keys: [ 'timeline' ],
                path: blogConfig.timelinePath,
                layout: 'TimeLineLayout',
                scopeLayout: 'TimeLineLayout',
            },
        ],
    };
}
