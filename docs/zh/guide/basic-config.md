# 配置

## 配置文件

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

## 基础配置

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

### base

- 类型: `string`
- 默认值: `/`

部署站点的基础路径，如果你想让你的网站部署到一个子路径下，你将需要设置它。如 GitHub pages，如果你想将你的网站部署到 `https://foo.github.io/bar/`，那么 `base` 应该被设置成 `"/bar/"`，它的值应当总是以斜杠开始，并以斜杠结束。

`base` 将会作为前缀自动地插入到所有以 `/` 开始的其他选项的链接中，所以你只需要指定一次。

**参考:**

- [Base URL](https://vuepress.vuejs.org/zh/config/#base)

### title

- 类型: `string`
- 默认值: `undefined`

网站的标题，它将会被用作所有页面标题的前缀，同时，默认主题下，它将显示在导航栏（navbar）上。

### description

- 类型: `string`
- 默认值: `undefined`

网站的描述，它将会以 `<meta>` 标签渲染到当前页面的 HTML 中。

### head

- 类型: `Array`
- 默认值: `[]`

额外的需要被注入到当前页面的 HTML `<head>` 中的标签，每个标签都可以以 `[tagName, { attrName: attrValue }, innerHTML?]` 的格式指定，举个例子，增加一个自定义的 favicon：

```js
module.exports = {
    head: [["link", { rel: "icon", href: "/logo.png" }]]
};
```

### host

- 类型: `string`
- 默认值: `'0.0.0.0'`

指定用于 dev server 的主机名。

### port

- 类型: `number`
- 默认值: `8080`

指定 dev server 的端口。

### sourceDir

- 类型: `string`
- 默认值: `docs`

指定文档的目录。如果传入的是相对路径，则会基于 `process.cwd()` 进行解析。

### dest

- 类型: `string`
- 默认值: `.vuepress/dist`

指定 `vuepress build` 的输出目录。如果传入的是相对路径，则会基于 `sourceDir` 进行解析。

### locales

- 类型: `{ [path: string]: Object }`
- 默认值: `undefined`

提供多语言支持的语言配置。具体细节请查看 [多语言支持](i18n.md)。

## Markdown

### markdown.lineNumbers

- 类型: `boolean`
- 默认值: `undefined`

是否在每个代码块的左侧显示行号。

### markdown.slugify

- 类型: `Function`
- 默认值: [source](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/shared-utils/src/slugify.ts)

一个将标题文本转换为 slug 的函数。修改它会影响 标题、目录、以及 侧边栏 链接的 id 和 链接。

### markdown.anchor

- 类型: `Object`
- 默认值: `{ permalink: true, permalinkBefore: true, permalinkSymbol: '#' }`

[markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor) 的选项。

### markdown.externalLinks

- 类型: `Object`
- 默认值: `{ target: '_blank', rel: 'noopener noreferrer' }`

这个键值对将会作为特性被增加到是外部链接的 `<a>` 标签上，默认的选项将会在新窗口中打开一个该外部链接。

### markdown.toc

- 类型: `Object`
- 默认值: `{ includeLevel: [2, 3] }`

[markdown-it-table-of-contents](https://github.com/Oktavilla/markdown-it-table-of-contents) 的选项。

#### 更多配置

更多配置请参考官方文档。

**参考:**

[官方 Markdown 配置](https://vuepress.vuejs.org/zh/config/#markdown)

## Pluggable

### plugins

- 类型: `Object|Array`
- 默认值: `undefined`

**参考:**

[官方 Pluggable 配置](https://vuepress.vuejs.org/zh/config/#pluggable)

## otherConfig

其它官方配置，如 `Styling`、`构建流程` 等。

::: warning 注意
请不要在其中声明 `theme`、`themeConfig`.
:::

**参考:**

[官方配置](https://vuepress.vuejs.org/zh/config/)
