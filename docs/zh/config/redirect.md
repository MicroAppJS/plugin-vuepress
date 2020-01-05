# 重定向

配置评论组件。

## Introduce

VuePress 内置了多语言系统，但你必须提供一个默认语言，否则直接访问 `/` 将只能得到 404。
然而，提供默认语言往往又意味着不那么友好的项目结构（因为默认语言下的文件会比其他语言低一级），我们有时也希望网站保留 `/` 用于更加智能地重定向（比如根据 `navigator.language` 判断用户所使用的语言自动定向到相关页面）。
`vuepress-plugin-redirect` 就是这样一个自动重定向的插件。当然，它所能做的事情不止是自动匹配语言，你可以通过定制你的重定向器实现任何页面到子页面的重定向。

因此我们再多语言时，集成了此插件。

## Usage

使用方式如下：

```js
// micro-app.vuepress.config.js
module.exports = {
    redirect: false // default: true
}
```

## Options

### redirect

- 类型: `boolean | Object`
- 默认值: `true`

当参数为 `false` 时，禁用该插件。

当参数为一个对象时，请参考：[vuepress-plugin-redirect](https://vuepress.github.io/zh/plugins/redirect/)
