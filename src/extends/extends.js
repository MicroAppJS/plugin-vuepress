'use strict';

const path = require('path');
const { _, fs } = require('@micro-app/shared-utils');

module.exports = (api, opts) => {

    const CONSTANTS = require('../constants');

    const logger = api.logger;

    api.extendConfig('selfVuepressConfig', {
        description: '当前工程下的 vuepress 配置',
    }, function() {
        const root = api.root;
        let config = api.parseConfig(CONSTANTS.NAME);
        if (_.isEmpty(config)) {
            config = api.extraConfig.vuepress || {};
        }
        logger.debug('selfVuepressConfig', JSON.stringify(config, false, 4));
        return Object.assign({}, config, { root });
    });

    api.extendConfig('vuepressConfig', {
        description: '将我们自己的配置转成 vuepress 配置',
    }, function() {
        const selfVuepressConfig = api.selfVuepressConfig || {};
        const root = selfVuepressConfig.root;

        // 取 otherConfig
        const otherConfig = selfVuepressConfig.otherConfig || {};
        // 取公共值
        const orgkeys = [
            'root', 'sourceDir',
            'base', 'title', 'description', 'host', 'port', 'dest',
            'locales', 'head',
        ];
        const orgkeys2 = [
            'markdown', 'plugins',
        ];
        const commonConfig = _.pick(selfVuepressConfig, [].concat(orgkeys).concat(orgkeys2));
        const sourceDir = commonConfig.sourceDir || '.';
        const dest = commonConfig.dest || '.vuepress/dist';

        const docsDirRoot = path.resolve(root, sourceDir);

        // let themeConfig = selfVuepressConfig.themeConfig || {};

        // const buildSidebar = createBuildSidebarFactory(docsDirRoot, selfVuepressConfig);
        // const buildNavs = createBuildNavsFactory(selfVuepressConfig);

        // const locales = selfVuepressConfig.locales || {};
        // if (locales && Object.keys(locales).length > 0) {
        //     const localKeys = Object.keys(locales);
        //     localKeys.forEach(key => {
        //         themeConfig.locales = themeConfig.locales || {};
        //         const localsItem = Object.assign(themeConfig.locales[key] || {}, locales[key] || {});
        //         themeConfig.locales[key] = buildSidebar(localsItem, key);

        //         // buid nav
        //         themeConfig.locales[key].nav = buildNavs(key);
        //     });
        // } else {
        //     const _themeConfig = Object.assign({}, selfVuepressConfig, themeConfig);
        //     themeConfig = buildSidebar(_themeConfig, '/');

        //     // buid nav
        //     themeConfig.nav = buildNavs('/');
        // }

        const themeConfig = _.cloneDeep(selfVuepressConfig);
        orgkeys2.forEach(key => {
            delete themeConfig[key];
        });

        const finalResult = {
            ...commonConfig,
            ...otherConfig,
            sourceDir,
            dest: path.resolve(docsDirRoot, dest),
            themeConfig,
            root,
        };

        return finalResult;
    });

};

function createBuildNavsFactory(selfVuepressConfig) {
    const navs = selfVuepressConfig.navs || [];

    return function buildNavs(lang) {
        let _navs = navs;
        if (_.isPlainObject(navs)) {
            _navs = Object.keys(navs);
        }
        return _navs.map(key => {
            if (_.isPlainObject(key)) {
                return key; // 原始配置
            }
            if (_.isPlainObject(navs)) {
                const item = _.isPlainObject(navs[key]) ? navs[key][lang] : navs[key];
                if (_.isPlainObject(item)) {
                    return {
                        ...item,
                        link: localsLink(lang, key),
                    };
                }
                return {
                    text: item,
                    link: localsLink(lang, key),
                };
            }
            if (_.isPlainObject(navs[key])) {
                return {
                    ...navs[key],
                    link: localsLink(lang, key),
                };
            }
            return {
                text: navs[key],
                link: localsLink(lang, key),
            };
        }).reduce((arrs, item) => {
            return arrs.concat({
                ...item,
            });
        }, []);
    };
}

function createBuildSidebarFactory(docsDirRoot, selfVuepressConfig) {
    const sidebars = selfVuepressConfig.sidebars || [];

    return function buildSidebar(localsItem, lang) {
        let _sidebars = sidebars;
        if (_.isPlainObject(sidebars)) {
            _sidebars = Object.keys(sidebars);
        }
        localsItem.sidebar = _sidebars.map(sidebarKey => {
            if (_.isPlainObject(sidebars)) {
                return {
                    title: _.isPlainObject(sidebars[sidebarKey]) ? sidebars[sidebarKey][lang] : sidebars[sidebarKey],
                    link: localsLink(lang, sidebarKey),
                };
            }
            return { link: localsLink(lang, sidebarKey) };
        }).reduce((obj, { link, title }) => {
            return Object.assign(obj, loadSidebar(docsDirRoot, link, title));
        }, {});
        return localsItem;
    };
}

function localsLink(locales, link) {
    return path.join(locales, link);
}


// 递归版本
function loadSidebar(root, filepath, title) {
    const p = path.join(root, filepath);
    if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
        const files = fs.readdirSync(p);
        const result = files.filter(file => {
            return /\.md$/i.test(file);
        }).map(file => {
            return file.replace(root, '').replace(/\.md$/i, '').replace(/^README$/i, '');
        }).concat(files.filter(file => {
            return !/\.md$/i.test(file);
        }).reduce((arrs, file, index) => {
            const subTitle = Array.isArray(title) && title[index] || false;
            const sub = loadSidebar(p, file, Array.isArray(subTitle) ? subTitle.slice(1) : subTitle);
            const subs = sub[file];
            if (!Array.isArray(subs)) {
                return arrs.concat(path.join(file, subs));
            }
            const children = subs.map(_f => {
                if (_.isPlainObject(_f)) {
                    if (_f.children) {
                        _f.children = _f.children.map(_ff => {
                            _ff = _ff || '/'; // 可能是 README
                            return path.join(file, _ff);
                        });
                    }
                    return _f;
                }
                _f = _f || '/'; // 可能是 README
                return path.join(file, _f);
            });
            const firstSubTitle = Array.isArray(subTitle) ? subTitle[0] : subTitle;
            if (firstSubTitle && subs.length > 1) {
                return arrs.concat({
                    // sidebarDepth: 2,
                    collapsable: false,
                    title: firstSubTitle,
                    children,
                });
            }
            return arrs.concat(children);
        }, []));
        const currTitle = !!title && Array.isArray(title) ? false : title;
        return {
            [filepath]: !currTitle ? result : [{
                // sidebarDepth: 2,
                collapsable: false,
                title: currTitle,
                children: result,
            }],
        };
    } else if (fs.existsSync(p) && fs.statSync(p).isFile() && /\.md$/i.test(p)) {
        const file = filepath.replace(root, '').replace(/\.md$/i, '').replace(/^README$/i, '');
        return {
            [filepath]: file,
        };
    }
    return {};
}

// function loadSidebar(root, filepath) {
//     const p = path.join(root, filepath);
//     if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
//         const files = fs.readdirSync(p);
//         files.filter(file => {
//             const _link = path.join(p, file);
//             return;
//         });
//         return {
//             [filepath]: files.filter(file => {
//                 return /\.md$/i.test(file);
//             }).map(file => {
//                 return file.replace(root).replace(/\.md$/i, '').replace(/^README$/i, '');
//             }),
//         };
//     } else if (fs.existsSync(p) && fs.statSync(p).isFile() && /\.md$/i.test(p)) {
//         return {
//             [filepath]: filepath,
//         };
//     }
//     return {};
// }
