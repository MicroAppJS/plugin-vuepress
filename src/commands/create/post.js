'use strict';

module.exports = function(api, argv, opts, BASE_ROOT) {
    const logger = api.logger;

    const path = require('path');
    const { fs, prompt, chalk } = require('@micro-app/shared-utils');
    const moment = require('moment');

    let chain = Promise.resolve();

    const info = {};

    // title
    chain = chain.then(() => {
        return prompt.input('Enter Title:').then(answer => {
            const title = answer.trim();
            if (!title) {
                throw `"${title}", title illegal!`;
            }
            if (fs.existsSync(path.join(BASE_ROOT, title))) {
                throw `"${title}", title illegal, already exists!`;
            }
            info.title = title;
        });
    });

    // categories
    chain = chain.then(() => {
        return prompt.input('Enter Categories:').then(answer => {
            const categories = answer.trim();
            info.categories = `[${categories}]`;
        });
    });

    // tags
    chain = chain.then(() => {
        return prompt.input('Enter Tags:').then(answer => {
            const tags = answer.trim();
            info.tags = `[${tags}]`;
        });
    });

    // author
    chain = chain.then(() => {
        return prompt.input('Enter Author:').then(answer => {
            const author = answer.trim();
            info.author = author || false;
        });
    });

    // private
    chain = chain.then(() => {
        return prompt.confirm('Is Private?').then(answer => {
            info.private = answer || false;
        });
    });

    // date
    chain = chain.then(() => {
        info.date = moment().format('YYYY-MM-DD HH:mm:ss');
    });

    // show info
    chain = chain.then(() => {
        const texts = createFrontMatter(info, chalk).map(item => `     ${item}`);
        logger.logo([ '', '' ].concat(texts, '').join('\n'));
    });

    // 1. 创建目录
    chain = chain.then(() => {
        const dirs = [ BASE_ROOT ];
        // 是否自动分组（按年）
        if (argv.classify) {
            if ([ 'categories' ].includes(argv.classify)) {
                dirs.push(info.categories.replace(/^\[/, '').replace(/\]$/, '').split(',')[0]);
            } else {
                const year = moment().format('YYYY');
                dirs.push(year);
            }
        }
        dirs.push(info.title);
        const mdDirname = path.resolve(...dirs);
        // 如果存在了则报错
        if (fs.existsSync(mdDirname)) {
            throw `"${mdDirname}", illegal, already exists!`;
        }
        fs.ensureDirSync(mdDirname);
        return mdDirname;
    });

    // 2. 创建模版
    chain = chain.then(mdDirname => {
        const README_DIR = path.resolve(mdDirname, 'README.md');
        const frontMatter = createFrontMatter(info);
        fs.writeFileSync(README_DIR, [ '---' ].concat(frontMatter, '---', '', '<!--more-->', '').join('\n'));
        logger.logo([ '', '', `     ${chalk.grey('Create Success')}: ${chalk.green.underline(mdDirname)}`, '' ].join('\n'));
    });

    return chain;
};


function createFrontMatter(info, chalk = false) {
    const texts = Object.keys(info).map(key => {
        if (info[key]) {
            if (chalk) {
                return `${chalk.grey(key)}: ${chalk.blue(info[key])}`;
            }
            return `${key}: ${info[key]}`;
        }
        return false;
    }).filter(item => !!item);
    return texts;
}
