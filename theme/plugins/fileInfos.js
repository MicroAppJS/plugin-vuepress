const fs = require('fs');
const moment = require('moment');
const spawn = require('cross-spawn');
const path = require('path');

module.exports = (options = {}, ctx) => ({
    name: 'fileInfos',
    extendPageData($page) {
        const siteConfig = ctx.siteConfig || {};
        const themeConfig = ctx.themeConfig;
        const lang = siteConfig.lang || themeConfig.lang || 'en-US';
        const $lang = $page.frontmatter.lang || $page._computed.$localeConfig.lang || lang;
        const lastUpdatedTimestamp = getGitLastUpdatedTimeStamp($page._filePath);
        $page.lastUpdatedTimestamp = lastUpdatedTimestamp || +new Date();
        $page.lastUpdatedFormat = defaultTransformer($page.lastUpdatedTimestamp, $lang);
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

function getGitLastUpdatedTimeStamp(filePath) {
    let lastUpdated;
    try {
        lastUpdated = parseInt(spawn.sync(
            'git',
            [ 'log', '-1', '--format=%at', path.basename(filePath) ],
            { cwd: path.dirname(filePath) }
        ).stdout.toString('utf-8')) * 1000;
    } catch (e) { /* do not handle for now */ }
    return lastUpdated;
}
