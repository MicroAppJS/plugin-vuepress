# 快速上手

## 首先

此插件只适用于依赖 `@micro-app/cli` 项目下的工程使用。

因此，在你使用前，请确认是否依赖了 `@micro-app/cli` ？

::: warning 注意
请确保你的 Node.js 版本 >= 8.6。
:::

首先，请安装 `@micro-app/cli` 依赖。

```bash
# 安装，如果已经依赖了，请直接下一步
yarn add -D @micro-app/cli # 或者：npm install -D @micro-app/cli
```

你需要在根目录中创建 `microapp/config/vuepress.js` 文件。

::: tip
你可以通过 `micro-app init vuepress` 初始化这个配置文件
:::

## 现有项目 (依赖 micro-app/cli)

已经有了基于 `micro-app/cli` 系列的项目，可通用配置方式如下，先安装插件。

```bash
# 安装 vuepress plugin
yarn add -D @micro-app/plugin-vuepress # 或者：npm install -D @micro-app/plugin-vuepress

# 新建一个 docs 文件夹
mkdir docs

# 新建一个 markdown 文件
echo '# Hello MicroApp VuePress!' > docs/README.md
```

::: warning 注意
如果你的现有项目依赖了 webpack 3.x，推荐使用 [Yarn](https://yarnpkg.com/en/) 而不是 npm 来安装 VuePress。因为在这种情形下，npm 会生成错误的依赖树。
:::

在 `microapp/config/index.js` 中配置插件依赖:

```javascript
// microapp/config/index.js
module.exports = {
    plugins: [
        "@micro-app/plugin-vuepress",
    ],
};
```

接着，在 `package.json` 里加一些脚本:

```json
{
    "scripts": {
        "docs:dev": "micro-app vuepress dev docs",
        "docs:build": "micro-app vuepress build docs"
    }
}
```

然后就可以开始写作了:

```bash
# 开始写作
yarn docs:dev docs # 或者：npm run docs:dev docs
```

要生成静态的 HTML 文件，运行：

```bash
yarn docs:build docs # 或者：npm run docs:build docs
```

默认情况下，文件将会被生成在 `.vuepress/dist`，当然，你也可以通过 `microapp/config/vuepress.js` 中的 `dest` 字段来修改，生成的文件可以部署到任意的静态文件服务器上，参考 [部署](deploy.md) 来了解更多。


## 独立使用 (快速开始)

我们提供了一个简单快速的开始方式，如下：

```bash
# 安装 micro-app vuepress
yarn add -D @micro-app/vuepress # 或者：npm install -D @micro-app/vuepress

# 新建一个 docs 文件夹
mkdir docs

# 新建一个 markdown 文件
echo '# Hello MicroApp VuePress!' > docs/README.md

# 开始写作
npx micro-app-vuepress dev docs
```