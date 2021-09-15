<template>
    <!-- 相关内容 -->
    <PostCardBlocks :title="title" :subtitle="subtitle" :posts="posts" :max="max">
        <template slot-scope="{ item }">
            <div :class="$style.cardItem">
                <div :class="$style.warpper">
                    <div :class="$style.process" :style="customStyle(item)"></div>
                </div>
                <div :class="$style.cardWarpper">
                    <h2 :class="$style.title">
                        <NavLink :item="item.path" line>{{ item.title }}</NavLink>
                    </h2>
                    <div :class="$style.right">{{ item.size }}</div>
                    <!-- <div :class="$style.right">{{ item.size }} / {{ allCount }}</div> -->
                </div>
            </div>
        </template>
    </PostCardBlocks>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue';
import PostCardBlocks from '@theme/components/PostCardBlocks.vue';
export default {
    name: 'CategoriesCardBlocks',
    components: {
        NavLink,
        PostCardBlocks,
    },
    props: {
        title: {
            type: Array,
            default() { return []; },
        },
        subtitle: {
            type: Array,
            default() { return []; },
        },
        posts: Array,
        max: {
            type: Number,
            default: 12,
        },
    },
    computed: {
        allCount() {
            if (!this.$posts) return 0;
            return this.$posts.length;
        },
    },
    methods: {
        customStyle(item) {
            return { width: (item.size / this.allCount * 100) + '%' };
        },
    },
};
</script>

<style lang="stylus" module>
.cardItem {
    position: relative;
    box-sizing: border-box;
    box-shadow: $boxShadow;
    overflow: hidden;
    height: 54px;
    font-size: 1.2rem;
    border-radius: $borderRadius;
}

.cardWarpper {
    padding: 10px 20px;

    .title {
        position: relative;
        font-size: 1.2rem;
        line-height: 36px;
        border: none;
        display: inline-block;
        max-width: 100%;
        margin: auto;
    }

    .right {
        position: absolute;
        right: 20px;
        top: 10px;
        color: $whiteColor;
        font-weight: bold;
    }
}

.warpper {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;

    .process {
        height: 100%;
        background: $accentColor;
        border: none;
        float: right;
        position: relative;
        min-width: 15%;
        max-width: 60%;

        &:before {
            content: '';
            transform: translateX(-100%) rotate(45deg);
            background: $accentColor;
            height: 300%;
            left: 15px;
            top: -50%;
            position: absolute;
            width: 60px;
        }
    }
}
</style>
