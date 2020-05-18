const { _ } = require('@micro-app/shared-utils');

module.exports = function initBlogConfig(ctx) {
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
    blogConfig.robots = blogConfig.robots || false;
    blogConfig.sitemap = blogConfig.sitemap || false;
    blogConfig.comment = blogConfig.comment || false;
    return blogConfig;
};
