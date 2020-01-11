import OutboundLink from '@theme/components/OutboundLink';
import ClipboardJS from 'clipboard';
import mixins from './mixins';
import clipboardMixins from './mixins/clipboard';

export default ({
    Vue,
}) => {
    // 注册到vue原型上
    Vue.prototype.ClipboardJS = ClipboardJS;
    // mixins
    Vue.mixin(mixins);
    Vue.mixin(clipboardMixins);
    // 覆盖原逻辑
    Vue.component('OutboundLink', OutboundLink);
};
