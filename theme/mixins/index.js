import { filterPosts, sortPostsByDate } from '@theme/helpers/postData.js';

export default function({ Vue }) {
    const mixins = {
        computed: {
            $lang() {
                const lang = this.$themeConfig.lang || 'en-US';
                return this.$frontmatter.lang || this.$localeConfig.lang || lang;
            },
            $type() {
                return this.$themeConfig.type || 'doc';
            },
            $posts() {
                const pages = this.$site.pages || [];
                const posts = filterPosts(pages);
                return sortPostsByDate([].concat(posts));
            },
            $postsForTags() {
                if (this.$currentTags) {
                    const pages = this.$currentTags.pages || [];
                    const posts = filterPosts(pages);
                    return sortPostsByDate([].concat(posts));
                }
                return this.$posts;
            },
            $postsForCategories() {
                if (this.$currentCategories) {
                    const pages = this.$currentCategories.pages || [];
                    const posts = filterPosts(pages);
                    return sortPostsByDate([].concat(posts));
                }
                return this.$posts;
            },
            $postsForTimeline() {
                const posts = [].concat(this.$posts);
                const sortP = sortPostsByDate(posts).reduce((obj, item) => {
                    const date = item.date;
                    if (date) {
                        const year = String(date.getFullYear());
                        if (!obj[year]) {
                            obj[year] = [];
                        }
                        obj[year].push(item);
                    }
                    return obj;
                }, {});
                return Object.keys(sortP)
                    .sort((a, b) => parseInt(b) - parseInt(a))
                    .map(year => {
                        return {
                            year, data: sortP[year],
                        };
                    });
            },
            $blogConfig() {
                if (this.$type !== 'blog') return {};
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
    };

    Vue.mixin(mixins);
}
