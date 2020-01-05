# 全局计算属性

在 VuePress 中，内置了一些核心的[计算属性](https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7)，以供自定义主题使用。

## $site

这是你现在看到的这个网站的 `$site` 的值：

``` json
{
  "title": "VuePress",
  "description": "Vue 驱动的静态网站生成器",
  "base": "/",
  "pages": [
    {
      "lastUpdated": 1524027677000,
      "path": "/",
      "title": "VuePress",
      "frontmatter": {}
    },
    ...
  ]
}
```

## $page

这是你现在看到的这个页面的 `$page` 的值：

``` json
{
  "title": "Global Computed",
  "frontmatter": {
    "sidebar": "auto"
  },
  "regularPath": "/zh/miscellaneous/global-computed.html",
  "key": "v-bc9a3e3f9692d",
  "path": "/zh/miscellaneous/global-computed.html",
  "headers": [
    {
      "level": 2,
      "title": "$site",
      "slug": "site"
    },
    {
      "level": 2,
      "title": "$page",
      "slug": "page"
    },
    ...
  ]
}
```

## $frontmatter

[$page](#page).frontmatter 的引用。

## $title

用于当前页面的 `<title>` 标签的值。

## $description

用于当前页面的 `<meta name="description" content="...">` 的 `content` 值。

## $themeConfig

即 `siteConfig.themeConfig`。

## $type

这是现在网站的类型。（如：`doc`, `blog`）

## $posts

所有文章列表。

## $postsForTags

所有标签文章列表。

## $postsForCategories

所有分类文章列表。

## $blogConfig

博客配置，即 `themeConfig.blogConfig`。
