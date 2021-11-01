const { path } = require('@micro-app/shared-utils');

module.exports = function chainMarkdown(ctx, config){
    const sourceDir = ctx.sourceDir;

    config
        .plugin('custom-style')
        .use(require('./mdCustomStyle'))
        .end();
    config
        .plugin('code-result')
        .use(require('./mdCodeResult'))
        .end();
    config
        .plugin('img-alt')
        .use(require('./mdAltImg'))
        .end();

    // plugin
    config.plugin('sup').use(require('markdown-it-sup'));
    config.plugin('sub').use(require('markdown-it-sub'));
    config.plugin('mark').use(require('markdown-it-mark'));
    config.plugin('footnote').use(require('markdown-it-footnote'));
    config.plugin('imsize').use(require('markdown-it-imsize'));
    config.plugin('task-lists').use(require('markdown-it-task-lists'), [{ label: true, labelAfter: true }]);

    // include
    config.plugin('include').use(require('./markdown-it-include'), [ {
        root: sourceDir, // root path
        includeRe: /<{3}include(.+)/i,
        bracesAreOptional: true,
        throwError: false,
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
    config.plugin(PLUGINS.SNIPPET).use(require('./snippet'), [ {
        root: sourceDir, // root path
    } ]);
    // config.plugin(PLUGINS.ANCHOR).tap(options => {
    //     return options.map(opt => {
    //         // opt.permalinkSymbol = '#$';
    //         return opt;
    //     });
    // });

};
