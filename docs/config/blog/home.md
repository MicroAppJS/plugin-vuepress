# 首页增强

在原有的 [首页配置](../advance/home.md) 中, 博客类型将进一步扩展配置。

## Introduce

针对于博客，布局会发生改变优化。

## Usage

默认的主题提供了一个首页（Homepage）的布局 (用于 [这个网站的主页](/))。想要使用它，需要在你的根级 README.md 的 `YAML front matter` 指定 `home: true`。以下是一个如何使用的例子：

```yaml
# 这是你的主页
---
home: true
banner: /banner.png
avatar: /avatar.png
author: Zyao89
---
```

任何 `YAML front matter` 之后额外的内容将会以普通的 markdown 被渲染，并插入到 `features` 的后面。

## Options

### home

- 类型: `Boolean`
- 默认值: `undefined`

配置当前 README.md 是否以首页布局渲染。

### banner

- 类型: `string`
- 默认值: `undefined`

头部 banner 背景。

### avatar

- 类型: `string`
- 默认值: `@theme/assets/images/avatar.png`

首页右侧信息面板的头像。

### author

- 类型: `string`
- 默认值: `${title}`

首页右侧信息面板的作者名称。
