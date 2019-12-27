---
home: true
heroImage: /logo.png
banner: /banner.jpg
badges:
    - user=MicroAppJS&repo=plugin-vuepress&type=star&count=true
    - user=MicroAppJS&repo=plugin-vuepress&type=fork&count=true
    - https://img.shields.io/badge/download-12,292-orange.svg?style=social&logo=npm
    - https://img.shields.io/badge/download-12,292-orange.svg?style=social&logo=npm
actionText: 快速上手 →
actionLink: /guide/
features:
    - image: https://img.shields.io/badge/download-12,292-orange.svg?style=social&logo=npm
    - title: 简洁至上
      details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
      image: https://img.shields.io/badge/download-12,292-orange.svg?style=social&logo=npm
    - title: Vue 驱动
      details: 享受 Vue + webpack 的开发体验，可以在 Markdown 中使用 Vue 组件，又可以使用 Vue 来开发自定义主题。
      image: https://img.shields.io/badge/download-12,292-orange.svg?style=social&logo=npm
    - title: 高性能
      details: VuePress 会为每个页面预渲染生成静态的 HTML，同时，每个页面被加载的时候，将作为 SPA 运行。
    - title: 高性能
      details: VuePress 会为每个页面预渲染生成静态的 HTML，同时，每个页面被加载的时候，将作为 SPA 运行。
footer: true
---

<!-- <div>{{ require.resolve('@micro-app/plugin-vuepress/@config/constants') }}</div> -->

::: warning 注意
请确保你的 Node.js 版本 >= 8.6。
:::

```bash
# 安装，如果已经依赖了，请直接下一步
yarn add -D @micro-app/cli # 或者：npm install -D @micro-app/cli
```

```bash
# 安装 vuepress plugin
yarn add -D @micro-app/plugin-vuepress # 或者：npm install -D @micro-app/plugin-vuepress

# 新建一个 docs 文件夹
mkdir docs

# 新建一个 markdown 文件
echo '# Hello MicroApp VuePress!' > docs/README.md

# 开始写作
npx micro-app vuepress dev docs
```

<!-- <SvgIcon name="favicons"/> -->
