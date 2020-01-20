const path = require('path');

module.exports = (options = {}, ctx) => ({
    name: 'baiduHmt',

    define() {
        const { hmtID } = options;
        return {
            BD_HMTID: hmtID,
        };
    },

    enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js'),
});
