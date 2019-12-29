import OutboundLink from '@theme/components/OutboundLink';
import { filterPosts } from '@theme/helpers/postData.js';

export default ({
    Vue,
}) => {
    Vue.mixin({
        computed: {
            $type() {
                return this.$themeConfig.type || 'doc';
            },
            $posts() {
                const pages = this.$site.pages || [];
                return filterPosts(pages);
            },
            $tagPosts() {
                if (this.$currentTags) {
                    const pages = this.$currentTags.pages || [];
                    return filterPosts(pages);
                }
                return this.$posts;
            },
            $categoriePosts() {
                if (this.$currentCategories) {
                    const pages = this.$currentCategories.pages || [];
                    return filterPosts(pages);
                }
                return this.$posts;
            },
            $blogConfig() {
                return this.$themeConfig.blogConfig || {};
            },
        },
        methods: {
            $i18nText(key, value) {
                return this.$themeLocaleConfig[key]
                || this.$themeConfig[key]
                || value;
            },
        },
    });
    // 覆盖原逻辑
    Vue.component('OutboundLink', OutboundLink);
};
