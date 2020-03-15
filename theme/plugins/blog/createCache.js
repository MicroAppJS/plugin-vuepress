// cache
module.exports = (options, ctx) => {
    const { fs, _, logger, path } = require('@micro-app/shared-utils');

    return {
        name: 'createCache',

        ready() {
            const { pages, siteConfig } = ctx;

            const categories = [];
            const tags = [];
            pages
                .filter(page => !!page.frontmatter)
                .filter(page => {
                    const { title, frontmatter: { home, private: isPrivate } } = page;
                    return !(home === true || title === undefined || isPrivate === true);
                })
                .map(page => ({ ...page, date: new Date(page.frontmatter.date || page.birthTimestamp || '') }))
                .sort((a, b) => b.date - a.date)
                .map(page => {
                    const frontmatter = page.frontmatter || {};
                    const categories = Array.isArray(frontmatter.categories) ? frontmatter.categories : _.isString(frontmatter.categories) && [ frontmatter.categories ];
                    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : _.isString(frontmatter.tags) && [ frontmatter.tags ];
                    return {
                        categories: [].concat(categories || []),
                        tags: [].concat(tags || []),
                    };
                })
                .forEach(item => {
                    categories.push(...item.categories);
                    tags.push(...item.tags);
                });

            const cacheDir = siteConfig.cacheDir;
            fs.ensureDirSync(cacheDir);
            fs.writeJSONSync(
                path.resolve(cacheDir, 'categories.json'),
                _.uniq(categories)
            );
            fs.writeJSONSync(
                path.resolve(cacheDir, 'tags.json'),
                _.uniq(tags)
            );
            logger.info('Categories & Tags has been cached!');
        },
    };
};
