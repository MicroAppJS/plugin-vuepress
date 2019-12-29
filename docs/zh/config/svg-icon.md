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
| copyright | `<SvgIcon name="copyright"/>` | <SvgIcon name="copyright"/> |
| date | `<SvgIcon name="date"/>` | <SvgIcon name="date"/> |
| friend | `<SvgIcon name="friend"/>` | <SvgIcon name="friend"/> |
| github | `<SvgIcon name="github"/>` | <SvgIcon name="github"/> |
| link | `<SvgIcon name="link"/>` | <SvgIcon name="link"/> |
| tags | `<SvgIcon name="tags"/>` | <SvgIcon name="tags"/> |
| zap | `<SvgIcon name="zap"/>` | <SvgIcon name="zap"/> |
| home | `<SvgIcon name="home"/>` | <SvgIcon name="home"/> |
| package | `<SvgIcon name="package"/>` | <SvgIcon name="package"/> |
| help | `<SvgIcon name="help"/>` | <SvgIcon name="help"/> |
| info | `<SvgIcon name="info"/>` | <SvgIcon name="info"/> |
| doc | `<SvgIcon name="doc"/>` | <SvgIcon name="doc"/> |
| rss | `<SvgIcon name="rss"/>` | <SvgIcon name="rss"/> |

使用方式如下：

```vue
<SvgIcon name="tags"/>
<SvgIcon name="tags" size="20"/>
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
