import { filterPosts, sortPostsByDate } from '@theme/helpers/postData.js';

export default {
    computed: {
        $type() {
            return this.$themeConfig.type || 'doc';
        },
        $posts() {
            const pages = this.$site.pages || [];
            const posts = filterPosts(pages);
            return posts;
        },
        $postsForTags() {
            if (this.$currentTags) {
                const pages = this.$currentTags.pages || [];
                return filterPosts(pages);
            }
            return this.$posts;
        },
        $postsForCategories() {
            if (this.$currentCategories) {
                const pages = this.$currentCategories.pages || [];
                return filterPosts(pages);
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
            return Object.keys(sortP).sort().map(year => {
                return {
                    year, data: sortP[year],
                };
            });
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
};
