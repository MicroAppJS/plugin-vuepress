<template>
    <div :class="$style.root">
        <div :class="$style.blogWrapper">
            <div :class="$style.blogList">
                <!-- 博客列表 -->
                <BlogPosts :posts="_posts">
                    <div slot="top" v-if="$slots['posts-top']" :class="$style.postsTop">
                        <slot name="posts-top"></slot>
                    </div>
                </BlogPosts>
            </div>

            <div :class="$style.infoWrapper">
                <PersonalInfo></PersonalInfo>
                <template v-if="$categories && $categories.length">
                    <hr />
                    <h4>
                        <SvgIcon name="category" :class="$style.icon" />分类
                    </h4>
                    <Categories :list="$categories.list" />
                </template>
                <template v-if="$tags && $tags.length">
                    <hr />
                    <h4>
                        <SvgIcon name="tags" :class="$style.icon" />标签
                    </h4>
                    <TagList :list="$tags.list" />
                </template>
                <template v-if="friendLinks && friendLinks.length">
                    <hr />
                    <h4>
                        <SvgIcon name="friend" :class="$style.icon" />友链
                    </h4>
                    <FriendLinks :list="friendLinks" />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import BlogPosts from '@theme/components/BlogPosts.vue';
import PersonalInfo from '@theme/components/PersonalInfo.vue';
import Categories from '@theme/components/Categories.vue';
import TagList from '@theme/components/TagList.vue';
import FriendLinks from '@theme/components/FriendLinks.vue';
export default {
    name: 'BlogWrapper',
    components: {
        BlogPosts, PersonalInfo, Categories, TagList, FriendLinks,
    },
    props: {
        posts: Array,
    },
    computed: {
        _posts() {
            return this.posts || this.$posts;
        },
        data() {
            return this.$page.frontmatter;
        },
        maskStyle() {
            const style = {};
            if (this.data.banner) {
                style.backgroundImage = `url(${this.$withBase(this.data.banner)})`;
            }
            return style;
        },
        friendLinks() {
            return this.$themeConfig.friendLinks;
        },
    },
};
</script>

<style lang="stylus" module>
.root {
    margin: 10px 0;
}

.postsTop {
    position: relative;
    padding: 10px 20px;
    margin: 0 0 20px 0;
    box-shadow: $boxShadow;
    transition: all 0.3s;
    border-radius: $borderRadius;
    border-left: 0.3rem solid $accentColor;

    &:hover {
        box-shadow: $boxShadowHover;
    }
}

.blogWrapper {
    display: flex;
    align-items: flex-start;
    margin: 20px auto 0;
    max-width: $maxWidth;
    padding: 0 20px;

    .blogList {
        flex: auto;
        width: 0;
    }

    .infoWrapper {
        position: sticky;
        top: 70px;
        transition: all 0.3s;
        margin-left: 20px;
        margin-bottom: 20px;
        flex: 0 0 300px;
        height: auto;
        box-shadow: $boxShadow;
        border-radius: $borderRadius;
        box-sizing: border-box;
        padding: 20px;
        min-height: 100px;

        &:hover {
            box-shadow: $boxShadowHover;
        }

        hr {
            margin: 2rem 0;
        }
    }
}

.icon {
    color: #999;
    margin-right: 0.4rem;
}

@media (max-width: $MQMobile) {
    .infoWrapper {
        display: none;
    }
}
</style>
