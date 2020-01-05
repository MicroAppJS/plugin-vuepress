<template>
    <Layout>
        <div :class="$style.root">
            <!-- 标签集合 -->
            <Categories :list="$categories.list" simple />

            <!-- 博客列表 -->
            <BlogPosts :posts="$postsForCategories" />
        </div>
    </Layout>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue';
import Categories from '@theme/components/Categories.vue';
import BlogPosts from '@theme/components/BlogPosts.vue';
export default {
    name: 'CategoriesLayout',
    components: {
        Layout,
        Categories,
        BlogPosts,
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
