module.exports = registerPlugins;

function registerPlugins(ctx) {
    const themeConfig = ctx.themeConfig;
    themeConfig.smoothScroll = themeConfig.smoothScroll === true;
    themeConfig.activeHeaderLinks = themeConfig.activeHeaderLinks !== false;
    themeConfig.pwa = themeConfig.pwa !== false;
    themeConfig.redirect = themeConfig.redirect === undefined ? true : themeConfig.redirect;

    const plugins = [
        '@vuepress/search',
        '@vuepress/plugin-nprogress',
        [ '@vuepress/active-header-links', themeConfig.activeHeaderLinks ],
        [ 'smooth-scroll', themeConfig.smoothScroll ],

        [ 'container', {
            type: 'tip',
            defaultTitle: {
                '/': 'TIP',
                '/zh/': '提示',
            },
        }],
        [ 'container', {
            type: 'warning',
            defaultTitle: {
                '/': 'WARNING',
                '/zh/': '注意',
            },
        }],
        [ 'container', {
            type: 'danger',
            defaultTitle: {
                '/': 'WARNING',
                '/zh/': '警告',
            },
        }],
    ];

    const siteConfig = ctx.siteConfig || {};
    const type = siteConfig.type || themeConfig.type || 'doc';
    const isLocales = !!siteConfig.locales || !!themeConfig.locales || false;

    if (type === 'blog') {
        const blogConfig = themeConfig.blogConfig = initBlogConfig(themeConfig.blogConfig || {});
        plugins.push([ '@vuepress/blog', getBlogPluginOptions(blogConfig) ]);
        // TODO more blog plugins
    }

    // pwa
    if (themeConfig.pwa) {
        plugins.push([
            '@vuepress/pwa',
            {
                serviceWorker: true,
                updatePopup: true,
            },
        ]);
    }

    // redirect
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

    // google analytics
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

function initBlogConfig(blogConfig) {
    // 初始化默认值
    blogConfig.categoriesPath = blogConfig.categoriesPath || '/categories/';
    blogConfig.tagsPath = blogConfig.tagsPath || '/tags/';
    blogConfig.timelinePath = blogConfig.timelinePath || '/timeline/';
    blogConfig.pageSize = parseInt(blogConfig.pageSize) || 10;
    return blogConfig;
}

function getBlogPluginOptions(blogConfig) {
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
