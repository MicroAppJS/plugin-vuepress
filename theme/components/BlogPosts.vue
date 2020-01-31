<template>
    <div :class="$style.posts" ref="postsRef">
        <slot name="top"></slot>

        <div v-if="currentPosts && currentPosts.length === 0" :class="[$style.post, $style.empty]">
            <span>暂无数据</span>
        </div>

        <template v-else>
            <TransitionFadeSlide direction="x" group>
                <div v-for="(post, index) in currentPosts" :key="post.key" :class="$style.post">
                    <h2 :key="`title-${index}`" :class="$style.title">
                        <NavLink :item="post.path">{{ post.title }}</NavLink>
                    </h2>
                    <article :key="`summary-${index}`" :class="$style.summary">
                        <template v-if="post.frontmatter.summary">
                            <span>{{ post.frontmatter.summary || '' }}</span>
                        </template>
                        <!-- $page.excerpt -->
                        <template v-else-if="post.excerpt">
                            <div class="abstract" v-html="post.excerpt"></div>
                        </template>
                        <!-- <Content :post-key="post.key" slot-key="summary" /> -->
                    </article>
                    <PageInfo :key="`info-${index}`" :class="$style.info" :info="post" hideTitle />
                </div>
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
            opacity: 0.85;
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

    .empty {
        text-align: center;
        opacity: 0.75;
        padding: 3rem;
    }
}
</style>
