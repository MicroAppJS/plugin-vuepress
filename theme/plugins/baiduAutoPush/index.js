const path = require('path');

module.exports = (options = {}, ctx) => ({
    name: 'baiduAutoPush',

    enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js'),
});
