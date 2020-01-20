<template>
    <Home>
        <BlogWrapper v-if="data.hiddenPosts !== true" />
    </Home>
</template>

<script>
import Home from '@theme/components/Home.vue';
import Header from '@theme/components/Header.vue';
import BlogWrapper from '@theme/components/BlogWrapper.vue';
export default {
    name: 'HomeBlog',
    components: {
        Home, Header, BlogWrapper,
    },
    computed: {
        data() {
            return this.$page.frontmatter;
        },
    },
};
</script>
