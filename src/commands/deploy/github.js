'use strict';

module.exports = function(api, argv, opts) {
    // TODO 增加部署 github 脚本
    const logger = api.logger;

    // logger.info('[VuePress > Deploy > Github]', '我正在努力实现！💪');

    const { _, fs, chalk, prompt } = require('@micro-app/shared-utils');
    const execa = require('execa');

    const createConfig = require('../createConfig');
    const vuepressConfig = createConfig(api, argv, opts);

    const deployOpts = vuepressConfig.deploy || false;
    if (!_.isPlainObject(deployOpts)) {
        logger.throw('[VuePress > Deploy > Github]', '必须在 micro-app.vuepress.config.js 中声明 deploy: {} !');
    }

    let repo = deployOpts.repo || false;
    if (!_.isString(repo)) {
        logger.throw('[VuePress > Deploy > Github]', 'deploy.repo must be string!');
    }

    if (repo && !repo.includes(':')) {
        repo = `git@github.com:${repo}.git`;
    }

    const buildCMD = deployOpts.build || 'npx micro-app vuepress build';

    const path = require('path');
    const root = api.root;

    let chain = Promise.resolve();

    // check base
    chain = chain.then(() => {
        const base = vuepressConfig.base;
        if (!repo.includes('.github.io') && !base) {
            // 这里需要询问是否继续？ prompt
            logger.warn('[VuePress > Deploy > Github]', 'You should check your configuration! "config.base"');
            return prompt.confirm('Are you sure to continue?').then(answer => {
                return answer ? Promise.resolve() : Promise.reject('Interrupt task!');
            });
        }
    });

    // # abort on errors
    // set -e

    const docsDirRoot = path.resolve(root, vuepressConfig.sourceDir);
    const destDirRoot = path.resolve(docsDirRoot, vuepressConfig.dest);

    // # clear
    logger.info('[VuePress > Deploy > Github]', 'Remove Dest:', destDirRoot);
    chain = chain.then(() => fs.remove(destDirRoot));

    // # build
    // npm run docs:build
    chain = chain.then(() => execa.command(buildCMD, execaOptions(root)));

    // # navigate into the build output directory
    // cd docs/.vuepress/dist

    // # if you are deploying to a custom domain
    // # echo 'www.example.com' > CNAME
    const CNAME = deployOpts.CNAME || false;
    if (_.isString(CNAME)) {
        const cnamePath = path.join(destDirRoot, 'CNAME');
        chain = chain.then(() => fs.writeFile(cnamePath, CNAME));
    }

    const spinner = logger.spinner('Strat Deploying...');
    chain = chain.then(() => spinner.start());

    // git init
    chain = chain.then(() => execa('git', [ 'init' ], execaOptions(destDirRoot, 'pipe')));
    // git add -A
    chain = chain.then(() => execa('git', [ 'add', '-A' ], execaOptions(destDirRoot, 'pipe')));
    // git commit -m 'deploy'
    const message = deployOpts.message || ':pencil: deploy';
    chain = chain.then(() => execa('git', [ 'commit', '-m', message ], execaOptions(destDirRoot, 'pipe')));


    // # if you are deploying to https://<USERNAME>.github.io
    // # git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

    // # if you are deploying to https://<USERNAME>.github.io/<REPO>
    // # git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

    let branch = deployOpts.branch || 'gh-pages';
    if (branch && branch !== 'master') {
        branch = `master:${branch}`;
    }
    chain = chain.then(() => { spinner.text = 'Pushing ' + chalk.gray(`(${repo} ${branch})`) + ' ...'; });
    chain = chain.then(() => execa('git', [ 'push', '-f', repo, branch ], execaOptions(destDirRoot)));

    chain = chain.catch(err => {
        spinner.fail(err.message || 'Deploy Error!');
        throw err;
    }).then(() => spinner.succeed('Deployed!'));

    // cd -

    return chain;
};

function execaOptions(cwd, stdout = 'inherit') {
    return { cwd, stdout };
}
