const { _ } = require('@micro-app/shared-utils');

module.exports = function getBlogPluginOptions(ctx) {
    const siteConfig = ctx.siteConfig || {};
    const themeConfig = ctx.themeConfig;
    const blogConfig = themeConfig.blogConfig;
    const lengthPerPage = blogConfig.pageSize;
    const options = {
        permalink: '/:regular',
        frontmatters: [
            {
                id: 'categories',
                keys: [ 'category', 'categories' ],
                path: blogConfig.categoriesPath,
                layout: 'CategoriesLayout',
                scopeLayout: 'CategoriesLayout',
                pagination: {
                    lengthPerPage,
                    layout: 'CategoriesLayout',
                },
            },
            {
                id: 'tags',
                keys: [ 'tag', 'tags' ],
                path: blogConfig.tagsPath,
                layout: 'TagsLayout',
                scopeLayout: 'TagsLayout',
                pagination: {
                    lengthPerPage,
                    layout: 'TagsLayout',
                },
            },
            {
                id: 'timeline',
                keys: [ 'timeline' ],
                path: blogConfig.timelinePath,
                layout: 'TimeLineLayout',
                scopeLayout: 'TimeLineLayout',
                pagination: {
                    lengthPerPage,
                    layout: 'TimeLineLayout',
                },
            },
        ],
    };

    if (blogConfig.comment) { // 评论
        const others = _.cloneDeep(blogConfig.comment);
        const type = others.type;
        delete others.type;
        options.comment = {
            service: type,
            ...others,
        };
    }

    if (blogConfig.sitemap) {
        if (blogConfig.sitemap === true) {
            blogConfig.sitemap = {
                hostname: themeConfig.siteUrl || siteConfig.siteUrl,
            };
        } else {
            if (typeof blogConfig.sitemap.hostname === 'string') {
                blogConfig.sitemap.hostname = blogConfig.sitemap.hostname || themeConfig.siteUrl || siteConfig.siteUrl;
            }
        }
        const sitemap = _.cloneDeep(blogConfig.sitemap);
        options.sitemap = sitemap;
    }
    return options;
};
