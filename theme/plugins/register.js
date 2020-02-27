module.exports = registerPlugins;

const { _ } = require('@micro-app/shared-utils');

function registerPlugins(ctx) {
    const themeConfig = ctx.themeConfig;
    themeConfig.smoothScroll = themeConfig.smoothScroll !== false;
    themeConfig.activeHeaderLinks = themeConfig.activeHeaderLinks !== false;
    themeConfig.pwa = themeConfig.pwa !== false;
    themeConfig.redirect = themeConfig.redirect === undefined ? true : themeConfig.redirect;
    themeConfig.comment = _.isPlainObject(themeConfig.comment) ? themeConfig.comment : false;

    const plugins = [
        '@vuepress/search',
        '@vuepress/plugin-nprogress',
        [ '@vuepress/active-header-links', themeConfig.activeHeaderLinks ],
        [ 'smooth-scroll', themeConfig.smoothScroll ],

        [ 'container', {
            type: 'tip',
            defaultTitle: {
                '/': 'TIP',
                '/zh/': '提示',
            },
        }],
        [ 'container', {
            type: 'warning',
            defaultTitle: {
                '/': 'WARNING',
                '/zh/': '注意',
            },
        }],
        [ 'container', {
            type: 'danger',
            defaultTitle: {
                '/': 'WARNING',
                '/zh/': '警告',
            },
        }],
    ];

    const siteConfig = ctx.siteConfig || {};
    const isLocales = !!siteConfig.locales || !!themeConfig.locales || false;

    const type = siteConfig.type || themeConfig.type || 'doc';
    if (type === 'blog') {
        plugins.push([ require('./blog'), true ]);
    }

    // pwa
    if (themeConfig.pwa) {
        plugins.push([
            '@vuepress/pwa',
            {
                serviceWorker: true,
                updatePopup: true,
            },
        ]);
    }

    // redirect
    if (isLocales) {
        if (themeConfig.redirect) {
            const redirectOpts = themeConfig.redirect === true ? {
                // 提供多语言重定向功能
                // 它会自动从 `/foo/bar/` 定向到 `/:locale/foo/bar/`，如果对应的页面存在
                locales: true,
            } : themeConfig.redirect;
            plugins.push([ 'redirect', redirectOpts ]);
        }
    }

    // google analytics
    const GAID = themeConfig.GAID;
    if (GAID && typeof GAID === 'string') {
        plugins.push([ '@vuepress/google-analytics', {
            ga: GAID, // UA-00000000-0 项目生成后生成的 ID 值
        }]);
    }

    // baidu auto push
    const baiduObj = Object.assign({
        autoPush: false,
        hmtID: false,
    }, themeConfig.baidu || {});
    if (baiduObj.autoPush) {
        plugins.push([ require('./baiduAutoPush'), true ]);
    }
    if (typeof baiduObj.hmtID === 'string') {
        plugins.push([ require('./baiduHmt'), {
            hmtID: baiduObj.hmtID,
        }]);
    }

    plugins.push('@vuepress/medium-zoom');
    plugins.push('@vuepress/back-to-top');
    // 流程图
    plugins.push('flowchart');

    // 文件信息
    plugins.push([ require('./fileInfos'), true ]);

    // 短链接
    const shortLinks = themeConfig.shortLinks;
    if (shortLinks) {
        plugins.push([ require('./shortLinks'), true ]);
    }

    // seo
    plugins.push([ require('./seo'), true ]);

    return plugins;
}
