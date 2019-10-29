'use strict';
process.env.NODE_ENV = 'MICRO_APP_TEST';

/* global expect */

const TIMEOUT = 1000 * 10;
const CWD = process.cwd();

describe('VuePress Bin test', () => {

    it('help run', async () => {
        const shelljs = require('shelljs');

        const { code, stderr } = shelljs.exec('node bin/micro-app-vuepress', {
            cwd: CWD,
            timeout: TIMEOUT,
            env: process.env,
        });

        if (code && stderr) {
            throw new Error(stderr);
        }
    });

    it('dev run', async () => {
        const shelljs = require('shelljs');

        const { code, stderr } = shelljs.exec('node bin/micro-app-vuepress dev', {
            cwd: CWD,
            timeout: TIMEOUT,
            env: process.env,
        });

        if (code && stderr) {
            throw new Error(stderr);
        }
    });

    it('build run', async () => {
        const shelljs = require('shelljs');

        const { code, stderr } = shelljs.exec('node bin/micro-app-vuepress build', {
            cwd: CWD,
            timeout: TIMEOUT,
            env: process.env,
        });

        if (code && stderr) {
            throw new Error(stderr);
        }
    });

    it('dev run docs', async () => {
        const shelljs = require('shelljs');

        const { code, stderr } = shelljs.exec('node bin/micro-app-vuepress dev docs', {
            cwd: CWD,
            timeout: TIMEOUT,
            env: process.env,
        });

        if (code && stderr) {
            throw new Error(stderr);
        }
    });

});
