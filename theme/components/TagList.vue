<template>
    <div :class="$style.root">
        <router-link
            v-for="(item, index) in tags"
            :key="index"
            :to="item.path"
            :class="$style.item"
        >
            <span
                :simple="simple"
                :class="{ [$style.active]: item.name == currentTag}"
                :style="customStyle(index)"
            >{{item.name}}</span>
        </router-link>
    </div>
</template>

<script>
import { filterPosts } from '@theme/helpers/postData.js';
export default {
    props: {
        simple: Boolean,
        list: Array,
    },
    computed: {
        tags() {
            let tagsPath = '/tags/';
            if (this.$blogConfig) {
                tagsPath = this.$blogConfig.tagsPath;
            }
            return [
                { name: 'ALL', path: tagsPath },
                ...this.list.filter(item => {
                    const pages = filterPosts(item.pages || []);
                    return pages.length > 0;
                }),
            ];
        },
        currentTag() {
            if (!this.$currentTags) {
                return 'ALL';
            }
            return this.$currentTags.key;
        },
    },
    methods: {
        customStyle(index) {
            if (this.simple) {
                return {};
            }
            return { };
        },
    },
};
</script>

<style lang="stylus" module>
.root {
    position: relative;

    span {
        vertical-align: middle;
        margin: 0.3rem;
        padding: 0.3rem 0.6rem;
        display: inline-block;
        cursor: pointer;
        border-radius: $borderRadius;
        background: $backgroundColor;
        color: $textColor;
        border: solid 1px $borderColor;
        line-height: 13px;
        font-size: 13px;
        box-shadow: $boxShadow;
        transition: all 0.3s;

        &:hover {
            transform: translateY(-0.1rem);
            background: $accentColor;
            color: $whiteColor;
        }

        &[simple] {
        }

        &[simple].active {
            background: $accentColor !important;
            color: $whiteColor;
        }
    }
}

.item {
    position: relative;
}
</style>

