<template>
    <svg
        :class="$style.svgIcon"
        :version="version"
        :width="currentSize.width"
        :height="currentSize.height"
        :viewBox="box"
    >
        <use :xlink:href="icon.id" />
    </svg>
</template>

<script>
export default {
    name: 'SvgIcon',
    props: {
        name: {
            type: String,
            required: true,
        },
        size: {
            type: [ Number, String ],
            default: 14,
        },
        height: {
            type: [ Number, String ],
            default: null,
        },
        width: {
            type: [ Number, String ],
            default: null,
        },
        version: {
            type: String,
            default: '1.1',
        },
    },
    data() {
        return {
            xml: null,
        };
    },
    async created() {
        if (!this.name) {
            return;
        }
        this.xml = await this.load();
    },
    computed: {
        baseSize() {
            let size = this.size;
            size = Number(size);
            if (isNaN(size) || size <= 0) {
                return 12;
            }
            return size;
        },
        icon() {
            if (!this.xml) {
                return {
                    width: 0,
                    height: 0,
                    id: '',
                };
            }
            const viewBox = this.xml.default.viewBox.split(' ');
            return {
                width: viewBox[2] || 0,
                height: viewBox[3] || 0,
                id: '#' + this.xml.default.id,
            };
        },
        box() {
            return `0 0 ${this.icon.width} ${this.icon.height}`;
        },
        scale() {
            if (this.icon.height) {
                return this.icon.width / this.icon.height;
            }
            return 1;
        },
        currentSize() {
            let height = this.height;
            let width = this.width;
            // 不传递 width 与 height，就当做正方形处理，size 字段生效
            // 否则就按比例处理
            if (height === null && width === null) {
                return {
                    width: 1 * this.baseSize,
                    height: 1 * this.baseSize,
                };
                // 指定了宽度，按宽度比例计算
            } else if (width !== null) {
                width = Number(width);
                if (isNaN(width) || width <= 0) {
                    width = 1 * this.baseSize();
                }
                return {
                    width,
                    height: width / this.scale,
                };
                // 指定了高度，按高度比例计算
            }
            height = Number(height);
            if (isNaN(height) || height <= 0) {
                height = 1 * this.baseSize;
            }
            return {
                width: height * this.scale,
                height,
            };
        },
    },
    watch: {
        async name(val) {
            if (!val) {
                return;
            }
            this.xml = await this.load();
        },
    },
    methods: {
        load() {
            let chain = Promise.resolve();
            chain = chain.then(() =>
                import(/* webpackMode: 'lazy-once', webpackChunkName: 'icon-svg' */ '@icons/' +
                    this.name +
                    '.svg')
            );
            chain = chain.catch(() =>
                import(/* webpackMode: 'lazy-once', webpackChunkName: 'icon-svg' */ '@internal-icons/' +
                    this.name +
                    '.svg')
            );
            const $themeConfig = this.$themeConfig || {};
            if ($themeConfig.svgIconsDir) {
                // custom
                chain = chain.catch(() =>
                    import(/* webpackMode: 'lazy-once', webpackChunkName: 'icon-svg' */ '@svg-icons/' +
                        this.name +
                        '.svg')
                );
            }
            chain = chain.catch(err => {
                console.error(
                    '[SvgIcon warn]',
                    `Cannot find name: "${this.name}".\n`,
                    err
                ); // 提示
                return null;
            });
            return chain;
        },
    },
};
</script>

<style module>
.svgIcon {
    display: inline-block;
    fill: currentColor;
    vertical-align: middle;
    position: relative;
    top: -1px;
}
</style>
