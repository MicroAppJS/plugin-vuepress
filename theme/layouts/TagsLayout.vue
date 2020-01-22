<template>
    <Layout hideSidebar>
        <HeaderBoxInfo :current="$currentTags" />
        <div :class="$style.wrapper">
            <slot name="top"></slot>
            <!-- 博客列表 -->
            <BlogWrapper :posts="$postsForTags">
                <template slot="posts-top">
                    <!-- 标签集合 -->
                    <TagList v-if="$tags.length" :list="$tags.list" simple />
                </template>
            </BlogWrapper>
            <slot name="bottom"></slot>
        </div>
    </Layout>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue';
import TagList from '@theme/components/TagList.vue';
import BlogWrapper from '@theme/components/BlogWrapper.vue';
import HeaderBoxInfo from '@theme/components/HeaderBoxInfo.vue';
export default {
    name: 'TagsLayout',
    components: {
        Layout,
        TagList,
        BlogWrapper,
        HeaderBoxInfo,
    },
};
</script>
<style lang="stylus" module>
.wrapper {
    position: relative;
    display: block;
    margin: 0px auto;
    width: 100%;
}
</style>
