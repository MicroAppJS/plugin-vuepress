<template>
    <div :class="$style.root" v-if="visible">
        <div>
            <span>作者：</span>
            <span>{{ author }}；</span>
            <span>转载请保留</span>
        </div>
        <div>
            <span>版权声明：</span>
            <span>{{ copyrightText }}</span>
        </div>
        <div v-if="relativePath">
            <span>原文地址：</span>
            <a target="_blank" :href="relativePath">{{ decodeURIComponent(relativePath) }}</a>
        </div>
    </div>
</template>

<script>
const DEFAULT_TEXT = '自由转载-非商用-非衍生-保持署名';
export default {
    name: 'Copyright',
    props: [ 'info' ],
    computed: {
        visible() {
            if (!this.info) return false;
            if (this.$frontmatter.copyright === false) return false;
            return this.$blogConfig && !!this.$blogConfig.copyright;
        },
        copyrightText() {
            const copyright = this.$frontmatter.copyright || this.$blogConfig.copyright;
            if (!copyright || copyright === true) {
                return DEFAULT_TEXT;
            }
            if (typeof copyright === 'string' && copyright) {
                return copyright;
            }
            if (typeof copyright.text === 'string' && copyright) {
                return copyright.text;
            }
            return DEFAULT_TEXT;
        },
        author() {
            return this.$frontmatter.author || this.$i18nText('author') || this.$site.title;
        },
        siteUrl() {
            if (typeof window === 'object' && window && window.location) {
                return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            }
            return this.$themeConfig.siteUrl || this.$site.siteUrl;
        },
        relativePath() {
            if (!this.siteUrl) return false;
            const path = this.info.shortLink || this.info.path;
            return `${this.siteUrl}${decodeURIComponent(path)}`;
        },
    },
};
</script>

<style lang="stylus" module>
@require '~@default-theme/styles/wrapper.styl';

.root {
    @extend $wrapper;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 0 auto;
    padding-bottom: 0.2rem;
    font-size: 10px;
    color: rgba($textColor, 0.65);
    overflow: hidden;

    & > div {
        display: inline-block;
        background-color: rgba(#888, 0.05);
        margin: 1px 0;
        max-width: 90%;
        word-break: break-all;
    }

    a {
        opacity: 0.65;
    }
}

@media (max-width: $MQMobile) {
    .root {
        align-items: flex-start;
    }
}
</style>
