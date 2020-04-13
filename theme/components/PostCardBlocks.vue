<template>
    <!-- 相关内容 -->
    <section :class="$style.root">
        <div :class="$style.container">
            <div :class="$style.title">
                <h3 :class="$style.sub">
                    <span v-for="(item, index) in subtitle" :key="index">{{ item }}</span>
                </h3>
                <h2 :class="$style.main">
                    <span v-for="(item, index) in title" :key="index">{{ item }}</span>
                </h2>
            </div>
            <hr :class="$style.line" />
            <TransitionFadeSlide>
                <div :class="$style.cardsGroup">
                    <slot name="body">
                        <ul :class="$style.cards">
                            <li
                                :class="$style.cardItem"
                                v-for="(post, index) in _posts"
                                :key="`${post.key}_${index}`"
                            >
                                <div :class="$style.card">
                                    <slot :item="post">
                                        <PostInfo :post="post" simple></PostInfo>
                                    </slot>
                                </div>
                            </li>
                        </ul>
                    </slot>
                </div>
            </TransitionFadeSlide>
        </div>
    </section>
</template>

<script>
import PostInfo from '@theme/components/PostInfo.vue';
import TransitionFadeSlide from '@theme/components/TransitionFadeSlide.vue';
export default {
    name: 'PostCardBlocks',
    components: {
        PostInfo,
        TransitionFadeSlide,
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
            default: 6,
        },
    },
    computed: {
        _posts() {
            return [].concat(this.posts || this.$posts).slice(0, this.max);
        },
    },
};
</script>

<style lang="stylus" module>
.root {
    position: relative;
    box-sizing: border-box;
    padding: 6rem 0;
    text-align: center;

    &:after {
        clear: both;
    }
}

.container {
    position: relative;
    box-sizing: border-box;
    max-width: $maxWidth;
    margin: auto;
    padding: 0 3rem;

    @media (max-width: $MQNarrow) {
        padding: 0;
    }
}

.title {
    .sub {
        letter-spacing: 0.2rem;
        font-size: 0.24rem;
        opacity: 0.65;

        &>span:first-child {
            margin-right: 0.6rem;
        }
    }

    .main {
        letter-spacing: 0.3rem;
        margin: 0.6rem 0 1rem;
        border: none;

        &>span:first-child {
            color: $whiteColor;
            background: $accentColor;
            padding: 0 0.3rem 0 0.6rem;
            margin-right: 0.3rem;
        }
    }
}

.line {
    display: block;
    margin: auto;
    height: 1px;
    width: 3rem;
    background: $accentColor;
    opacity: 0.65;
    text-align: center;
    position: relative;
    border: none;
}

.cardsGroup {
    position: relative;
    box-sizing: border-box;
    padding-top: 2rem;

    .cards {
        list-style: none;
        position: relative;
        padding: 0;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        // column-count: 3;
        .cardItem {
            position: relative;
            box-sizing: border-box;
            padding: 0.6rem;
            text-align: left;
            width: 33%;
            flex: 0 0 33%;
            // break-inside: avoid;
            overflow: hidden;
        }

        .card {
            position: relative;
            transition: all 0.3s;

            &:hover {
                transform: translateY(-0.2rem);
            }
        }

        @media (max-width: $MQNarrow) {
            // column-count: 1;
            .cardItem {
                width: 100%;
                flex: 0 0 100%;
            }
        }
    }
}
</style>
