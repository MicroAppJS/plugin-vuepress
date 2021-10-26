# Front Matter

## Usage

一个完整的 `Front Matter` 案例：

```yaml
---
title: 烤鸭的做法
date: 2019-08-08
sidebar: 'auto'
categories:
    - 烹饪
    - 爱好
tags:
    - 烤
    - 鸭子
private: true
---
```

## Options

### title

- 类型: `string`
- 默认值: `undefined`

文章标题，放弃通过一级目录定义标题的方式，改在 `Front Matter` 中定义。

### date

- 类型: `string`
- 默认值: `undefined`

文章创建日期，格式 `2019-08-08` 或 `2019-08-08 08:08:08`。

### sidebar

- 类型: `string`
- 默认值: `undefined`

是否开启侧边栏。

### categories

- 类型: `Array`
- 默认值: `undefined`

所属分类。

### tags

- 类型: `Array`
- 默认值: `undefined`

所属标签。

### private

- 类型: `Boolean`
- 默认值: `undefined`

文章是否私有（适用于未完成的文章）。

<br/>
<br/>
<br/>

**更多配置:**

- 参考 [深入 > Front Matter](../deep/frontmatter.md)
