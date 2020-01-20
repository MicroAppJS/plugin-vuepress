const path = require('path');

module.exports = (options = {}, ctx) => ({
    name: 'shortLinks',

    extendPageData($page) {
        const themeConfig = ctx.themeConfig || {};

        let prefix = 's-';
        if (typeof themeConfig.shortLinks === 'string') {
            prefix = themeConfig.shortLinks;
        }

        const key = $page.key;
        if (key) {
            const frontmatter = $page.frontmatter = $page.frontmatter || {};
            const shortLink = frontmatter.shortLink;
            if (shortLink !== false) {
                $page.shortLink = frontmatter.shortLink = shortLink || `/${$page.key.replace(/^v\-/, prefix)}`;
            }
        }
    },

    enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js'),
});
