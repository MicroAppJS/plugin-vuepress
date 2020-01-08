<template>
    <main class="page" :class="$style.root">
        <slot name="top" />

        <PageInfo :info="$page" />

        <TransitionFadeSlide direction="x">
            <Content class="theme-default-content" :class="$style.content" />
        </TransitionFadeSlide>

        <PageEdit />

        <PageNav v-bind="{ sidebarItems }" />

        <slot name="bottom" />

        <Comment />
    </main>
</template>

<script>
import ParentLayout from '@default-theme/components/Page.vue';
import PageInfo from '@theme/components/PageInfo.vue';
import TransitionFadeSlide from '@theme/components/TransitionFadeSlide.vue';
import Comment from '@theme/components/Comment.vue';
export default {
    name: 'Page',
    extends: ParentLayout,
    components: {
        PageInfo,
        TransitionFadeSlide,
        Comment,
    },
};
</script>

<style lang="stylus" module>
.root {
    padding-top: $navbarHeight;
}

.content[class] {
    padding-top: 0;
}
</style>
