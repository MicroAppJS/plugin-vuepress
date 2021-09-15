'use strict';

// create
module.exports = {
    beforeCommandVuepressCreate: {
        type: 'EVENT',
        description: 'Vuepress 的 create 命令前事件',
    },
    addCommandVuepressCreate: {
        type: 'ADD',
        description: '增加 Vuepress 的 create 命令 type 类型',
    },
    afterCommandVuepressCreate: {
        type: 'EVENT',
        description: 'Vuepress 的 create 命令后事件',
    },
};
