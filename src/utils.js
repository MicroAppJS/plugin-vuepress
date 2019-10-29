'use strict';

const chokidar = require('chokidar');
const path = require('path');

function watcherConfig(root, cb) {
    const watchFiles = [].concat(require('./constants').FILENAMES);
    const configWatcher = chokidar.watch(watchFiles, {
        cwd: root,
        ignoreInitial: true,
    });

    cb && configWatcher.on('change', cb);
}

function watchSourceFiles(sourceDir, cb) {
    // watch add/remove of files
    const pagesWatcher = chokidar.watch([
        '**/*.md',
        '.vuepress/components/**/*.vue',
    ], {
        cwd: sourceDir,
        ignored: [ '.vuepress/**/*.md', 'node_modules' ],
        ignoreInitial: true,
    });

    if (cb) {
        pagesWatcher.on('add', cb);
        pagesWatcher.on('unlink', cb);
    }
}

exports.watchFiles = function({ root, sourceDir }, cb) {
    watcherConfig(root, target => {
        cb && cb(path.resolve(root, target), target);
    });
    watchSourceFiles(path.resolve(root, sourceDir), target => {
        cb && cb(path.resolve(root, sourceDir, target), target);
    });
};
