<template>
    <div :class="$style.posts" ref="postsRef">
        <slot name="top"></slot>

        <TransitionFadeSlide direction="x" group>
            <div v-for="(post, index) in currentPosts" :key="post.key" :class="$style.post">
                <h2 :key="`title-${index}`" :class="$style.title">
                    <NavLink :item="post.path">{{ post.title }}</NavLink>
                </h2>
                <article :key="`summary-${index}`" :class="$style.summary">
                    {{ post.frontmatter.summary || '' }}
                    <!-- <Content :post-key="post.key" slot-key="summary" /> -->
                </article>
                <PageInfo :key="`info-${index}`" :class="$style.info" :info="post" hideTitle />
            </div>
        </TransitionFadeSlide>

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
import NavLink from '@theme/components/NavLink.vue';
import PageInfo from '@theme/components/PageInfo.vue';
import Pagination from '@theme/components/Pagination.vue';
import TransitionFadeSlide from '@theme/components/TransitionFadeSlide.vue';
export default {
    name: 'BlogPosts',
    components: {
        NavLink,
        PageInfo,
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
};
</script>

<style lang="stylus" module>
.posts {
    position: relative;

    .post {
        position: relative;
        padding: 10px 20px;
        margin: 20px 0;
        box-shadow: $boxShadow;
        transition: all 0.3s;
        border-radius: $borderRadius;

        &:hover {
            box-shadow: $boxShadowHover;
        }

        &:first-child {
            margin-top: 0;
        }

        .title {
            position: relative;
            font-size: 1.28rem;
            line-height: 36px;
        }

        .summary {
            word-break: break-all;
        }

        .info {
            padding: 0;
            margin: 20px 0;
        }
    }

    .pagation {
        position: relative;
        text-align: center;
    }
}
</style>
