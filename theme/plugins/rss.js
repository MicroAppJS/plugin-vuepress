// rss
module.exports = (options, ctx) => {
    const { fs, _, logger } = require('@micro-app/shared-utils');
    const path = require('path');
    const RSS = require('rss');
    return {
        name: 'rss',

        generated() {
            const { pages, outDir, themeConfig, siteConfig } = ctx;
            const blogConfig = themeConfig.blogConfig || {};
            const siteUrl = options.siteUrl || blogConfig.siteUrl || themeConfig.siteUrl || siteConfig.siteUrl;
            if (!siteUrl) {
                logger.warn('[rss]', '"siteUrl" must be required!');
            }
            const { filter = () => true, count = 20, copyright = themeConfig.copyright } = options;

            const author = themeConfig.author || siteConfig.title || 'Micro-App';

            const feed = new RSS({
                title: siteConfig.title,
                description: siteConfig.description,
                feed_url: `${siteUrl}/rss.xml`,
                site_url: siteUrl,
                copyright: copyright || author,
                language: 'en',
            });

            pages
                .filter(page => !!page.frontmatter)
                .filter(page => {
                    const { title, frontmatter: { home, private: isPrivate } } = page;
                    return !(home === true || title === undefined || isPrivate === true);
                })
                .filter(page => filter(page.frontmatter))
                .map(page => ({ ...page, date: new Date(page.frontmatter.date || page.birthTimestamp || '') }))
                .sort((a, b) => b.date - a.date)
                .map(page => {
                    const frontmatter = page.frontmatter || {};
                    const categories = Array.isArray(frontmatter.categories) ? frontmatter.categories : _.isString(frontmatter.categories) && [ frontmatter.categories ];
                    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : _.isString(frontmatter.tags) && [ frontmatter.tags ];
                    return {
                        title: page.title,
                        description: page.excerpt,
                        url: `${siteUrl}${decodeURIComponent(page.path)}`,
                        guid: page.path,
                        categories: [].concat(categories, tags),
                        author: frontmatter.author || author,
                        date: page.date,
                    };
                })
                .slice(0, count)
                .forEach(page => feed.item(page));

            fs.writeFile(
                path.resolve(outDir, 'rss.xml'),
                feed.xml()
            );
            logger.info('RSS has been generated!');
        },
    };
};
