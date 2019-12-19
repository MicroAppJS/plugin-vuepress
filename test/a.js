'use strict';

const fs = require('fs-extra');
const path = require('path');

function loadSidebar(root, filepath, title, opts = {}) {
    const p = path.join(root, filepath);
    if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
        const files = fs.readdirSync(p);
        const result = files.filter(file => {
            return /\.md$/i.test(file);
        }).map(file => {
            return file.replace(root, '').replace(/\.md$/i, '').replace(/^README$/i, '');
        }).concat(files.filter(file => {
            return !/\.md$/i.test(file);
        }).reduce((arrs, file) => {
            const sub = loadSidebar(p, file);
            const subs = sub[file];
            if (!Array.isArray(subs)) {
                return arrs.concat(path.join(file, subs));
            }
            return arrs.concat(subs.map(_f => {
                if (_f === '') { // 可能是 README
                    _f = '/';
                }
                return path.join(file, _f);
            }));
        }, []));
        return {
            [filepath]: !title ? result : {
                collapsable: false,
                ...opts,
                title,
            },
        };
    } else if (fs.existsSync(p) && fs.statSync(p).isFile() && /\.md$/i.test(p)) {
        const file = filepath.replace(root, '').replace(/\.md$/i, '').replace(/^README$/i, '');
        return {
            [filepath]: !title ? file : {
                collapsable: false,
                ...opts,
                title,
            },
        };
    }
    return {};
}


const result = loadSidebar(path.join(__dirname, '../docs'), '/guide/');

console.log(JSON.stringify(result, false, 4));
