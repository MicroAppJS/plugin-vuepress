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
                <span :class="$style.num" :style="customStyle(index)">{{ item.pages.length }}</span>
            </router-link>
        </li>
    </ul>
</template>

<script>
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
                { name: 'ALL', path: categoriesPath, pages },
                ...this.list,
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
        customStyle(index) {
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

    .item {
        position: relative;
        box-sizing: border-box;
        margin: 0.4rem 0;
        transition: all 0.3s;
        border-radius: $borderRadius;
        box-shadow: $boxShadow;
        background-color: $backgroundColor;

        &[simple] {
            display: inline-block;
            margin-right: 0.4rem;
        }

        &[simple].active {
            color: #fff;
            background-color: lighten($accentColor, 20%);

            .name {
                color: #fff;
            }
        }

        &:hover {
            transform: translateY(-0.1rem);
        }

        a {
            display: flex;
            justify-content: space-between;
            padding: 0.4rem 0.8rem;

            .name {
                margin-right: 6px;
            }

            .num {
                width: 1.6rem;
                height: 1.6rem;
                text-align: center;
                line-height: 1.6rem;
                border-radius: $borderRadius;
                background: #eee;
                font-size: 0.6rem;
                color: #fff;
            }
        }
    }
}
</style>
