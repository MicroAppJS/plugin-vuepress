const path = require('path');

module.exports = (options, ctx) => {
    const defaultTheme = require('@vuepress/theme-default');
    const defaultThemeConfig = defaultTheme(options, ctx);

    const themeConfig = ctx.themeConfig = ctx.themeConfig || {};

    const vuepressDir = ctx.vuepressDir;
    const iconsDir = path.resolve(vuepressDir, 'public', 'icons');
    const iconsLibDir = path.resolve(__dirname, 'icons');
    const svgIconsDir = themeConfig.svgIconsDir && path.resolve(vuepressDir, themeConfig.svgIconsDir) || iconsLibDir;

    const finalConfig = {
        define: {
            THEME_BLOG_PAGINATION_COMPONENT: themeConfig.paginationComponent
                ? themeConfig.paginationComponent
                : 'Pagination',
        },
        alias() {
            const defaultThemeConfigAlias = defaultThemeConfig.alias();
            const defaultThemeDir = path.dirname(require.resolve('@vuepress/theme-default'));
            return {
                ...defaultThemeConfigAlias,
                '@default-theme': defaultThemeDir,
                '@icons': iconsDir,
                '@internal-icons': iconsLibDir,
                '@svg-icons': svgIconsDir,
            };
        },
        chainWebpack(config /* , isServer */) {
            const iconsFilterFn = filePath => {
                if (filePath.startsWith(iconsLibDir)) {
                    return true;
                }
                if (filePath.startsWith(iconsDir)) {
                    return true;
                }
                // 通过配置可扩展地址，如：svgIconsDir = ''
                if (svgIconsDir && filePath.startsWith(svgIconsDir)) {
                    return true;
                }
                return false;
            };

            config.module
                .rule('svg').exclude.add(iconsFilterFn);

            config.module
                .rule('svg-icon')
                .test(/\.(svg)(\?.*)?$/)
                .include.add(iconsFilterFn).end()
                .use('svg-sprite-loader')
                .loader('svg-sprite-loader')
                .options({
                    symbolId: 'icon-[name]',
                })
                .end()
                .use('svgo-loader')
                .loader('svgo-loader')
                .options({
                    plugins: [
                        // 还有很多配置，具体可以查看https://github.com/svg/svgo
                        {
                            removeViewBox: false,
                        },
                        {
                            removeXMLNS: true,
                        },
                    ],
                });
        },
        chainMarkdown(config) {
            config
                .plugin('custom-style')
                .use(require('./plugins/mdCustomStyle'));
            config
                .plugin('code-result')
                .use(require('./plugins/mdCodeResult'));

            // plugin
            config.plugin('sup').use(require('markdown-it-sup'));
            config.plugin('sub').use(require('markdown-it-sub'));
            config.plugin('mark').use(require('markdown-it-mark'));
            config.plugin('footnote').use(require('markdown-it-footnote'));
        },
        plugins: require('./plugins/register')(ctx),

        // TODO Blog https://github.com/meteorlxy/vuepress-theme-meteorlxy/blob/master/lib/plugins/blog/index.js
        // extendPageData(pageCtx) {
        //     const strippedContent = pageCtx._strippedContent;
        //     if (!strippedContent) {
        //         return;
        //     }
        //     // Generate summary.
        //     if (themeConfig.summary) {
        //         const removeMd = require('remove-markdown');
        //         pageCtx.summary =
        //                 removeMd(
        //                     strippedContent
        //                         .trim()
        //                         .replace(/^#+\s+(.*)/, '')
        //                 )
        //                     .slice(0, themeConfig.summaryLength)
        //         + ' ...';
        //     }
        // },
    };

    return finalConfig;
};
