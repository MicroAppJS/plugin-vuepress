<template>
    <div :class="$style.root">
        <router-link v-for="(item, index) in tags" :key="index" :to="item.path">
            <span
                :simple="simple"
                :class="{ [$style.active]: item.name == currentTag}"
                :style="customStyle(index)"
            >{{item.name}}</span>
        </router-link>
    </div>
</template>

<script>
import { getOneColor } from '@theme/helpers';
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
                ...this.list,
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
            return { backgroundColor: getOneColor(index) };
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
        background: #fff;
        color: #fff;
        line-height: 13px;
        font-size: 13px;
        box-shadow: $boxShadow;
        transition: all 0.3s;

        &:hover {
            transform: translateY(-0.1rem);
        }

        &[simple] {
            background: darken($accentColor, 60%) !important;
        }

        &[simple].active {
            background: $accentColor !important;
        }
    }
}
</style>
