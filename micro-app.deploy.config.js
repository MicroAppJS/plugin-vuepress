'use strict';

let repoToken = 'git';
if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN !== 'undefined') {
    repoToken = `x-access-token:${process.env.GITHUB_TOKEN}`;
} else if (process.env.ACCESS_TOKEN && process.env.ACCESS_TOKEN !== 'undefined') {
    repoToken = process.env.ACCESS_TOKEN;
}

module.exports = {
    repo: `https://${repoToken}@github.com/MicroAppJS/plugin-vuepress.git`,
    branch: 'gh-pages',
    dist: 'docs/.vuepress/dist',
    user: {
        name: 'Zyao89',
        email: 'zyao89@gmail.com',
    },
};
