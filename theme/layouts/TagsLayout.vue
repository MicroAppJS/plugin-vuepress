<template>
    <Layout>
        <div :class="$style.root">
            <!-- 标签集合 -->
            <TagList :list="$tags.list" simple />

            <!-- 博客列表 -->
            <BlogPosts :posts="$tagPosts" />
        </div>
    </Layout>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue';
import TagList from '@theme/components/TagList.vue';
import BlogPosts from '@theme/components/BlogPosts.vue';
export default {
    name: 'Tags',
    components: {
        Layout,
        TagList,
        BlogPosts,
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
