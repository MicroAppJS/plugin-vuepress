const path = require('path');

module.exports = (options, ctx) => {
    const defaultTheme = require('@vuepress/theme-default');
    const defaultThemeConfig = defaultTheme(options, ctx);

    let themeConfig = ctx.themeConfig = ctx.themeConfig || {};
    themeConfig = Object.assign(ctx.themeConfig, {
        summary: themeConfig.summary !== false,
        summaryLength: typeof themeConfig.summaryLength === 'number'
            ? themeConfig.summaryLength
            : 200,
        pwa: themeConfig.pwa !== false,
        redirect: themeConfig.redirect === undefined ? true : themeConfig.redirect,
    });

    const vuepressDir = ctx.vuepressDir;
    const iconsDir = path.resolve(vuepressDir, 'public', 'icons');
    const iconsLibDir = path.resolve(__dirname, 'icons');
    const svgIconsDir = themeConfig.svgIconsDir && path.resolve(vuepressDir, themeConfig.svgIconsDir) || iconsLibDir;

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

    const plugins = [ ...defaultThemeConfig.plugins || [] ];

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
                '@svg-icons': svgIconsDir,
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
        plugins: registerPlugins(plugins, ctx),
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

function registerPlugins(plugins, ctx) {
    const themeConfig = ctx.themeConfig;
    const siteConfig = ctx.siteConfig || {};
    const type = siteConfig.type || themeConfig.type || 'doc';
    const isLocales = !!siteConfig.locales || !!themeConfig.locales || false;

    // TODO more
    if (type === 'blog') {
        const blogConfig = themeConfig.blogConfig = themeConfig.blogConfig || {};
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
    if (isLocales) {
        if (themeConfig.redirect) {
            const redirectOpts = themeConfig.redirect === true ? {
                // 提供多语言重定向功能
                // 它会自动从 `/foo/bar/` 定向到 `/:locale/foo/bar/`，如果对应的页面存在
                locales: true,
            } : themeConfig.redirect;
            plugins.push([ 'redirect', redirectOpts ]);
        }
    }

    const GAID = themeConfig.GAID;
    if (GAID && typeof GAID === 'string') {
        plugins.push([ '@vuepress/google-analytics', {
            ga: GAID, // UA-00000000-0 项目生成后生成的 ID 值
        }]);
    }
    plugins.push('@vuepress/medium-zoom');
    plugins.push('@vuepress/back-to-top');
    // 流程图
    plugins.push('flowchart');
    return plugins;
}

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
