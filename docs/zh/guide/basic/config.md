# 配置文件

如果没有任何配置，这个网站将会是非常局限的，用户也无法在你的网站上自由导航。

为了更好地自定义你的网站，让我们首先在你的根目录下创建一个 `micro-app.vuepress.config.js` 文件，所有相关的配置都将会在这里，它应该导出一个 JavaScript 对象：

```js
module.exports = {
    sourceDir: "docs",
    title: "Hello VuePress",
    description: "Just playing around"
};
```

::: warning 注意
我们不希望你配置 `theme` 参数，因为我们给你提供了一个内置的基础主题。
如果你想更换主题的话，其实你完全不需要选择依赖我们。
:::

以下是 `micro-app.vuepress.config.js` 的部分配置，它最终会被解析成 `vuepress` 的配置，其中 `otherConfig` 是用于配置其它官方的配置。

```js
module.exports = {
    sourceDir: "docs", // 指定文档目录
    base: '/',
    title: undefined,
    description: undefined,
    head: [],
    host: '0.0.0.0',
    port: 8080,
    dest: '.vuepress/dist',
    locales: undefined, // 多语言
    markdown: {
        ... // 官方 markdown 配置
    },
    plugins: {
        ... // 官方 plugins 配置
    },
    otherConfig: {
        ... // 其它官方配置
    },
};
```
