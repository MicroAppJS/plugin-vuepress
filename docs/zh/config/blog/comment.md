# 评论

配置评论组件。

## Introduce

通过 `blogConfig.comment` 配置评论组件, 只支持 `blog` 类型。

## Usage

使用方式如下：

```js
// micro-app.vuepress.config.js
module.exports = {
    blogConfig: {
        comment: {
            type: 'vssue',
            platform: 'github-v4',
            // 其他的 Vssue 配置
            owner: 'OWNER_OF_REPO',
            repo: 'NAME_OF_REPO',
            clientId: 'YOUR_CLIENT_ID',
            clientSecret: 'YOUR_CLIENT_SECRET',
        }
    }
}
```

## Options

### type

- 类型: `string`
- 默认值: `undefined`

选择评论组件类型。
