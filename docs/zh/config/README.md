# 介绍

进阶中将介绍我们的主题特色

首先，你需要在根目录中创建 `micro-app.vuepress.config.js` 文件。

::: warning 重要
针对原有主题进行了增强，请不要在配置中声明 `theme` 和 `themeConfig` 参数。
:::

---

**部分快速配置展示：**

```js
// micro-app.vuepress.config.js
module.exports = {
    svgIconsDir: "icons",
    footer: {
        powerby: true, // default: true
        copyright: "2019 - present, Zyao89"
        beian: {
            text: 'IPC 备案 xxxxx',
            link: 'http://www.beian.miit.gov.cn/',
        },
    },
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
