'use strict';
process.env.MICRO_APP_TEST = 'true';

/* global expect */

const TIMEOUT = 1000 * 10;
const CWD = process.cwd();

describe('VuePress Bin test', () => {

    it('help run', async () => {
        const execa = require('execa');

        const { code, stderr } = execa('node', [ 'node_modules/.bin/micro-app', 'vuepress' ], {
            cwd: CWD,
            timeout: TIMEOUT,
            env: process.env,
        });

        if (code && stderr) {
            throw new Error(stderr);
        }
    });

    it('dev run', async () => {
        const execa = require('execa');

        const { code, stderr } = execa('node', [ 'node_modules/.bin/micro-app', 'vuepress', 'dev' ], {
            cwd: CWD,
            timeout: TIMEOUT,
            env: process.env,
        });

        if (code && stderr) {
            throw new Error(stderr);
        }
    });

    it('build run', async () => {
        const execa = require('execa');

        const { code, stderr } = execa('node', [ 'node_modules/.bin/micro-app', 'vuepress', 'build' ], {
            cwd: CWD,
            timeout: TIMEOUT,
            env: process.env,
        });

        if (code && stderr) {
            throw new Error(stderr);
        }
    });

    it('dev run docs', async () => {
        const execa = require('execa');

        const { code, stderr } = execa('node', [ 'node_modules/.bin/micro-app', 'vuepress', 'dev docs' ], {
            cwd: CWD,
            timeout: TIMEOUT,
            env: process.env,
        });

        if (code && stderr) {
            throw new Error(stderr);
        }
    });

});
