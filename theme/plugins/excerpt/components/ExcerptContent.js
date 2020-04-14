import Vue from 'vue';
import pageExcerptsComponents from '@internal/page-excerpts-components';
import { getComponent } from '@app/util';

const pageExcerptsComponentsGetter = layout => pageExcerptsComponents[layout];

export function getPageExcerptsAsyncComponent(pageKey) {
    return getComponent(pageExcerptsComponentsGetter, pageKey);
}

export default {
    props: {
        pageKey: String,
        slotKey: {
            type: String,
            default: 'default',
        },
    },
    render(h) {
        const pageKey = this.pageKey || this.$parent.$page.key;

        /**
     * This is for use cases that render `<CustomContent />`
     * with dynamic pageKey from current $page.
     */
        if (!Vue.component(pageKey)) {
            Vue.component(pageKey, getPageExcerptsAsyncComponent(pageKey));
        }

        if (Vue.component(pageKey)) {
            return h(pageKey);
        }
        return h('');
    },
};
