<template>
    <div :class="$style.posts" ref="postsRef">
        <slot name="top"></slot>

        <div v-if="currentPosts && currentPosts.length === 0" :class="[$style.post, $style.empty]">
            <span>暂无数据</span>
        </div>

        <template v-else>
            <TransitionFadeSlide direction="x" group>
                <PostInfo
                    v-for="(post, index) in currentPosts"
                    :key="`${post.key}_${index}`"
                    :post="post"
                ></PostInfo>
            </TransitionFadeSlide>
        </template>

        <!-- 分页 -->
        <div :class="$style.pagation">
            <Pagination
                :total="posts.length"
                :limit="limit"
                :currentPage="currentPage"
                @select="handleSelectPage"
            />
        </div>

        <slot name="bottom"></slot>
    </div>
</template>

<script>
import PostInfo from '@theme/components/PostInfo.vue';
import Pagination from '@theme/components/Pagination.vue';
import TransitionFadeSlide from '@theme/components/TransitionFadeSlide.vue';
export default {
    name: 'BlogPosts',
    components: {
        PostInfo,
        Pagination,
        TransitionFadeSlide,
    },
    props: {
        posts: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            currentPage: 1,
        };
    },
    watch: {
        // url 变化时， currentPage 值为 1
        '$route.path': function(nV, oV) {
            if (nV !== oV) {
                this.currentPage = 1;
            }
        },
    },
    computed: {
        limit() {
            return this.$blogConfig.pageSize || 10;
        },
        currentPosts() {
            const limit = this.limit;
            const start = (this.currentPage - 1) * limit;
            const end = start + limit;
            const posts = [].concat(this.posts);
            return posts.slice(start, end);
        },
        _pagination() {
            const regs = /\/page\/(\w?)\/?/i.exec(this.$route.path);
            if (regs) {
                return regs[1] && parseInt(regs[1]);
            }
            return 1;
        },
    },
    methods: {
        handleSelectPage(page) {
            this.currentPage = page;
            this.scrollToTop();
        },
        scrollToTop() {
            let top = 0;
            if (this.$refs.postsRef) {
                top = this.$refs.postsRef.offsetTop - 100;
            }
            window.scrollTo && window.scrollTo({ top, behavior: 'smooth' });
        },
    },
    created() {
        this.currentPage = this._pagination;
    },
};
</script>

<style lang="stylus" module>
.posts {
    position: relative;

    .pagation {
        position: relative;
        text-align: center;
    }

    .empty {
        text-align: center;
        opacity: 0.75;
        padding: 3rem;
    }
}
</style>
