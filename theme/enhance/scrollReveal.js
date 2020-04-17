export default function({ Vue, isServer }) {
    if (isServer) {
        Vue.prototype.$scroll = {};
    } else {
        const ScrollReveal = require('scrollreveal').default;
        Vue.prototype.$scroll = ScrollReveal({
            reset: true,
        });
    }
}
