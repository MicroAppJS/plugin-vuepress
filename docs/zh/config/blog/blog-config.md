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
        pageSize: 10,
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

### pageSize

- 类型: `number`
- 默认值: `10`

分页大小，默认为每页 10 条。
