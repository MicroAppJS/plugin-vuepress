# 首页配置

详细的首页参数配置。

## Introduce

默认的主题风格没有亮点，所以我们扩展了主题首页的展示方式，并且增加了 [博客类型（type: blog）首页布局](../blog/home.md)。

## Usage

默认的主题提供了一个首页（Homepage）的布局 (用于 [这个网站的主页](/))。想要使用它，需要在你的根级 README.md 的 `YAML front matter` 指定 `home: true`。以下是一个如何使用的例子：

```yaml
# 这是你的主页
---
home: true
heroImage: /logo.png
heroText: 首页标题
tagline: 首页副标题
badges:
    - user=MicroAppJS&repo=vuepress&type=star&count=true
    - https://img.shields.io/badge/download-12,292-orange.svg?style=social&logo=npm
actionText: 快速上手 →
actionLink: /zh/guide/
features:
    - title: 简洁至上
      details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
      image: /banner1.png
    - title: Vue驱动
      details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
    - title: 高性能
      details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: true
---
```

::: tip
你可以将相应的内容设置为 `null` 来禁用标题和副标题。
:::

例如：

```yaml
# 这是你的主页
---
home: true
heroImage: null
heroText: null
tagline: null
---
```

任何 `YAML front matter` 之后额外的内容将会以普通的 markdown 被渲染，并插入到 `features` 的后面。

## Options

### home

- 类型: `Boolean`
- 默认值: `undefined`

配置当前 README.md 是否以首页布局渲染。

### heroImage

- 类型: `string`
- 默认值: `undefined`

标题上方图标，用于显示 logo。

### heroText

- 类型: `string`
- 默认值: `Hello`

首页标题，如果没有配置则显示 `microapp/config/vuepress.js` 中的 `title` 参数。

### tagline

- 类型: `string`
- 默认值: `Welcome to your VuePress site`

首页副标题，如果没有配置则显示 `microapp/config/vuepress.js` 中的 `description` 参数。

### badges

- 类型: `Array`
- 默认值: `undefined`

展示 `badges`, 显示在副标题下方。如下：

<iframe
    src="https://ghbtns.com/github-btn.html?user=MicroAppJS&repo=vuepress&type=star&count=true"
    frameborder="0"
    scrolling="0"
    width="auto"
    height="20px"
></iframe>

![star](https://img.shields.io/badge/download-12,292-orange.svg?style=social&logo=npm)

**配置参数:**

- `user=MicroAppJS&repo=vuepress&type=star&count=true`
- `https://img.shields.io/badge/download-12,292-orange.svg?style=social&logo=npm`

```yaml
---
badges:
    - user=MicroAppJS&repo=vuepress&type=star&count=true
    - https://img.shields.io/badge/download-12,292-orange.svg?style=social&logo=npm
---
```

### actionText

- 类型: `string | Array`
- 默认值: `undefined`

首页按钮文本。

### actionLink

- 类型: `string | Array`
- 默认值: `undefined`

首页按钮跳转链接。请与 `actionText` 成对配置。

### features

- 类型: `Array`
- 默认值: `undefined`

多个文本内容介绍。配置参考如下：

```yaml
---
features:
    - image: /banner1.png
    - title: 简洁至上
      details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
    - image: /banner2.png
    - title: Vue 驱动
      details: 享受 Vue + webpack 的开发体验，可以在 Markdown 中使用 Vue 组件，又可以使用 Vue 来开发自定义主题。
    - image: /banner3.png
    - title: 高性能
      details: VuePress 会为每个页面预渲染生成静态的 HTML，同时，每个页面被加载的时候，将作为 SPA 运行。
---
```

::: tip
如果你的配置中，没有任何一条 `image` 参数，则我们会展示为默认主题的展示形式。
:::

### footer

- 类型: `Boolean`
- 默认值: `undefined`

配置当前 README.md 是否展示底部页脚内容。

**参考:**

- [底部配置](footer.md)
