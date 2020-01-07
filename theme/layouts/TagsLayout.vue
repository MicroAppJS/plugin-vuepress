<template>
    <Layout hideSidebar>
        <div :class="$style.root">
            <!-- 博客列表 -->
            <BlogWrapper :posts="$postsForTags">
                <template slot="posts-top">
                    <!-- 标签集合 -->
                    <TagList :list="$tags.list" simple />
                </template>
            </BlogWrapper>
        </div>
    </Layout>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue';
import TagList from '@theme/components/TagList.vue';
import BlogWrapper from '@theme/components/BlogWrapper.vue';
export default {
    name: 'TagsLayout',
    components: {
        Layout,
        TagList,
        BlogWrapper,
    },
    computed: {
    },
};
</script>
<style lang="stylus" module>
.root {
    padding: $navbarHeight 10px 0;
    margin: 0px auto;
    display: block;
    max-width: 1126px;
}
</style>
