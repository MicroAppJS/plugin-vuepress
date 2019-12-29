'use strict';
process.env.MICRO_APP_TEST = 'true';

/* global expect */

describe('VuePress Bin test', () => {

    it('help run', async () => {

        try {
            const { service } = require('@micro-app/cli');
            await service.run('vuepress');
        } catch (error) {
            console.warn(error);
        }
    });

    it('dev run', async () => {

        try {
            const { service } = require('@micro-app/cli');
            await service.run('vuepress', { _: [ 'dev' ] });
        } catch (error) {
            console.warn(error);
        }
    });

    it('build run', async () => {

        try {
            const { service } = require('@micro-app/cli');
            await service.run('vuepress', { _: [ 'build' ] });
        } catch (error) {
            console.warn(error);
        }
    });

    it('dev run docs', async () => {

        try {
            const { service } = require('@micro-app/cli');
            await service.run('vuepress', { _: [ 'dev', 'docs' ] });
        } catch (error) {
            console.warn(error);
        }
    });
});
