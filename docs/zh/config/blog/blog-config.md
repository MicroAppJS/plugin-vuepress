# 高级配置

博客高级配置，只适用于博客类型的配置。

## Usage

配置方式如下：

```js
// micro-app.vuepress.config.js
module.exports = {
    blogConfig: {
        categoriesPath: "/categories/",
        tagsPath: "/tags/",
        timelinePath: "/timeline/",
        timelineTitle: 'Tomorrow will be better!',
        pageSize: 10,
        postsDir: 'posts',
        permalink: '/posts/:year/:month/:day/:slug.html',
        copyright: true, // or { text: '', noSelect: false, noCopy: false, minLength: 0 }
        sitemap: {}, // default: undefined
    }
}
```

## Options

### categoriesPath

- 类型: `string`
- 默认值: `/categories/`

分类链接地址。

### tagsPath

- 类型: `string`
- 默认值: `/tags/`

标签链接地址。

### timelinePath

- 类型: `string`
- 默认值: `/timeline/`

时间轴链接地址。

### timelineTitle

- 类型: `string`
- 默认值: `Tomorrow will be better!`

时间轴顶部展示信息。

### pageSize

- 类型: `number`
- 默认值: `10`

分页大小，默认为每页 10 条。

### postsDir

- 类型: `string`
- 默认值: `posts`

博客文章的根目录。

### permalink

- 类型: `string`
- 默认值: `/posts/:year/:month/:day/:slug.html`

`postsDir` 目录下的文章使用的永久链接格式。

#### 模板变量

| 变量 | 介绍 |
| --- | --- |
| :year | 文章发布的年份 (4数字) |
| :month | 文章发布的月份 (2数字) |
| :i_month | 文章发布的月份 (前面不带0) |
| :day | 文章发布的日份 (2数字) |
| :i_day | 文章发布的日份 (前面不带0) |
| :slug | 蛞蝓化文件路径 (不带扩展名) |
| :regular | VuePress默认的生成永久链接的方式 |

### copyright

- 类型: `boolean|string|object`
- 默认值: `true`

是否在文章下方增加版权信息，和自定义内容。

#### copyright.noCopy

- 类型: `boolean`
- 默认值: `false`

是否禁止选中。

#### copyright.noSelect

- 类型: `boolean`
- 默认值: `false`

是否禁止选中。

#### copyright.minLength

- 类型: `number`
- 默认值: `0`

触发剪贴板组件或 noCopy 效果的最小文本长度。

### sitemap

- 类型: `object`
- 默认值: `undefined`

It will be enabled when hostname is provided. e.g.

```js
{
    hostname: 'https://yourdomain'
    // or siteUrl
}
```

The 404 page is excluded by default. Further options, please head to [vuepress-plugin-sitemap](https://github.com/ekoeryanto/vuepress-plugin-sitemap#options)
