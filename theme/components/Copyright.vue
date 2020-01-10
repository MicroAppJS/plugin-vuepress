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
            <a target="_blank" :href="relativePath">{{ relativePath }}</a>
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
            if (this.$blogConfig.copyright === true) {
                return DEFAULT_TEXT;
            }
            return this.$blogConfig.copyright || DEFAULT_TEXT;
        },
        author() {
            return this.$frontmatter.author || this.$i18nText('author') || this.$site.title;
        },
        siteUrl() {
            return this.$blogConfig.siteUrl || this.$themeConfig.siteUrl || this.$site.siteUrl;
        },
        relativePath() {
            if (!this.siteUrl) return false;
            return `${this.siteUrl}${decodeURIComponent(this.info.path)}`;
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
    max-width: 740px;
    margin: 0 auto;
    padding-bottom: 0.2rem;
    font-size: 10px;
    color: rgba($textColor, 0.8);

    & > div {
        display: inline-block;
        background-color: rgba(#888, 0.05);
        margin: 1px 0;
    }

    a {
        opacity: 0.75;
    }
}

@media (max-width: $MQMobile) {
    .root {
        align-items: flex-start;
    }
}
</style>
