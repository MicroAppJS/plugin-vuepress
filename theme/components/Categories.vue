<template>
    <ul v-if="list" :class="$style.root">
        <li
            :class="[$style.item, { [$style.active]: item.name == currentCategory}]"
            :simple="simple"
            v-for="(item, index) in categories"
            :key="index"
        >
            <router-link :to="item.path">
                <span :class="$style.name">{{ item.name }}</span>
                <span
                    v-if="!simple"
                    :class="$style.num"
                    :style="customStyle(index, item.name == currentCategory)"
                >{{ item.pages.length }}</span>
            </router-link>
        </li>
    </ul>
</template>

<script>
import { filterPosts } from '@theme/helpers/postData.js';
import { getOneColor } from '@theme/helpers';
export default {
    props: {
        list: Array,
        simple: Boolean,
    },
    computed: {
        categories() {
            let categoriesPath = '/categories/';
            if (this.$blogConfig) {
                categoriesPath = this.$blogConfig.categoriesPath;
            }
            const pages = this.$posts || [];
            return [
                // { name: 'ALL', path: categoriesPath, pages },
                ...this.list.filter(item => {
                    const pages = filterPosts(item.pages || []);
                    return pages.length > 0;
                }),
            ];
        },
        currentCategory() {
            if (!this.$currentCategories) {
                return 'ALL';
            }
            return this.$currentCategories.key;
        },
    },
    methods: {
        customStyle(index, active) {
            if (this.simple && active) {
                return { color: getOneColor(index) };
            }
            return { backgroundColor: getOneColor(index) };
        },
    },
};
</script>

<style lang="stylus" module>
.root {
    position: relative;
    list-style: none;
    padding-left: 0;
    margin: 0;
    line-height: 1;

    .item {
        position: relative;
        box-sizing: border-box;
        margin: 0.4rem 0;
        transition: all 0.3s;
        border-radius: $borderRadius;
        box-shadow: $boxShadow;

        // background-color: $backgroundColor;
        &:hover {
            transform: translateY(-0.1rem);
        }

        a {
            display: flex;
            justify-content: space-between;
            padding: 0.6rem 0.8rem;
            align-items: center;
        }

        .num {
            min-width: 1.2rem;
            height: 1.2rem;
            text-align: center;
            line-height: 1.2rem;
            border-radius: $borderRadius;
            background-color: #eee;
            font-size: 0.6rem;
            color: $whiteColor;
            margin-left: 6px;
        }

        &[simple] {
            vertical-align: middle;
            display: inline-block;
            margin: 0.3rem;
            background: $backgroundColor;
            color: $textColor;
            border: solid 1px $borderColor;
            font-size: 13px;

            a {
                padding: 0.3rem 0.6rem;
            }

            &:hover {
                background: $accentColor;

                a {
                    color: $whiteColor;
                }
            }
        }

        &[simple].active {
            background-color: $accentColor;

            a {
                color: $whiteColor;
            }
        }
    }
}
</style>
