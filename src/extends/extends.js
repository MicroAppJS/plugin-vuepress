'use strict';

const path = require('path');
const { _, fs } = require('@micro-app/shared-utils');

module.exports = (api, opts) => {

    const CONSTANTS = require('../constants');

    const logger = api.logger;

    api.extendConfig('selfVuepressConfig', {
        description: '当前工程下的 vuepress 配置',
    }, function() {
        const selfConfig = api.selfConfig || {};
        const root = api.root;
        let config = api.parseConfig(CONSTANTS.NAME, selfConfig.key);
        if (_.isEmpty(config)) {
            config = api.extraConfig.vuepress || {};
        }
        logger.debug('selfVuepressConfig', JSON.stringify(config, false, 4));
        return Object.assign({
            root,
        }, config);
    });

    api.extendConfig('vuepressConfig', {
        description: '所有工程合并后的 vuepress 配置',
    }, function() {
        const selfVuepressConfig = api.selfVuepressConfig || {};

        const sourceDir = selfVuepressConfig.sourceDir || 'docs';
        const docsDirRoot = path.resolve(api.root, sourceDir);
        let themeConfig = selfVuepressConfig.themeConfig || {};

        const buildSidebar = createBuildSidebarFactory(docsDirRoot, selfVuepressConfig);
        const buildNavs = createBuildNavsFactory(selfVuepressConfig);

        const locales = selfVuepressConfig.locales || {};
        if (locales && Object.keys(locales).length > 0) {
            const localKeys = Object.keys(locales);
            localKeys.forEach(key => {
                themeConfig.locales = themeConfig.locales || {};
                const localsItem = Object.assign(themeConfig.locales[key] || {}, locales[key] || {});
                themeConfig.locales[key] = buildSidebar(localsItem, key);

                // buid nav
                themeConfig.locales[key].nav = buildNavs(key);
            });
        } else {
            const _themeConfig = Object.assign({}, selfVuepressConfig, themeConfig);
            themeConfig = buildSidebar(_themeConfig, '/');

            // buid nav
            themeConfig.nav = buildNavs('/');
        }
        return {
            ...selfVuepressConfig,
            sourceDir,
            serviceWorker: true,
            themeConfig,
        };
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
            if (_.isPlainObject(navs)) {
                return {
                    text: _.isPlainObject(navs[key]) ? navs[key][lang] : navs[key],
                    link: localsLink(lang, key),
                };
            }
            return {
                text: navs[key],
                link: localsLink(lang, key),
            };
        }).reduce((arrs, { link, text }) => {
            return arrs.concat({
                link, text,
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
            const subTitle = Array.isArray(title) && title[index];
            const sub = loadSidebar(p, file, subTitle);
            const subs = sub[file];
            if (!Array.isArray(subs)) {
                return arrs.concat(path.join(file, subs));
            }
            return arrs.concat(subs.map(_f => {
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
            }));
        }, []));
        const currTitle = !!title && Array.isArray(title) ? false : title;
        return {
            [filepath]: !currTitle ? result : [{
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
