# 介绍

当你想创建自己的博客时, 你只需要配置为 `type: blog` 即可, 如下:

```js
// micro-app.vuepress.config.js
module.exports = {
    type: "blog",
}
```

:::warning
当开启 `type: blog` 类型时，将不再支持多语言 `locales` 配置。

因为我们觉得博客应该不会写多种语言的内容吧。
:::
