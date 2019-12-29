<template>
    <div :class="$style.root" v-if="list">
        <Popup v-for="(item, index) in list" :key="index">
            <span :class="$style.item">
                <span :class="$style.dot" :style="{ 'backgroundColor': item.color }"></span>
                {{item.title}}
            </span>
            <div slot="content">
                <div :class="$style.card">
                    <div :class="$style.logo">
                        <img :src="getLogoUrl(item)" />
                    </div>
                    <div :class="$style.info">
                        <div :class="$style.title">
                            <h4>{{ item.title }}</h4>
                            <NavLink
                                v-if="item.link"
                                :class="$style.btnGo"
                                :style="{ 'backgroundColor': item.color }"
                                :item="item.link"
                                hideOutboundIcon
                            >GO</NavLink>
                        </div>
                        <p :class="$style.desc" v-if="item.description">{{ item.description }}</p>
                    </div>
                </div>
            </div>
        </Popup>
    </div>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue';
import Popup from '@theme/components/Popup.vue';
export default {
    name: 'FriendLinks',
    components: {
        NavLink, Popup,
    },
    props: {
        list: Array,
    },
    methods: {
        getLogoUrl(info) {
            const { logo } = info;
            if (logo && /^http/.test(logo)) return logo;
            return this.$withBase(logo);
        },
    },
};
</script>

<style lang="stylus" module>
.root {
}

.item {
    position: relative;
    vertical-align: middle;
    margin: 4px 4px 10px;
    padding: 4px 8px;
    line-height: 20px;
    display: inline-block;
    cursor: pointer;
    border-radius: $borderRadius;
    font-size: 13px;
    box-shadow: $boxShadow;
    transition: all 0.3s;
}

.dot {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 0.1rem;
    background: $accentColor;
    vertical-align: middle;
}

.card {
    display: flex;
    background: $backgroundColor;
    box-shadow: $boxShadow;
    border-radius: $borderRadius;
    box-sizing: border-box;
    padding: 0.8rem 1rem;
    width: 300px;
    font-size: 14px;

    .logo {
        margin-right: 0.6rem;
        width: 2rem;
        height: 2rem;
        flex: 0 0 2rem;
        border-radius: $borderRadius;
        overflow: hidden;

        img {
            width: 2rem;
            height: 2rem;
        }
    }

    .info {
        flex: 1 1 auto;
    }

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 2rem;

        h4 {
            margin: 0.2rem 0;
            flex: 0 0 86%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .btnGo {
            width: 1.4rem;
            height: 1.2rem;
            border-radius: $borderRadius;
            font-size: 0.1rem;
            color: #ffffff;
            text-align: center;
            line-height: 1.2rem;
            cursor: pointer;
            transition: all 0.5s;
            background: $accentColor;

            &:hover {
                transform: scale(1.1);
            }
        }
    }

    .desc {
    }
}
</style>
