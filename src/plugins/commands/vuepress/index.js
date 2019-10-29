'use strict';

module.exports = function vuepressCommand(api, opts) {

    api.assertVersion('>=0.2.0');

    const registerMethods = require('./methods');
    registerMethods(api);

    const registerCommands = require('./commands');
    registerCommands(api, opts);

};
