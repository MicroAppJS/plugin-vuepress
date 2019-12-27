<template>
    <footer :class="$style.footer">
        <span v-if="footer.powerby">
            <SvgIcon :class="$style.icon" name="zap"></SvgIcon>
            <NavLink :item="POWERBY_LINK" hideOutboundIcon>{{ POWERBY_NAME }}</NavLink>
        </span>
        <span v-if="beian">
            <SvgIcon :class="$style.icon" name="beian"></SvgIcon>
            <NavLink :item="beian" hideOutboundIcon></NavLink>
        </span>
        <span>
            <SvgIcon :class="$style.icon" name="copyright"></SvgIcon>
            <a v-if="footer.copyright">{{ footer.copyright }}</a>
            <a v-else-if="$themeConfig.author || $site.title">
                <span>{{ $themeConfig.author || $site.title }}</span>
            </a>
        </span>
    </footer>
</template>

<script>
import { BEIAN_LINK, POWERBY_LINK, POWERBY_NAME } from '@theme/config';
import NavLink from '@theme/components/NavLink.vue';
export default {
    components: { NavLink },
    data() {
        return {
            POWERBY_LINK,
            POWERBY_NAME,
        };
    },
    computed: {
        footer() {
            return this.$themeConfig.footer || {};
        },
        beian() {
            if (typeof this.footer.beian === 'string') {
                return {
                    text: this.footer.beian,
                    link: BEIAN_LINK,
                };
            }
            return this.footer.beian;
        },
    },
};
</script>

<style lang="stylus" module>
.footer {
    padding: 1.5rem 2.5rem;
    border-top: 1px solid $borderColor;
    text-align: center;
    color: lighten($textColor, 25%);
    font-size: 14px;

    > span {
        margin-left: 1rem;

        > i {
            margin-right: 0.5rem;
        }
    }

    .icon {
        color: #888;
    }
}

@media (max-width: $MQMobile) {
    .footer {
        text-align: left !important;

        > span {
            display: block;
            margin-left: 0;
            line-height: 2rem;
        }
    }
}
</style>
