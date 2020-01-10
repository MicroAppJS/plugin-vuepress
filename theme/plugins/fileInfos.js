const fs = require('fs');
const moment = require('moment');

module.exports = (options = {}, ctx) => ({
    extendPageData($page) {
        const siteConfig = ctx.siteConfig || {};
        const themeConfig = ctx.themeConfig;
        const lang = siteConfig.lang || themeConfig.lang || 'en-US';
        const $lang = $page.frontmatter.lang || $page._computed.$localeConfig.lang || lang;
        if ($page.lastUpdated) {
            const lastUpdatedTimestamp = defaultTimestamp($page.lastUpdated);
            $page.lastUpdatedTimestamp = lastUpdatedTimestamp;
            const lastUpdatedFormat = defaultTransformer(lastUpdatedTimestamp, $lang);
            $page.lastUpdatedFormat = lastUpdatedFormat;
        }
        const createTimestamp = getCreateTimestamp($page._filePath);
        if (createTimestamp) {
            $page.birthTimestamp = createTimestamp;
            $page.birthTimeFormat = defaultTransformer(createTimestamp, $lang);
        }
        if ($page._content) {
            $page.contentSize = $page._content.length;
        }
    },
});

function defaultTimestamp(lastUpdated) {
    const timestamp = new Date(lastUpdated);
    return timestamp;
}

function defaultTransformer(timestamp, lang) {
    const m = moment(timestamp).utc().locale(lang);
    return m.format('llll');
}

function getCreateTimestamp(filePath) {
    if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);
        return stat.birthtime.getTime();
    }
    return null;
}
