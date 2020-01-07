<template>
    <Layout hideSidebar>
        <div :class="$style.root">
            <!-- 博客列表 -->
            <BlogWrapper :posts="$postsForCategories">
                <template slot="posts-top">
                    <!-- 标签集合 -->
                    <Categories :list="$categories.list" simple />
                </template>
            </BlogWrapper>
        </div>
    </Layout>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue';
import Categories from '@theme/components/Categories.vue';
import BlogWrapper from '@theme/components/BlogWrapper.vue';
export default {
    name: 'CategoriesLayout',
    components: {
        Layout,
        Categories,
        BlogWrapper,
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
