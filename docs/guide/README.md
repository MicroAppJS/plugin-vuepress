# 介绍

`@micro-app/plugin-vuepress` 只是作为 `VuePress` 的增强，用于适配 `@micro-app` 系列的功能补充插件。

## 如何工作

它的底层还是 `VuePress`，所以 `VuePress` 的所有配置功能这里都是支持的。

## 快速上手

::: warning 注意
请确保你的 Node.js 版本 >= 8。
:::

### 现有项目

我们只希望它适用于依赖 `@micro-app/cli` 项目下的工程使用。

因此，在你使用前，请确认是否依赖了 `@micro-app/cli` ？

``` bash
# 安装，如果已经依赖了，请直接下一步
yarn add -D @micro-app/cli # 或者：npm install -D @micro-app/cli
```

``` bash
# 安装 vuepress plugin
yarn add -D @micro-app/plugin-vuepress # 或者：npm install -D @micro-app/plugin-vuepress

# 新建一个 docs 文件夹
mkdir docs

# 新建一个 markdown 文件
echo '# Hello VuePress!' > docs/README.md

# 开始写作
npx vuepress dev docs
```

::: warning 注意
如果你的现有项目依赖了 webpack 3.x，推荐使用 [Yarn](https://yarnpkg.com/en/) 而不是 npm 来安装 VuePress。因为在这种情形下，npm 会生成错误的依赖树。
:::

接着，在 `package.json` 里加一些脚本:

``` json
{
  "scripts": {
    "docs:dev": "micro-app vuepress dev docs",
    "docs:build": "micro-app vuepress build docs"
  }
}
```

然后就可以开始写作了:

``` bash
yarn docs:dev # 或者：npm run docs:dev
```

要生成静态的 HTML 文件，运行：

``` bash
yarn docs:build # 或者：npm run docs:build
```

默认情况下，文件将会被生成在 `.vuepress/dist`，当然，你也可以通过 `micro-app.vuepress.config.js` 中的 `dest` 字段来修改，生成的文件可以部署到任意的静态文件服务器上，参考 [部署](basic/deploy.md) 来了解更多。
