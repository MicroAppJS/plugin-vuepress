<template>
    <footer :class="$style.footer">
        <span v-if="footer.powerby" :class="$style.item">
            <SvgIcon :class="$style.icon" name="zap"></SvgIcon>
            <NavLink :item="POWERBY_LINK" hideOutboundIcon>{{ POWERBY_NAME }}</NavLink>
        </span>
        <span v-if="beian" :class="$style.item">
            <SvgIcon :class="$style.icon" name="beian"></SvgIcon>
            <NavLink :item="beian" hideOutboundIcon></NavLink>
        </span>
        <span v-if="copyright" :class="$style.item">
            <SvgIcon :class="$style.icon" name="copyright"></SvgIcon>
            <a>{{ copyright }}</a>
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
            const _footer = this.$i18nText('footer') || {};
            return Object.assign({ // 默认值
                powerby: true,
                copyright: true,
            }, _footer);
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
        copyright() {
            const cr = this.footer.copyright;
            if (typeof cr === 'string') {
                return cr;
            }
            if (cr === true) {
                return this.$i18nText('copyright') || false;
            }
            return false;
        },
    },
    mounted() {
        this.$scrollReveal(`.${this.$style.item}`, { delay: 300, interval: 100 });
    },
};
</script>

<style lang="stylus" module>
.footer {
    padding: 1.5rem;
    border-top: 1px solid $borderColor;
    text-align: center;
    color: lighten($textColor, 25%);
    font-size: 12px;

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

.item {
    position: relative;
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
