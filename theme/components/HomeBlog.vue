<template>
    <Home>
        <BlogWrapper />
    </Home>
</template>

<script>
import Home from '@theme/components/Home.vue';
import Header from '@theme/components/Header.vue';
import BlogWrapper from '@theme/components/BlogWrapper.vue';
export default {
    name: 'HomeBlog',
    components: {
        Home, Header, BlogWrapper,
    },
    computed: {
        data() {
            return this.$page.frontmatter;
        },
        maskStyle() {
            const style = {};
            if (this.data.banner) {
                style.backgroundImage = `url(${this.$withBase(this.data.banner)})`;
            }
            return style;
        },
    },
};
</script>

<style lang="stylus" module>
.mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    background: center center / cover no-repeat;
    z-index: -1;

    &:after {
        display: block;
        content: '';
        background: rgba(0, 0, 0, 0.65);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 0;
    }
}
</style>
