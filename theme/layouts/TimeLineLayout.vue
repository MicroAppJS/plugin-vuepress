<template>
    <Layout hideSidebar>
        <HeaderBoxInfo :current="$currentCategories" />
        <div :class="$style.root">
            <!-- 年份列表 -->
            <ul :class="$style.wrapper">
                <li :class="$style.desc">
                    <h3 :class="$style.year">{{ title }}</h3>
                </li>
                <li v-for="(item, i) in $postsForTimeline" :key="i" :class="$style.item">
                    <h3 :class="$style.year" :id="item.year">
                        <a :href="`#${item.year}`">{{ item.year }}</a>
                    </h3>
                    <ul :class="$style.yearWrapper">
                        <TransitionFadeSlide
                            :delay="index * 0.25"
                            tag="li"
                            direction="x"
                            v-for="(data, index) in item.data"
                            :key="data.key"
                            :class="$style.subItem"
                        >
                            <router-link :class="$style.subItemWrapper" :to="data.path">
                                <span :class="$style.date">{{ data.date | dateFormat }}</span>
                                <span :class="$style.title">{{ data.title }}</span>
                            </router-link>
                        </TransitionFadeSlide>
                    </ul>
                </li>
            </ul>
            <!-- {{ $postsForTimeline.length }} -->
        </div>
    </Layout>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue';
import TransitionFadeSlide from '@theme/components/TransitionFadeSlide.vue';
import HeaderBoxInfo from '@theme/components/HeaderBoxInfo.vue';
function padZero(num) {
    if (String(num).length < 2) {
        return `0${num}`;
    }
    return String(num);
}
export default {
    name: 'TimeLineLayout',
    components: {
        Layout,
        TransitionFadeSlide,
        HeaderBoxInfo,
    },
    filters: {
        dateFormat(date) {
            const dateObj = new Date(date);
            const mon = dateObj.getMonth() + 1;
            const day = dateObj.getDate();
            return `${padZero(mon)}-${padZero(day)}`;
        },
    },
    computed: {
        title() {
            return this.$blogConfig.timelineTitle;
        },
    },
};
</script>
<style lang="stylus" module>
.root {
    margin: 0px auto;
    display: block;
    width: 100%;
}

.desc {
    .year {
        &:before {
            background: $accentColor;
            animation: sharking 3s ease-in-out infinite alternate;
        }
    }
}

@keyframes sharking {
    from {
        background: $backgroundColor;
    }

    to {
        background: $accentColor;
    }
}

.wrapper {
    position: relative;
    box-sizing: border-box;
    max-width: 740px;
    margin: 2.2rem auto 4rem;
    list-style: none;
    padding: 0 0 0 1.2rem;
    margin-top: -0.9rem;

    &:after {
        content: ' ';
        position: absolute;
        top: 14px;
        left: 0;
        margin-left: -2px;
        width: 4px;
        height: 100%;
        background: $borderColor;
    }
}

.year {
    position: relative;
    color: $textColor;
    font-size: 26px;
    font-weight: 700;
    padding-top: 4rem;
    margin-bottom: 0;
    margin-top: 0;

    &:before {
        content: ' ';
        position: absolute;
        z-index: 1;
        left: -20px;
        top: 80%;
        margin-left: -4px;
        margin-top: -4px;
        width: 8px;
        height: 8px;
        background: $backgroundColor;
        border: 1px solid $borderColor;
        border-radius: 50%;
    }
}

.yearWrapper {
    list-style: none;
    padding: 0;

    .subItemWrapper {
        position: relative;
        padding: 30px 0 10px;
        display: flex;
        border-bottom: 1px dashed $borderColor;
        transition: all 0.3s;
        cursor: pointer;

        .date {
            width: 40px;
            line-height: 30px;
            color: rgba($textColor, 0.85);
            font-size: 12px;
            transition: all 0.3s;
            flex: 0 0 40px;

            &:before {
                content: ' ';
                position: absolute;
                left: -19px;
                top: 41px;
                width: 6px;
                height: 6px;
                margin-left: -4px;
                background: $backgroundColor;
                border-radius: 50%;
                border: 1px solid $borderColor;
                z-index: 1;
                transition: all 0.3s;
            }
        }

        .title {
            line-height: 30px;
            color: rgba($textColor, 0.85);
            font-size: 16px;
            transition: all 0.3s;
            margin-left: 10px;
        }

        &:hover {
            border-bottom: 1px dashed $accentColor;

            .date {
                color: $accentColor;

                &::before {
                    background: $accentColor;
                }
            }

            .title {
                color: $accentColor;
            }
        }
    }
}

@media (max-width: $MQMobile) {
    .wrapper {
        margin: 0 1.2rem;
    }
}
</style>
