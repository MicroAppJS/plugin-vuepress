<template>
    <Home>
        <BlogWrapper v-if="data.showPosts === true" />
        <template v-else>
            <div>
                <!-- 最新文章 -->
                <PostCardBlocks :title="['最新', '博文']" :subtitle="['LATEST', 'POST']" :max="9"/>
            </div>
            <div v-if="$categories && $categories.list && $categories.list.length">
                <!-- 热门分类 -->
                <CategoriesCardBlocks
                    :title="['热门', '分类']"
                    :subtitle="['POPULAR', 'CATEGORIES']"
                    :posts="hotCategories"
                />
            </div>
            <div>
                <!-- 关于我 -->
                <AboutMe :title="['关于', '我']" :subtitle="['ABOUT', 'ME']" />
            </div>
        </template>
    </Home>
</template>

<script>
import Home from '@theme/components/Home.vue';
import Header from '@theme/components/Header.vue';
import BlogWrapper from '@theme/components/BlogWrapper.vue';
import PostCardBlocks from '@theme/components/PostCardBlocks.vue';
import CategoriesCardBlocks from '@theme/components/CategoriesCardBlocks.vue';
import AboutMe from '@theme/components/AboutMe.vue';
export default {
    name: 'HomeBlog',
    components: {
        Home, Header, BlogWrapper, PostCardBlocks, CategoriesCardBlocks, AboutMe,
    },
    computed: {
        data() {
            return this.$page.frontmatter;
        },
        hotCategories() {
            return this.$categories.list.map(item => {
                const obj = Object.assign({}, item);
                obj.title = item.name;
                obj.size = item.pages ? item.pages.length : 0;
                obj.frontmatter = {

                };
                return obj;
            }).sort((a, b) => {
                return b.size - a.size;
            });
        },
    },
};
</script>
