// 1. code copy

// 2. support echarts
// https://github.com/ravenq/markdown-it-vue/blob/master/src/markdown-it-plugin-echarts.js

module.exports = md => {

    const fence = md.renderer.rules.fence.bind(md.renderer.rules);
    md.renderer.rules.fence = (...args) => {
        const [tokens, idx] = args;
        const token = tokens[idx];
        const code = token.content;

        const lang = token.info.trim();
        // 判断该 fence 是否在 :::demo 内
        const prevToken = tokens[idx - 1];
        const isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/);

        const rawCode = fence(...args);
        let mdMyCode = '';
        if (['vue', 'html'].includes(lang) && !isInDemoContainer) {
            mdMyCode = `<CodeResult lang="${lang}" code="${encodeURIComponent(code.trim())}">${code.trim()}</CodeResult>`;
        } else {
            mdMyCode = `<CodeResult lang="${lang}" code="${encodeURIComponent(code.trim())}"></CodeResult>`;
        }

        if (['vue', 'html'].includes(lang) && isInDemoContainer) {
            mdMyCode = `<template slot="highlight">${mdMyCode}}</template>`;
        }
        return rawCode.replace('<!--beforeend-->', `${mdMyCode}<!--beforeend-->`);
    };
};
