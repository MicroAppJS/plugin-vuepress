'use strict';

module.exports = function(api, argv, opts) {
    // 增加部署 github 脚本
    // https://github.com/marketplace/actions/deploy-to-github-pages
    // https://github.com/JamesIves/github-pages-deploy-action/blob/dev/src/constants.ts
    const logger = api.logger;

    // logger.info('[VuePress > Deploy > Github]', '我正在努力实现！💪');

    const { _, fs, chalk, prompt, execa } = require('@micro-app/shared-utils');

    const selfVuepressConfig = api.selfVuepressConfig || {};
    const deployOpts = selfVuepressConfig.deploy || false;
    if (!_.isPlainObject(deployOpts)) {
        logger.throw('[VuePress > Deploy > Github]', '必须在 micro-app.vuepress.config.js 中声明 deploy: {} !');
    }

    let repo = deployOpts.repo || selfVuepressConfig.repo || false;
    if (!_.isString(repo)) {
        logger.throw('[VuePress > Deploy > Github]', 'deploy.repo must be string!');
    }

    const token = process.env.GITHUB_TOKEN || process.env.ACCESS_TOKEN || 'git';

    if (repo && !repo.includes(':')) {
        repo = `${token}@github.com:${repo}.git`;
    }

    const path = require('path');
    const root = api.root;

    const createConfig = require('../createConfig');
    const vuepressConfig = createConfig(api, argv, opts);

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
    chain = chain.then(() => {
        logger.info('[VuePress > Deploy > Github]', 'Remove Dest:', destDirRoot);
        return fs.remove(destDirRoot);
    });

    // # build
    // npm run docs:build
    chain = chain.then(() => {
        logger.info('[VuePress > Deploy > Github]', 'Building...');
        const args = _.cloneDeep(argv);
        args._[0] = 'build'; // 切为 build
        const runCommand = require('../command');
        return runCommand(api, args, opts);
    });

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

    let branch = deployOpts.branch || process.env.BRANCH || 'gh-pages';
    if (branch && branch !== 'master') {
        branch = `master:${branch}`;
    }
    chain = chain.then(() => { spinner.text = 'Pushing ' + chalk.gray(`(${repo} ${branch})`) + ' ...'; });
    chain = chain.then(() => execa('git', [ 'push', '-f', repo, branch ], execaOptions(destDirRoot)));

    chain = chain.catch(err => {
        spinner.fail(err.message || 'Deploy Error!');
        throw err;
    }).then(() => {
        spinner.succeed('Deploy Successful!');
        // https://<USERNAME>.github.io/<REPO>
        const url = createURL(repo);
        logger.logo(`Open Browser, URL: ${chalk.underline.blue(url)}`);
    });

    // cd -

    return chain;
};

function createURL(repo) {
    if (repo.includes(':')) {
        repo = repo.split(':')[1];
    }
    repo = repo.replace(/\.git$/, '');
    const infos = repo.split('/');
    return `https://${infos[0]}.github.io/${infos[1]}`;
}

function execaOptions(cwd, stdout = 'inherit') {
    return { cwd, stdout };
}
