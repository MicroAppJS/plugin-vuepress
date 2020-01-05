const fs = require('fs');
const moment = require('moment');

module.exports = (options = {}, context) => ({
    extendPageData($page) {
        const $lang = $page._computed.$lang;
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
    const timestamp = Date.parse(lastUpdated);
    return timestamp;
}

function defaultTransformer(timestamp, lang) {
    const m = moment(timestamp).locale(lang);
    return m.format('llll');
}

function getCreateTimestamp(filePath) {
    if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);
        return stat.birthtime.getTime();
    }
    return null;
}
