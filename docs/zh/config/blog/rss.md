# RSS

RSS 配置。

## Introduce

通过 `blogConfig.rss` 配置评论组件, 只支持 `blog` 类型。

## Usage

使用方式如下：

```js
// micro-app.vuepress.config.js
module.exports = {
    blogConfig: {
        rss: {
          siteUrl: 'https://zyao89.cn', // required
          copyright: '2018 Zyao89', // optional
          filter: (frontmatter) => { return [true|false] }, // filter some post
          count: 20, // How much articles
        }
    }
}
```

## Options

### siteUrl

- required: `true`
- 类型: `string`
- 默认值: `undefined`
- example: `https://zyao89.cn`

网站地址.

### copyright

- required: `false`
- 类型: `string`
- 默认值: `${$themeConfig.copyright}`
- example: `reco_luan 2019`

版权信息。

### filter

- required: `false`
- 类型: `function`
- 默认值: `(frontmatter) => true`
- example: `(frontmatter) => { return [true|false] }`

博客的过滤器。

### count

- required: `false`
- 类型: `number`
- default: `20`

显示最近多少篇博客。
