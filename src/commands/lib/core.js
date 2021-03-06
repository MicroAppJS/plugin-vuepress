'use strict';

const { eject, version, createApp } = require('@vuepress/core');

function changeVuepressDir(app, options) {
    if (options.vuepressDir) {
        app.vuepressDir = options.vuepressDir;
    }
}

async function dev(options) {
    process.env.NODE_ENV = 'development'; // 强制
    const app = createApp(options);
    // change vuepressDir
    changeVuepressDir(app, options);
    await app.process();
    return app.dev();
}

async function build(options) {
    process.env.NODE_ENV = 'production'; // 强制
    const app = createApp(options);
    // change vuepressDir
    changeVuepressDir(app, options);
    await app.process();
    return app.build();
}

exports.version = version;
exports.createApp = createApp;
exports.dev = dev;
exports.build = build;
exports.eject = eject;
