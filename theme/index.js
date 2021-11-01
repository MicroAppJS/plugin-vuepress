const moment = require('moment');
const { fs, path } = require('@micro-app/shared-utils');

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
            THEME_BUILD_DATE: moment().format('llll'),
        },
        alias() {
            const defaultThemeConfigAlias = defaultThemeConfig.alias();
            const defaultThemeDir = path.dirname(require.resolve('@vuepress/theme-default'));
            return {
                ...defaultThemeConfigAlias,
                '@default-theme': defaultThemeDir,
                '@icons': fs.existsSync(iconsDir) ? iconsDir : iconsLibDir,
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

            // txt file
            config.module
                .rule('txt-file')
                .test(/\.(txt)(\?.*)?$/)
                .use('file-loader')
                .loader('file-loader')
                .options({
                    name: 'assets/file/[path][name].[ext]',
                });

            // demo file
            config.module
                .rule('demo-file')
                .test(/\/demo\/(.*)\.(\w+)(\?.*)?$/)
                .use('file-loader')
                .loader('file-loader')
                .options({
                    name: 'assets/file/[path][name].[ext]',
                });

            // markdown rule
            const mdRule = config.module
                .rule('markdown')
                .test(/\.md$/);
            mdRule
                .use('markdown-loader')
                .loader(require.resolve('./plugins/markdown/loader.js'));
        },
        extendMarkdown: md => {
            md.set({ breaks: true });

            const render = md.render
            md.render = (...args) => {
                if (args.length > 1) {
                    const [, { relativePath }] = args;
                    md.$relativePath = relativePath;
                }
                return render.call(md, ...args);
            };
        },
        chainMarkdown(config) {
            require('./plugins/markdown')(ctx, config);
        },
        plugins: [
            ...require('./plugins/register')(ctx),
        ],

        // Blog https://github.com/meteorlxy/vuepress-theme-meteorlxy/blob/master/lib/plugins/blog/index.js
        extendPageData($page) {
            // const strippedContent = $page._strippedContent;
            // if (!strippedContent) {
            //     return;
            // }
        },
    };

    return finalConfig;
};
