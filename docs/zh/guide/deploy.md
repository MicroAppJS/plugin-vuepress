# 部署

下述的指南基于以下条件：

- 文档放置在项目的 `docs` 目录中；
- 使用的是默认的构建输出位置；
- VuePress 以本地依赖的形式被安装到你的项目中，并且配置了如下的 npm scripts:

``` json
{
  "scripts": {
    "docs:deploy": "micro-app vuepress deploy"
  }
}
```

## Github

我们提供了一个简单的部署方式，如下：

配置 `micro-app.vuepress.config.js` 参数，如下：

```js
module.exports = {
    base: '/', // 默认配置
    sourceDir: 'docs',
    deploy: {
        repo: 'git@github.com:MicroAppJS/plugin-vuepress.git',
        // repo: 'MicroAppJS/plugin-vuepress',
        branch: 'gh-pages', // 不配置则默认为 gh-pages
    },
};
```

执行以下命令：

```sh
npm run docs:deploy
```

## 其它方式

**参考:**

- [官方 > 部署指南](https://vuepress.vuejs.org/zh/guide/deploy.html)
