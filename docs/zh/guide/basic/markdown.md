# Markdown

## markdown.lineNumbers

- 类型: `boolean`
- 默认值: `undefined`

是否在每个代码块的左侧显示行号。

## markdown.slugify

- 类型: `Function`
- 默认值: [source](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/shared-utils/src/slugify.ts)

一个将标题文本转换为 slug 的函数。修改它会影响 标题、目录、以及 侧边栏 链接的 id 和 链接。

## markdown.anchor

- 类型: `Object`
- 默认值: `{ permalink: true, permalinkBefore: true, permalinkSymbol: '#' }`

[markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor) 的选项。

## markdown.externalLinks

- 类型: `Object`
- 默认值: `{ target: '_blank', rel: 'noopener noreferrer' }`

这个键值对将会作为特性被增加到是外部链接的 `<a>` 标签上，默认的选项将会在新窗口中打开一个该外部链接。

## markdown.toc

- 类型: `Object`
- 默认值: `{ includeLevel: [2, 3] }`

[markdown-it-table-of-contents](https://github.com/Oktavilla/markdown-it-table-of-contents) 的选项。

### 更多配置

更多配置请参考官方文档。

**参考:**

[官方 Markdown 配置](https://vuepress.vuejs.org/zh/config/#markdown)
