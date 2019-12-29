# 分类和标签

## 添加博客配置

可以在导航中添加入口，配置如下：

```javascript
// micro-app.vuepress.config.js
module.exports = {
     // 博客配置
    nav: [
        // ...
        {
            text: '分类',
            link: '/categories/',
            icon: 'category',
        },
        {
            text: '标签',
            link: '/tags/',
            icon: 'tags',
        },
    ]
}
```

## 添加分类

```yaml
---
title: 【vue】快速搭建自己的博客
date: 2017-12-28
categories:
    - frontEnd
---
```

## 添加标签

```yaml
---
title: 【vue】快速搭建自己的博客
date: 2017-12-28
tags:
    - vue
    - JavaScript
---
```

> 请注意， `categories` 和 `tags` 要以数组的方式填写。
