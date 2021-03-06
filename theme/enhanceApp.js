import mixins from './mixins';
import clipboardMixins from './mixins/clipboard';
import enhanceRouters from './enhance/routers';
import enhanceComponents from './enhance/components';
import enhanceScrollReveal from './enhance/scrollReveal';

export default options => {

    // mixins
    mixins(options);
    clipboardMixins(options);

    // 修改路由
    enhanceRouters(options);
    // 修改组件
    enhanceComponents(options);
    // 动画
    enhanceScrollReveal(options);
};
