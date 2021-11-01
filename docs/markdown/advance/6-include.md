# 导入文本

::: tip 注意
由于代码段的导入将在 webpack 编译之前执行，因此你无法使用 webpack 中的路径别名，`node_modules` > `@`（文档根目录） > 相对目录。
:::

::: warning 注意
由于导入是全局性质的，以下内容中`<<<` 和 `include` 之间的空格，使用时需要删除
:::

你可以通过下述的语法导入已经存在的文件文本：

``` md
<<< include(@/filepath)
```

或者

``` md
<<< include @/filepath
```

**输入**

```
<<< include(./fragments/snippet.js)
```

**输出**

<<<include(./fragments/snippet.js)


为了只导入对应部分的代码，你也可运用 [VS Code region](https://code.visualstudio.com/docs/editor/codebasics#_folding)。你可以在文件路径后方的 `#` 紧接着提供一个自定义的区域名称（预设为 `snippet` ）

**输入**

``` md
<<< include(./fragments/snippet-with-region.js#snippet)
```

**代码文件**

<<< ./fragments/snippet-with-region.js

**输出**

<<<include(./fragments/snippet-with-region.js#snippet)
