<template>
    <span :class="$style.popup" @mouseleave="hideDetail($event)">
        <a :class="$style.link" @mouseenter="showDetail($event)">
            <slot></slot>
        </a>
        <transition name="fade">
            <div v-show="visible" :class="$style['popup-window-wrapper']">
                <div ref="popupWindowRef" :class="$style['popup-window']" :style="popupWindowStyle">
                    <slot name="content"></slot>
                </div>
            </div>
        </transition>
    </span>
</template>

<script>
export default {
    name: 'Popup',
    data() {
        return {
            visible: false,
            popupWindowStyle: {},
        };
    },
    methods: {
        showDetail(e) {
            this.visible = true;
            const currentDom = e.target;
            const { width } = currentDom.getBoundingClientRect();

            this.$nextTick(() => {
                const popupWindow = this.$refs.popupWindowRef;
                this._adjustPosition(popupWindow, width);
            });
        },
        hideDetail(e) {
            this.visible = false;
        },
        _adjustPosition(dom, currWidth) {
            const { offsetWidth } = document.body;
            const { x, width, height } = dom.getBoundingClientRect();

            this.popupWindowStyle = {
                left: (currWidth - width) / 2 + 'px',
                top: -height + 'px',
            };
            const distanceToRight = offsetWidth - (x + width);
            if (distanceToRight < 0) {
                const { offsetLeft } = dom;
                this.popupWindowStyle = {
                    ...this.popupWindowStyle,
                    left: offsetLeft + distanceToRight + 'px',
                };
            }
        },
    },
};
</script>

<style lang="stylus" module>
.popup {
    position: relative;

    .link {
        cursor: pointer;
    }

    .popup-window-wrapper {
        display: inline;

        .popup-window {
            position: absolute;
            box-sizing: border-box;
        }
    }
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
