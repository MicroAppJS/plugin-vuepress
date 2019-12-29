'use strict';
process.env.MICRO_APP_TEST = 'true';

/* global expect */

const TIMEOUT = 1000 * 10;
const CWD = process.cwd();

describe('VuePress Bin test', () => {

    it('help run', async () => {

        try {
            const { service } = require('@micro-app/cli');
            await service.run('vuepress');
        } catch (error) {
            console.warn(error);
        }


        // const execa = require('execa');
        // const { code, stderr } = execa('node', [ 'node_modules/.bin/micro-app', 'vuepress' ], {
        //     cwd: CWD,
        //     timeout: TIMEOUT,
        //     env: process.env,
        // });

        // if (code && stderr) {
        //     throw new Error(stderr);
        // }
    });

    it('dev run', async () => {

        try {
            const { service } = require('@micro-app/cli');
            await service.run('vuepress', { _: [ 'dev' ] });
        } catch (error) {
            console.warn(error);
        }

        // const execa = require('execa');

        // const { code, stderr } = execa('node', [ 'node_modules/.bin/micro-app', 'vuepress', 'dev' ], {
        //     cwd: CWD,
        //     timeout: TIMEOUT,
        //     env: process.env,
        // });

        // if (code && stderr) {
        //     throw new Error(stderr);
        // }
    });

    it('build run', async () => {

        try {
            const { service } = require('@micro-app/cli');
            await service.run('vuepress', { _: [ 'build' ] });
        } catch (error) {
            console.warn(error);
        }


        // const execa = require('execa');

        // const { code, stderr } = execa('node', [ 'node_modules/.bin/micro-app', 'vuepress', 'build' ], {
        //     cwd: CWD,
        //     timeout: TIMEOUT,
        //     env: process.env,
        // });

        // if (code && stderr) {
        //     throw new Error(stderr);
        // }
    });

    it('dev run docs', async () => {

        try {
            const { service } = require('@micro-app/cli');
            await service.run('vuepress', { _: [ 'dev', 'docs' ] });
        } catch (error) {
            console.warn(error);
        }


        // const execa = require('execa');

        // const { code, stderr } = execa('node', [ 'node_modules/.bin/micro-app', 'vuepress', 'dev docs' ], {
        //     cwd: CWD,
        //     timeout: TIMEOUT,
        //     env: process.env,
        // });

        // if (code && stderr) {
        //     throw new Error(stderr);
        // }
    });

});
