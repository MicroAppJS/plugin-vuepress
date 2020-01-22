
export default ({ router }) => {
    // Baidu
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
        const _hmt = window._hmt = window._hmt || [];
        (function() {
            const hm = document.createElement('script');
            const curProtocol = window.location.protocol.split(':')[0];
            // eslint-disable-next-line no-undef
            hm.src = (curProtocol === 'https' ? 'https' : 'http') + `://hm.baidu.com/hm.js?${BD_HMTID}`;
            const s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(hm, s);
        })();

        router.beforeEach((to, from, next) => {
            // 对每个页面点击添加百度统计
            if (typeof _hmt !== 'undefined') {
                if (to.fullPath) {
                    _hmt.push([ '_trackPageview', to.fullPath ]);
                }
            }

            // continue
            next();
        });
    }
};
