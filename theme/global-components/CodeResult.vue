<template>
    <div :class="$style.root">
        <div :class="$style.head" :more="more">
            <div :class="$style.tools">
                <span v-if="copyMessage">{{ copyMessage }}</span>
                <span ref="clipboardRef" :data-clipboard-text="orgCode" :class="$style.icon">
                    <SvgIcon name="copy"></SvgIcon>
                </span>
                <span v-if="isSupportMore" @click="more = !more" :class="$style.icon">
                    <SvgIcon name="more"></SvgIcon>
                </span>
            </div>
        </div>
        <div v-if="more" :class="$style.foot">
            <slot>{{ output }}</slot>
        </div>
    </div>
</template>

<script>
const SUPPORT = [ 'vue', 'html' ];
const SUPPORT_OTHERS = [
    // 'echarts',
];
export default {
    name: 'CodeResult',
    props: {
        lang: {
            type: String,
            default: '',
        },
        code: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            more: false,
            copyMessage: null,
        };
    },
    computed: {
        isSupportMore() {
            const lang = this.lang;
            return [].concat(SUPPORT).concat(SUPPORT_OTHERS).includes(lang);
        },
        orgCode() {
            const orgCode = decodeURIComponent(this.code);
            return orgCode || '';
        },
        output() {
            const lang = this.lang;
            if (SUPPORT_OTHERS.includes(lang)) {
                const orgCode = this.orgCode;
                try {
                    const result = JSON.parse(orgCode);
                    return result;
                } catch (e) {
                    return `<pre>${e}</pre>`;
                }
            }
            return '';
        },
    },
    watch: {
        copyMessage(nV) {
            if (nV) {
                clearTimeout(this.iCopyMessageTimer);
                this.iCopyMessageTimer = setTimeout(() => {
                    this.copyMessage = null;
                }, 3000);
            }
        },
    },
    mounted() {
        this.clipboard = new this.ClipboardJS(this.$refs.clipboardRef);
        this.clipboard.on('success', e => {
            // console.warn('Copy Success!');
            this.copyMessage = 'Copy Success!';
            e.clearSelection();
        });

        this.clipboard.on('error', e => {
            console.warn('Copy Fail!', e);
            this.copyMessage = 'Copy Fail!';
        });
    },
    beforeDestroy() {
        if (this.clipboard) {
            this.clipboard.destroy();
        }
    },
};
</script>

<style lang="stylus" module>
.root {
    position: relative;
    color: $whiteColor;
}

.head {
    position: relative;
    text-align: right;
    border-top: 1px solid darken($borderColor, 40%);
    padding: 0.5rem;

    &[more] {
        border-bottom: 1px dashed darken($borderColor, 60%);
    }
}

.tools {
    position: relative;
    font-size: 12px;

    .icon {
        margin-left: 5px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            color: $accentColor;
        }
    }
}

.foot {
    padding: 0.5rem;
}
</style>
