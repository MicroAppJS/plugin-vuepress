'use strict';

module.exports = [
    'extends',
    'commands',
].map(name => {
    const item = require(`./${name}`);
    if (!item.configuration) {
        item.configuration = {};
    }
    if (!item.configuration.alias) {
        item.configuration.alias = `${name.replace(/\//, '_')}`;
    }
    return item;
});
