<template>
    <Layout hideSidebar>
        <HeaderBoxInfo :current="$currentCategories" />
        <div :class="$style.wrapper">
            <slot name="top"></slot>
            <!-- 博客列表 -->
            <BlogWrapper :posts="$postsForCategories">
                <template slot="posts-top">
                    <!-- 标签集合 -->
                    <Categories v-if="$categories.length" :list="$categories.list" simple />
                </template>
            </BlogWrapper>
            <slot name="bottom"></slot>
        </div>
    </Layout>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue';
import Categories from '@theme/components/Categories.vue';
import BlogWrapper from '@theme/components/BlogWrapper.vue';
import HeaderBoxInfo from '@theme/components/HeaderBoxInfo.vue';
export default {
    name: 'CategoriesLayout',
    components: {
        Layout,
        Categories,
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
