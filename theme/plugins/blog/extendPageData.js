const moment = require('moment');

const ensureBothSlash = str => str.replace(/^\/?(.*)\/?$/, '/$1/');

module.exports = function extendPageData($page, ctx) {
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
