# 底部配置

详细的页脚底部参数配置。

## Introduce

通过 `footer` 配置页脚信息。

## Usage

参数配置结构如下：

```js
// micro-app.vuepress.config.js
module.exports = {
    footer: {
        powerby: true, // default: true
        copyright: "2019 - present, Zyao89"
        beian: {
            text: 'IPC 备案 xxxxx',
            link: 'http://www.beian.miit.gov.cn/',
        },
    },
}
```

## Options

### powerby

- 类型: `Boolean`
- 默认值: `true`

PowerBy 希望你不要禁用。

### copyright

- 类型: `string | Boolean`
- 默认值: `true`

展示版权信息, 如果外层配置了 `copyright`, 我们会默认帮你显示。

如果你想展示不同的内容信息，你可以以 `stirng` 方式重新定义。

### beian

- 类型: `string | Object`
- 默认值: `undefined`

备案配置信息。
