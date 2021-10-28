# 导入代码段

::: tip 注意
由于代码段的导入将在 webpack 编译之前执行，因此你无法使用 webpack 中的路径别名，因此加载逻辑分为三层，`node_modules` > `@`（文档根目录） > 相对目录。
:::


你可以通过下述的语法导入已经存在的文件中的代码段：

``` md
<<< ./filepath
```

它也支持 [行高亮](./4-highlight.md#代码块中的行高亮)：

``` md
<<< ./filepath{highlightLines}
```

**输入**

```
<<< ./markdown/advance/fragments/snippet.js{2}
```

**输出**

<<< ./markdown/advance/fragments/snippet.js{2}


为了只导入对应部分的代码，你也可运用 [VS Code region](https://code.visualstudio.com/docs/editor/codebasics#_folding)。你可以在文件路径后方的 `#` 紧接着提供一个自定义的区域名称（预设为 `snippet` ）

**输入**

``` md
<<< ./markdown/advance/fragments/snippet-with-region.js#snippet{1}
```

**代码文件**

<<< ./markdown/advance/fragments/snippet-with-region.js

**输出**

<<< ./markdown/advance/fragments/snippet-with-region.js#snippet{1}
