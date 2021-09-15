export default function({ Vue, isServer }) {
    if (isServer) {
        Vue.prototype.$scroll = {};
        Vue.prototype.$scrollReveal = () => {};
    } else {
        const ScrollReveal = require('scrollreveal').default;
        const scrollReveal = ScrollReveal({
            reset: true,
        });
        Vue.prototype.$scroll = scrollReveal;
        Vue.prototype.$scrollReveal = scrollReveal.reveal.bind(scrollReveal);
    }
}
