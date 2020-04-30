'use strict';

module.exports = function vuepressCommand(api, opts) {

    api.assertVersion('>=0.3.17');

    const { chalk } = require('@micro-app/shared-utils');

    api.registerCommand('vuepress', {
        description: 'enhance vuepress cli.',
        usage: 'micro-app vuepress <command> [options]',
        options: {
            'build [targetDir]': {
                '': '在指定的目录生成一个静态站点.',
                '-d, --dest <dest>': 'specify build output dir (default: .vuepress/dist)',
                '-t, --temp <temp>': 'set the directory of the temporary file',
                '-c, --cache [cache]': 'set the directory of cache',
                '--dest <dest>': 'the output directory for build process',
                '--no-cache': 'clean the cache before build',
                '--debug': 'build in development mode for debugging',
                '--silent': 'build static site in silent mode',
            },
            'dev [targetDir]': {
                '': '启动一个开发服务器。来自 vuepress build 的所有选项都可用.',
                '-p, --port <port>': 'use specified port (default: 8080)',
                '-t, --temp <temp>': 'set the directory of the temporary file',
                '-c, --cache [cache]': 'set the directory of cache',
                '--host <host>': 'use specified host (default: 0.0.0.0)',
                '--no-cache': 'clean the cache before build',
                '--no-clear-screen': 'do not clear screen when dev server is ready',
                '--debug': 'start development server in debug mode',
                '--silent': 'start development server in silent mode',
                '--open': 'open browser when ready',
            },
            eject: {
                '': '将默认主题复制到 .vuepress/theme 目录，以供自定义.',
                '--debug': 'eject in debug mode',
            },
            info: 'Shows debugging information about the local environment.',
            deploy: {
                '': '部署到自定义服务上',
                '--type': '部署方式类型. (default: github)',
            },
            create: {
                '': '快速创建文章模版',
                '--base': '文章默认路径. (default: posts)',
                '--type': '创建文件类型. (default: post)',
            },
        },
        details: `
Examples:
    ${chalk.gray('# build')}
    micro-app vuepress build
    ${chalk.gray('# dev')}
    micro-app vuepress dev
`.trim(),
    }, args => {
        const runCommand = require('./command');
        // 这里要处理一下，如果 args 中包含 vuepress， 则需要去除
        if (args._[0] === 'vuepress') {
            args._.splice(0, 1);
        }
        if (!args._ || !args._.length) {
            return api.runCommand('help', { _: [ 'vuepress' ] });
        }

        // do something
        if ([ 'deploy', 'create' ].includes(args._[0])) {
            const otherCommand = require(`./${args._[0]}`);
            return otherCommand(api, args, opts);
        }
        return runCommand(api, args, opts);
    });
};

module.exports.registerMethod = require('./methods');

module.exports.configuration = {
    description: 'vuepress 终端命令合集.',
};
