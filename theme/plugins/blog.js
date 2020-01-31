
const { _ } = require('@micro-app/shared-utils');
const moment = require('moment');
const ensureBothSlash = str => str.replace(/^\/?(.*)\/?$/, '/$1/');

// 初始化默认值
exports.initBlogConfig = function(ctx) {
    const themeConfig = ctx.themeConfig;
    const blogConfig = themeConfig.blogConfig = themeConfig.blogConfig || {};
    blogConfig.categoriesPath = blogConfig.categoriesPath || '/categories/';
    blogConfig.tagsPath = blogConfig.tagsPath || '/tags/';
    blogConfig.timelinePath = blogConfig.timelinePath || '/timeline/';
    blogConfig.timelineTitle = blogConfig.timelineTitle || 'Tomorrow will be better!';
    blogConfig.pageSize = parseInt(blogConfig.pageSize) || 10;
    blogConfig.postsDir = blogConfig.postsDir || 'posts';
    blogConfig.permalink = blogConfig.permalink || '/posts/:year/:month/:day/:slug.html';
    blogConfig.rss = blogConfig.rss || false;
    blogConfig.copyright = _.isUndefined(blogConfig.copyright) ? true : blogConfig.copyright !== false ? blogConfig.copyright : false;
    return blogConfig;
};

// blog plugin
exports.registerPlugins = function(ctx) {
    const themeConfig = ctx.themeConfig;
    const blogConfig = themeConfig.blogConfig;

    const plugins = [];

    plugins.push([ '@vuepress/blog', getBlogPluginOptions(ctx) ]);
    // rss
    if (blogConfig.rss) {
        plugins.push([ require('./rss'), blogConfig.rss ]);
    }

    // TODO more blog plugins...

    return plugins;
};

exports.extendPageData = function($page, ctx) {
    const siteConfig = ctx.siteConfig || {};
    const themeConfig = ctx.themeConfig;
    const lang = siteConfig.lang || themeConfig.lang || 'en-US';
    const blogConfig = themeConfig.blogConfig;
    if ($page.path.startsWith(ensureBothSlash(blogConfig.postsDir))) {
        $page.frontmatter.permalink = $page.frontmatter.permalink || blogConfig.permalink;
        if ($page.frontmatter.date) {
            const $lang = $page.frontmatter.lang || $page._computed.$localeConfig.lang || lang;
            $page.frontmatter.dateFormat = moment($page.frontmatter.date)
                .utc().locale($lang)
                .format('llll');
        }
    }
};

function getBlogPluginOptions(ctx) {
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
}
