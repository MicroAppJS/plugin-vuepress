<template>
    <main class="page" :class="$style.root">
        <slot name="top" />

        <PageInfo :info="$page" />

        <Content class="theme-default-content" :class="$style.content" />

        <PageEdit />

        <PageNav v-bind="{ sidebarItems }" />

        <slot name="bottom" />
    </main>
</template>

<script>
import ParentLayout from '@default-theme/components/Page.vue';
import PageInfo from '@theme/components/PageInfo.vue';
export default {
    name: 'Page',
    extends: ParentLayout,
    components: {
        PageInfo,
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
