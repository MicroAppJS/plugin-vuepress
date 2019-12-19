'use strict';

/**
 * Module dependencies.
 */

const { chalk } = require('@vuepress/shared-utils');

/**
 * Wrap a function to catch error.
 * @param {function} fn
 * @returns {function(...[*]): (*|Promise|Promise<T | never>)}
 */

function wrapCommand(fn) {
    return (...args) => {
        return fn(...args).catch(err => {
            console.error(chalk.red(err.stack));
            process.exitCode = 1;
        });
    };
}

/**
 * Check if a command is built-in
 * @param {array} argv
 * @returns {boolean}
 */

function isKnownCommand(argv) {
    return [ 'dev', 'build', 'eject' ].includes(argv[0]);
}

module.exports = {
    isKnownCommand,
    wrapCommand,
};
