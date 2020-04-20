<template>
    <div :class="$style.root">
        <div :class="$style.info">
            <div :class="$style.title">{{ _current.key }}</div>
            <div :class="$style.meta">共 {{ _current.count }} 篇文章</div>
        </div>
    </div>
</template>

<script>
import { filterPosts } from '@theme/helpers/postData.js';
import TransitionFadeSlide from '@theme/components/TransitionFadeSlide.vue';
export default {
    name: 'HeaderBoxInfo',
    components: {
        TransitionFadeSlide,
    },
    props: {
        current: Object,
    },
    computed: {
        _current() {
            const $current = this.current;
            if (!$current) {
                return {
                    key: 'ALL',
                    count: this.$posts ? this.$posts.length : 0,
                };
            }
            const _pages = filterPosts($current.pages);
            return Object.assign({
                count: _pages.length,
            }, $current);
        },
    },
    mounted() {
        this.$scrollReveal(`.${this.$style.title}`, { origin: 'left', distance: '100px', interval: 100 });
        this.$scrollReveal(`.${this.$style.meta}`, { origin: 'right', distance: '100px', interval: 100 });
    },
};
</script>
<style lang="stylus" module>
.root {
    margin-top: $navbarHeight;
    position: relative;
    height: 150px;
    background-color: rgba(#888, 0.05);
    border-top: 1px solid $borderColor;
    border-bottom: 1px solid $borderColor;
    transition: all 0.3s;

    .info {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        color: rgba($textColor, 0.8);
        padding: 3rem 0;
        box-sizing: border-box;
        transition: all 0.3s;

        .title {
            font-size: 25px;
            line-height: 30px;
            font-weight: 700;
            margin-bottom: 0.3rem;
        }

        .meta {
            font-size: 12px;
        }
    }
}
</style>
