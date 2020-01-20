
export default function({ router, siteData }) {
    const themeConfig = siteData.themeConfig || {};
    if (themeConfig.shortLinks) {
        const pages = siteData.pages || [];
        const newRoutes = pages.filter(page => {
            const key = page.key;
            if (!key) return false;
            if (page.shortLink === false) return false;
            return true;
        }).map(page => {
            const shortLink = page.shortLink;
            return { path: shortLink, redirect: page.path };
        });
        router.addRoutes(newRoutes);
    }
}
