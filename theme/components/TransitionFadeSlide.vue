<script>
export default {
    name: 'TransitionFadeSlide',
    functional: true,
    props: {
        appear: {
            type: Boolean,
            default: true,
        },
        direction: {
            type: String,
            default: 'y',
        },
        group: {
            type: Boolean,
            default: false,
        },
        mode: {
            type: String,
            default: 'out-in',
        },
        tag: {
            type: String,
            default: '',
        },
        delay: {
            type: [ String, Number ],
            default: 0,
        },
    },
    computed: {
        name() {
            return `fade-slide-${this.direction}`;
        },
        component() {
            return this.group ? 'transition-group' : 'transition';
        },
    },
    render(h, { props, children }) {
        const style = {};
        if (!props.delay) {
            style.transitionDelay = `${props.delay}s`;
        }
        return h(
            props.group ? 'TransitionGroup' : 'Transition',
            {
                props: {
                    name: `fade-slide-${props.direction}`,
                    ...props,
                },
                style,
            },
            children
        );
    },
};
</script>

<style lang="stylus">
.fade-slide-y-enter-active {
    transition: all 0.3s ease;
}

.fade-slide-y-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-slide-y-enter, .fade-slide-y-leave-to {
    transform: translateY(10px);
    opacity: 0;
}

.fade-slide-x-enter-active {
    transition: all 0.3s ease;
}

.fade-slide-x-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-slide-x-enter, .fade-slide-x-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>
