import ScrollReveal from 'scrollreveal';
export default function({ Vue }) {
    Vue.prototype.$scroll = ScrollReveal({
        reset: true,
    });
}
