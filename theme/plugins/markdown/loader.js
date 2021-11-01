
module.exports = function(source) {
    const file = this.resourcePath;
    // console.info('file:', file);
    return require('@vuepress/markdown-loader').call(this, source);
};
