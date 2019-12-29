<template>
    <Home>
        <span v-if="data.banner" slot="mask" :class="$style.mask" :style="maskStyle"></span>
        <div :class="$style.root">
            <div :class="$style.blogWrapper">
                <div :class="$style.blogList">
                    <!-- 博客列表 -->
                    <BlogPosts :posts="$posts" />
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
    </Home>
</template>

<script>
import { getOneColor } from '@theme/helpers';
import Home from '@theme/components/Home.vue';
import BlogPosts from '@theme/components/BlogPosts.vue';
import PersonalInfo from '@theme/components/PersonalInfo.vue';
import Categories from '@theme/components/Categories.vue';
import TagList from '@theme/components/TagList.vue';
import FriendLinks from '@theme/components/FriendLinks.vue';
export default {
    name: 'HomeBlog',
    components: {
        Home, BlogPosts, PersonalInfo, Categories, TagList, FriendLinks,
    },
    computed: {
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
    methods: {
        getOneColor,
    },
};
</script>

<style lang="stylus" module>
.mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    background: center center / cover no-repeat;
    z-index: -1;

    &:after {
        display: block;
        content: ' ';
        background: #888;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 0;
        opacity: 0.2;
    }
}

.root {
    margin: 10px;
}

.blogWrapper {
    display: flex;
    align-items: flex-start;
    margin: 20px auto 0;
    max-width: 1126px;

    .blogList {
        flex: auto;
        width: 0;
    }

    .infoWrapper {
        position: sticky;
        top: 70px;
        transition: all 0.3s;
        margin-left: 15px;
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
