// 1. code copy

// 2. support echarts
// https://github.com/ravenq/markdown-it-vue/blob/master/src/markdown-it-plugin-echarts.js

module.exports = md => {
    const fence = md.renderer.rules.fence.bind(md.renderer.rules);
    md.renderer.rules.fence = (...args) => {
        const [ tokens, idx ] = args;
        const token = tokens[idx];
        const rawCode = fence(...args);
        const lang = token.info.trim();
        const code = token.content;
        let mdMyCode = '';
        if ([ 'vue', 'html' ].includes(lang)) {
            mdMyCode = `<CodeResult lang="${lang}" code="${encodeURIComponent(code.trim())}">${code.trim()}</CodeResult>`;
        } else {
            mdMyCode = `<CodeResult lang="${lang}" code="${encodeURIComponent(code.trim())}"></CodeResult>`;
        }
        return rawCode.replace('<!--beforeend-->', `${mdMyCode}<!--beforeend-->`);
    };
};
