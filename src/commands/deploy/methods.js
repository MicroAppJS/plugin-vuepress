'use strict';

// create
module.exports = {
    beforeCommandVuepressDeploy: {
        type: 'EVENT',
        description: 'Vuepress 的 deploy 命令前事件',
    },
    addCommandVuepressDeploy: {
        type: 'ADD',
        description: '增加 Vuepress 的 deploy 命令 type 类型',
    },
    afterCommandVuepressDeploy: {
        type: 'EVENT',
        description: 'Vuepress 的 deploy 命令后事件',
    },
};
