# SVG图标

引入全局组件 `SvgIcon`.

## Introduce

通过 `svgIconsDir` 指定自定义的图标目录。如果传入的是相对路径，则会基于 `.vuepress` 目录进行解析。

```js
// micro-app.vuepress.config.js
module.exports = {
    svgIconsDir: "icons"
}
```

目录结构如下：

```
.
├─ docs
│  └─ .vuepress
│     └─ icons
│        └─ home.svg
│        └─ tags.svg
│        └─ ...
└─ package.json
```

## Usage

我们已经内置了一部分图标，部分展示如下：

| name | code | icon |
| --- | --- | --- | --- |
| author | `<SvgIcon name="author"/>` | <SvgIcon name="author"/> |
| beian | `<SvgIcon name="beian"/>` | <SvgIcon name="beian"/> |
| category | `<SvgIcon name="category"/>` | <SvgIcon name="category"/> |
| copy | `<SvgIcon name="copy"/>` | <SvgIcon name="copy"/> |
| copyright | `<SvgIcon name="copyright"/>` | <SvgIcon name="copyright"/> |
| date | `<SvgIcon name="date"/>` | <SvgIcon name="date"/> |
| doc | `<SvgIcon name="doc"/>` | <SvgIcon name="doc"/> |
| friend | `<SvgIcon name="friend"/>` | <SvgIcon name="friend"/> |
| github | `<SvgIcon name="github"/>` | <SvgIcon name="github"/> |
| guide | `<SvgIcon name="guide"/>` | <SvgIcon name="guide"/> |
| help | `<SvgIcon name="help"/>` | <SvgIcon name="help"/> |
| home | `<SvgIcon name="home"/>` | <SvgIcon name="home"/> |
| info | `<SvgIcon name="info"/>` | <SvgIcon name="info"/> |
| link | `<SvgIcon name="link"/>` | <SvgIcon name="link"/> |
| more | `<SvgIcon name="more"/>` | <SvgIcon name="more"/> |
| package | `<SvgIcon name="package"/>` | <SvgIcon name="package"/> |
| rss | `<SvgIcon name="rss"/>` | <SvgIcon name="rss"/> |
| run | `<SvgIcon name="run"/>` | <SvgIcon name="run"/> |
| tags | `<SvgIcon name="tags"/>` | <SvgIcon name="tags"/> |
| zap | `<SvgIcon name="zap"/>` | <SvgIcon name="zap"/> |

使用方式如下：

```vue
<SvgIcon name="tags"/>
<SvgIcon name="tags" size="20"/>
<SvgIcon name="tags" size="32"/>
```

## Options

### name

- 类型: `string`
- 默认值: `undefined`

图标的名称，对应图标文件名称。

### size

- 类型: `string | Numebr`
- 默认值: `14`

图标大小尺寸

### height

- 类型: `string | Numebr`
- 默认值: `null`

图标高度

### width

- 类型: `string | Numebr`
- 默认值: `null`

图标宽度
