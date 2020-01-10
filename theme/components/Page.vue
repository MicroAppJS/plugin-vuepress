<template>
    <main class="page" :class="$style.root">
        <slot name="top" />

        <PageInfo :info="$page" />

        <TransitionFadeSlide direction="x">
            <Content class="theme-default-content" :class="$style.content" role="content" />
        </TransitionFadeSlide>

        <Copyright :info="$page" />

        <PageEdit />

        <PageNav v-bind="{ sidebarItems: pageNavInfos }" />

        <slot name="bottom" />

        <Comment />
    </main>
</template>

<script>
import ParentLayout from '@default-theme/components/Page.vue';
import PageInfo from '@theme/components/PageInfo.vue';
import TransitionFadeSlide from '@theme/components/TransitionFadeSlide.vue';
import Comment from '@theme/components/Comment.vue';
import Copyright from '@theme/components/Copyright.vue';
export default {
    name: 'Page',
    extends: ParentLayout,
    components: {
        PageInfo,
        TransitionFadeSlide,
        Comment,
        Copyright,
    },
    computed: {
        pageNavInfos() {
            if (this.$type === 'blog') {
                const _posts = JSON.parse(JSON.stringify(this.$posts));
                return (_posts || []).map(item => {
                    item.type = 'page';
                    item.path = decodeURIComponent(item.path);
                    return item;
                });
            }
            return this.sidebarItems;
        },
    },
};
</script>

<style lang="stylus" module>
.root {
    padding-top: $navbarHeight;
}

.content[class][role=content] {
    padding-top: 0;
}
</style>
