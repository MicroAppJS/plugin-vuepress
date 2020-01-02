'use strict';

module.exports = {
    // type: 'blog',
    // logo: '/logo.png',
    // smoothScroll: true,
    sourceDir: 'docs',
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'Plugin - VuePress',
            description: '一款简洁而优雅的 博客 & 文档 主题, 依赖于 Micro App 微应用框架',

            label: '简体中文',
            selectText: '选择语言',
            ariaLabel: '选择语言',
            editLinkText: '在 GitHub 上编辑此页',
            lastUpdated: '上次编辑时间',
            repoLabel: '查看源码',
            sidebar: getSidebar('zh'),
            nav: getNav('zh'),
        },
        // '/en/': {
        //     lang: 'en-US',
        //     title: 'Plugin - VuePress',
        //     description: 'Vue-powered Static Site Generator',
        // },
    },

    repoIcon: 'github',
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'MicroAppJS/plugin-vuepress',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    // repoLabel: '查看源码',
    // 假如你的文档仓库和项目本身不在一个仓库：
    // docsRepo: 'MicroAppJS/MicroApp-Core',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    // editLinkText: '帮助我们改善此页面！',
    sidebarDepth: 2,
    // algolia: {
    //     indexName: "cli_vuejs",
    //     apiKey: "f6df220f7d246aff64a56300b7f19f21"
    // },
    // search: false,
    // searchMaxSuggestions: 10,
    // displayAllHeaders: true // 默认值：false
    svgIconsDir: 'icons',
    copyright: '2019 - present, Zyao89',
    footer: {
        powerby: true,
        copyright: true,
        // beian: 'abc',
    },
    friendLinks: [
        {
            title: 'abc',
            logo: '/logo.png',
            link: 'http://www.baidu.com',
            description: 'abcdsd',
        },
    ],

    GAID: process.env.GAID || false,

    deploy: {
        repo: 'git@github.com:MicroAppJS/plugin-vuepress.git',
        branch: 'gh-pages',
    },
};

function getSidebar(lang = 'zh') {
    switch (lang) {
        case 'zh':
        default:
            return {
                [`/${lang}/guide/`]: getGuideSidebar('基础', '深入'),
                [`/${lang}/config/`]: getConfigSidebar('进阶', '博客配置'),
            };
    }
}

function getGuideSidebar(groupA, groupB) {
    return [
        {
            title: groupA,
            collapsable: false,
            children: [
                '',
                'getting-started',
                // 'directory-structure',
                'assets',
                'basic-config',
                'i18n',
                'theme-config',
                'deploy',
            ],
        },
        {
            title: groupB,
            collapsable: false,
            children: [
                'deep/frontmatter',
                'deep/permalinks',
                'deep/markdown-slot',
                'deep/global-computed',
            ],
        },
    ];
}


function getConfigSidebar(groupA, groupB) {
    return [
        {
            title: groupA,
            collapsable: false,
            children: [
                '',
                'svg-icon',
                'home',
                'copyright',
                'footer',
                'friend-link',
                // 'permalinks',
                // 'markdown-slot',
                // 'global-computed',
            ],
        },
        {
            title: groupB,
            collapsable: false,
            children: [
                'blog/',
                'blog/home',
                'blog/category-tag',
                'blog/author',
                'blog/frontmatter',
                'blog/blog-config',
            ],
        },
    ];
}

function getNav(lang) {
    switch (lang) {
        case 'zh':
        default:
            return [
                {
                    text: '指南',
                    link: '/zh/guide/',
                    icon: 'guide',
                },
                {
                    text: '文档',
                    link: '/zh/config/',
                    icon: 'doc',
                },
                // {
                //     text: '插件',
                //     link: '/zh/plugin/',
                // },
                // {
                //     text: '了解更多',
                //     ariaLabel: '了解更多',
                //     items: [
                //         {
                //             text: 'API',
                //             items: [
                //                 {
                //                     text: 'CLI',
                //                     link: '/zh/api/cli.html',
                //                 },
                //                 {
                //                     text: 'Node',
                //                     link: '/zh/api/node.html',
                //                 },
                //             ],
                //         },
                //         {
                //             text: '开发指南',
                //             items: [
                //                 {
                //                     text: '本地开发',
                //                     link: '/zh/miscellaneous/local-development.html',
                //                 },
                //                 {
                //                     text: '设计理念',
                //                     link: '/zh/miscellaneous/design-concepts.html',
                //                 },
                //                 {
                //                     text: 'FAQ',
                //                     link: '/zh/faq/',
                //                 },
                //                 {
                //                     text: '术语',
                //                     link: '/zh/miscellaneous/glossary.html',
                //                 },
                //             ],
                //         },
                //         {
                //             text: '其他',
                //             items: [
                //                 {
                //                     text: '从 0.x 迁移',
                //                     link: '/zh/miscellaneous/migration-guide.html',
                //                 },
                //                 {
                //                     text: 'Changelog',
                //                     link: 'https://github.com/vuejs/vuepress/blob/master/CHANGELOG.md',
                //                 },
                //             ],
                //         },
                //     ],
                // },
            ];
    }
}
