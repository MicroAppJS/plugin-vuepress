module.exports = (options = {}, ctx) => ({
    name: 'shortLinks',

    extendPageData($page) {
        const themeConfig = ctx.themeConfig || {};

        let prefix = '';
        if (typeof themeConfig.shortLinks === 'string') {
            prefix = themeConfig.shortLinks;
        }

        const key = $page.key;
        if (key) {
            const frontmatter = $page.frontmatter = $page.frontmatter || {};
            const shortLink = frontmatter.shortLink;
            if (shortLink !== false) {
                $page.shortLink = frontmatter.shortLink = '/s' + (shortLink || `/${$page.key.replace(/^v\-/, prefix)}`);
            }
        }
    },

    async ready() {
        const { pages } = ctx;
        const allShortLinkPages = pages.filter(page => page.shortLink && page._permalink).map(page => {
            const id = `s-${page.key}`;
            const redirectLink = page._permalink;
            return {
                key: id, id,
                permalink: page.shortLink,
                frontmatter: {
                    ...page.frontmatter,
                    layout: 'RedirectLayout',
                    redirectLink,
                },
            };
        });

        await Promise.all(allShortLinkPages.map(async page => ctx.addPage(page)));
    },
});
