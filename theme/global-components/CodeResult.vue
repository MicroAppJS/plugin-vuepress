<template>
    <div :class="$style.root">
        <div :class="$style.head" :more="more">
            <div :class="$style.tools">
                <span ref="clipboardRef" :data-clipboard-text="orgCode">
                    <SvgIcon :class="$style.icon" name="copy"></SvgIcon>
                </span>
                <span v-if="isSupportMore" @click="more = !more">
                    <SvgIcon :class="$style.icon" name="more"></SvgIcon>
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
    mounted() {
        this.clipboard = new this.ClipboardJS(this.$refs.clipboardRef);
        this.clipboard.on('success', function(e) {
            console.warn('Copy Success!');
            e.clearSelection();
        });

        this.clipboard.on('error', function(e) {
            console.warn('Copy Fail!');
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
    color: #fff;
}

.head {
    position: relative;
    text-align: right;
    border-top: 1px solid darken($borderColor, 30%);
    padding: 0.5rem;

    &[more] {
        border-bottom: 1px dashed darken($borderColor, 60%);
    }
}

.tools {
    position: relative;

    .icon {
        margin-left: 5px;
    }
}

.foot {
    padding: 0.5rem;
}
</style>
