const path = require('path');
const moment = require('moment');
const { fs } = require('@micro-app/shared-utils');

module.exports = (options, ctx) => {
    const defaultTheme = require('@vuepress/theme-default');
    const defaultThemeConfig = defaultTheme(options, ctx);

    const themeConfig = ctx.themeConfig = ctx.themeConfig || {};

    const sourceDir = ctx.sourceDir;
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
            config
                .plugin('custom-style')
                .use(require('./plugins/markdown/mdCustomStyle'))
                .end();
            config
                .plugin('code-result')
                .use(require('./plugins/markdown/mdCodeResult'))
                .end();
            config
                .plugin('img-alt')
                .use(require('./plugins/markdown/mdAltImg'))
                .end();

            // plugin
            config.plugin('sup').use(require('markdown-it-sup'));
            config.plugin('sub').use(require('markdown-it-sub'));
            config.plugin('mark').use(require('markdown-it-mark'));
            config.plugin('footnote').use(require('markdown-it-footnote'));
            config.plugin('imsize').use(require('markdown-it-imsize'));
            config.plugin('task-lists').use(require('markdown-it-task-lists'), [{ label: true, labelAfter: true }]);

            // include
            config.plugin('include').use(require('./plugins/markdown/markdown-it-include'), [ {
                root: sourceDir, // root path
                includeRe: /<{3}include(.+)/i,
                bracesAreOptional: true,
                getRootDir(pluginOptions, state, startLine, endLine) {
                    // const pos = state.bMarks[startLine] + state.tShift[startLine]
                    // const max = state.eMarks[startLine]
                    const root = pluginOptions.root;
                    const { $relativePath } = state.md || {};
                    if (!$relativePath) {
                        return root;
                    }
                    return path.resolve(root, path.dirname($relativePath));
                },
            } ])

            const { PLUGINS } = require('@vuepress/markdown/lib/constant.js');
            config.plugin(PLUGINS.SNIPPET).use(require('./plugins/markdown/snippet'), [ {
                root: sourceDir, // root path
            } ]);
            // config.plugin(PLUGINS.ANCHOR).tap(options => {
            //     return options.map(opt => {
            //         // opt.permalinkSymbol = '#$';
            //         return opt;
            //     });
            // });
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
