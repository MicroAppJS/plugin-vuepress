'use strict';

module.exports = function(api, argv, opts, BASE_ROOT) {
    const logger = api.logger;

    const { fs, prompt, chalk, path, _ } = require('@micro-app/shared-utils');
    const moment = require('moment');

    const selfVuepressConfig = api.selfVuepressConfig || {};
    const commandOpts = selfVuepressConfig.command || {};
    const createCommand = commandOpts.create || {};
    const cacheDir = path.resolve(api.tempDir, '.cache');

    let chain = Promise.resolve();

    const CUSTOM_KEY = '__CUSTOM__';
    const info = {};

    // title
    chain = chain.then(() => {
        return prompt.input('Enter Title:').then(answer => {
            const title = answer.trim();
            if (!title) {
                throw `title "${title}" illegal!`;
            }
            if (fs.existsSync(path.join(BASE_ROOT, title))) {
                throw `title "${title}" illegal, already exists!`;
            }
            info.title = title;
        });
    });

    // categories
    chain = chain.then(() => {
        // 提供可选项，没有则自定义。
        // 从缓存获取
        const categoriesCachePath = path.resolve(cacheDir, 'categories.json');
        let categoriesCache = [];
        if (fs.existsSync(categoriesCachePath)) {
            categoriesCache = fs.readJSONSync(categoriesCachePath);
        }
        const categoriesOpts = _.uniq([].concat(createCommand.categories || []).concat(categoriesCache || []));
        let _chain = Promise.resolve(CUSTOM_KEY);
        if (categoriesOpts.length) {
            _chain = _chain.then(() => prompt.select('Select Categories:', {
                choices: [
                    ...categoriesOpts.map(item => ({ name: item, value: item })),
                    { name: '>>> Custom >>>', value: CUSTOM_KEY },
                ],
                pageSize: 10,
            }));
        }
        _chain = _chain.then(key => {
            if (key === CUSTOM_KEY) {
                return prompt.input('Enter Categories:').then(answer => {
                    const categories = answer.trim();
                    info.categories = `[${categories}]`;
                });
            }
            const categories = key.trim();
            info.categories = `[${categories}]`;
        });
        return _chain;
    });

    // tags
    chain = chain.then(() => {
        // 提供可选项，没有则自定义。
        // 从缓存获取
        const tagsCachePath = path.resolve(cacheDir, 'tags.json');
        let tagsCache = [];
        if (fs.existsSync(tagsCachePath)) {
            tagsCache = fs.readJSONSync(tagsCachePath);
        }
        const tagsOpts = _.uniq([].concat(createCommand.tags || []).concat(tagsCache || []));
        let _chain = Promise.resolve([]);
        if (tagsOpts.length) {
            _chain = _chain.then(() => prompt.check('Select Tags:', {
                choices: [
                    ...tagsOpts.map(item => ({ name: item, value: item })),
                    { name: '>>> Custom >>>', value: CUSTOM_KEY },
                ],
                pageSize: 10,
            }));
        }
        _chain = _chain.then(keys => {
            if (keys && (keys.length <= 0 || keys.includes(CUSTOM_KEY))) {
                return prompt.input('Enter Other Tags (eg: x,y,z):').then(answer => {
                    let tags = answer.trim();
                    if (tags) {
                        const _tags = tags.split(',');
                        tags = _.uniq(keys.concat(_tags).filter(k => k !== CUSTOM_KEY)).join(',');
                    }
                    info.tags = `[${tags}]`;
                });
            }
            const tags = keys.join(',');
            info.tags = `[${tags}]`;
        });
        return _chain;
    });

    // author
    chain = chain.then(() => {
        return prompt.input('Enter Author:').then(answer => {
            const author = answer.trim();
            info.author = author || false;
        });
    });

    // type
    chain = chain.then(() => {
        return prompt.input('Enter Type:').then(answer => {
            const type = answer.trim();
            info.type = type || false;
        });
    });

    // typeColor
    chain = chain.then(() => {
        let _chain = Promise.resolve([]);
        if (info.type) {
            const typeColorOpts = [
                { name: 'green (Easy)', value: 'green' },
                { name: 'yellow (Medium)', value: 'yellow' },
                { name: 'red (Hard)', value: 'red' },
            ];
            if (typeColorOpts.length) {
                _chain = _chain.then(() => prompt.select('Select TypeColor:', {
                    choices: [
                        ...typeColorOpts,
                    ],
                    pageSize: 10,
                })).then(answer => {
                    const typeColor = answer.trim();
                    info.typeColor = typeColor || false;
                });
            }
        }
        return _chain;
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

    // confirm
    chain = chain.then(() => {
        return prompt.confirm('Are you ok?').then(answer => {
            if (answer) {
                return Promise.resolve();
            }
            return Promise.reject('Cancel !!!');
        });
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
        fs.writeFileSync(README_DIR, [ '---' ].concat(frontMatter, '---', '', '<!-- more -->', '').join('\n'));
        logger.logo([ '', '',
            `     ${chalk.green('Create Success')}!`,
            `     ${chalk.blue('Edit')}: ${chalk.grey.underline(README_DIR)}`,
            '' ].join('\n'));
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
