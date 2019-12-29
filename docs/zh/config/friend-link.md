# 友情链接

配置添加一些友情链接展示。

## Introduce

通过 `friendLinks` 配置需要展示的链接信息。

## Usage

使用方式如下：

```js
// micro-app.vuepress.config.js
module.exports = {
    friendLinks: [
        {
            title: "名称",
            logo: "/logo.png",
            link: "http://www.baidu.com",
            description: "这是一个描述信息"
        }
    ],
}
```

## Options

### friendLinks

- 类型: `Array`
- 默认值: `undefined`

链接信息集合。具体参数如下：

### title

- 类型: `string`
- 默认值: `undefined`

标题名称

### logo

- 类型: `string`
- 默认值: `undefined`

logo 图标

### link

- 类型: `string`
- 默认值: `undefined`

链接地址

### description

- 类型: `string`
- 默认值: `undefined`

详细描述信息
