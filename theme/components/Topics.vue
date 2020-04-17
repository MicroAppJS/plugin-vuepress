<template>
    <!-- 相关内容 -->
    <div :class="$style.root" class="sidebar-links">
        <div :class="$style.group" class="sidebar-group">
            <p :class="$style.title" class="sidebar-heading">
                <span>相关推荐</span>
            </p>
            <ul class="sidebar-links sidebar-group-items">
                <li v-for="(post, index) in _posts" :key="index">
                    <!-- <a href class="sidebar-link">{{ post.title }}</a> -->
                    <NavLink class="sidebar-link" :item="post.path">{{ post.title }}</NavLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue';
export default {
    name: 'Topics',
    components: {
        NavLink,
    },
    props: {
        max: {
            type: Number,
            default: 5,
        },
        posts: Array,
    },
    computed: {
        _currentTags() {
            const data = this.data || {};
            return data.tags || [];
        },
        _currentCategories() {
            const data = this.data || {};
            return data.categories || [];
        },
        _posts() {
            const pages = [];
            // tags
            const $tags = (this.$tags || {}).map;
            if ($tags) {
                this._currentTags.forEach(key => {
                    const tag = $tags[key];
                    if (tag) {
                        pages.push(...tag.pages);
                    }
                });
            }
            // categories
            const $categories = (this.$categories || {}).map;
            if ($categories) {
                this._currentCategories.forEach(key => {
                    const categories = $categories[key];
                    if (categories) {
                        pages.push(...categories.pages);
                    }
                });
            }
            const $page = this.$page || {};
            const hasKeys = {};
            return pages.concat(this.posts || this.$posts).filter(item => {
                if (hasKeys[item.key]) {
                    return false;
                }
                hasKeys[item.key] = true;

                if (item.key === $page.key) {
                    return false;
                }
                return true;
            }).slice(0, this.max);
        },
        data() {
            return this.$page.frontmatter;
        },
    },
};
</script>

<style lang="stylus" module>
.root {
    box-sizing: border-box;
    position: relative;

    &:after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 1.25rem;
        right: 1.5rem;
        background: $borderColor;
        border-bottom: solid 1px $borderColor;
    }
}

.group {
}
</style>
