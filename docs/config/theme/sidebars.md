# sidebars <Badge text="beta" type="warn"/>

属性 `sidebars` 用于配置左侧目录.

## 数组类型

- 类型: `Array<string>`
- 默认值: `undefined`

例如：

```js
sidebars: [
    '/guide/',
    '/config/',
],
```

则会获取当前目录，并递归加载当前目录下的所有 `*.md` 文件。

## 对象类型

- 类型: `{ [path: string]: [name: string] }`
- 默认值: `undefined`

例如：

```js
sidebars: {
    '/guide/': '导航',
    '/config/': '配置',
},
```

则会获取当前目录，并递归加载当前目录下的所有 `*.md` 文件。
且会将内容合并为一组，增加标题 `name`。
如：

```
导航
├─ 1
├─ 2
└─ 3
```

## 嵌套对象

- 类型: `{ [path: string]: Array<string|Array> }`
- 默认值: `undefined`

例如：

```js
sidebars: {
    '/guide/':  [ '导航', '1', '2', [ '3', '4' ] ],
    '/config/': '配置',
},
```

则会获取当前目录，并递归加载当前目录下的所有 `*.md` 文件。
且会对每个子文件目录进行合并为一组，增加数组中顺序索引的标题 `value`。
如：

```
README.md
├─ 导航
│  └─ README.md
├─ 1
│  └─ README.md
├─ 2
│  └─ README.md
└─ 3
   ├─ README.md
   ├─ foo.md
   └─ 4
      └─ README.md
```
