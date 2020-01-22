import ClipboardJS from 'clipboard';
import mixins from './mixins';
import clipboardMixins from './mixins/clipboard';
import enhanceRouters from './enhance/routers';
import enhanceComponents from './enhance/components';

export default options => {
    const {
        Vue,
    } = options;
    // 注册到vue原型上
    Vue.prototype.ClipboardJS = ClipboardJS;

    // mixins
    Vue.mixin(mixins);
    Vue.mixin(clipboardMixins);

    // 修改路由
    enhanceRouters(options);
    // 修改组件
    enhanceComponents(options);
};
