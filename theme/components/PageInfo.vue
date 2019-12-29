<template>
    <div
        v-if="visible"
        class="theme-default-content"
        :class="[$style.root, { 'custom': hideTitle }]"
    >
        <h1 v-if="!hideTitle" :class="$style.title">{{ title }}</h1>
        <div :class="$style.rows">
            <span v-if="frontmatter.categories" :class="$style.tags">
                <SvgIcon :class="$style.icon" name="category"></SvgIcon>
                <span
                    v-for="(subItem, subIndex) in categories"
                    :key="subIndex"
                    :active="currentTag === subItem"
                    :class="$style.tagItem"
                    @click="goCategories(subItem)"
                >{{subItem}}</span>
            </span>
            <span v-if="frontmatter.author || $i18nText('author')">
                <SvgIcon :class="$style.icon" name="author"></SvgIcon>
                <span>{{ frontmatter.author || $i18nText('author') }}</span>
            </span>
            <span v-if="frontmatter.date">
                <SvgIcon :class="$style.icon" name="date"></SvgIcon>
                <span>{{ frontmatter.date | formatDateValue }}</span>
            </span>
            <span v-else-if="info.lastUpdated">
                <SvgIcon :class="$style.icon" name="date"></SvgIcon>
                <span>{{ info.lastUpdated }}</span>
            </span>
            <span v-if="frontmatter.tags" :class="$style.tags">
                <SvgIcon :class="$style.icon" name="tags"></SvgIcon>
                <span
                    v-for="(subItem, subIndex) in tags"
                    :key="subIndex"
                    :active="currentTag === subItem"
                    :class="$style.tagItem"
                    @click="goTags(subItem)"
                >{{subItem}}</span>
            </span>
        </div>
    </div>
</template>

<script>
// 引入时间格式化js文件
import { formatDate } from '@theme/helpers';
export default {
    props: {
        info: {
            type: Object,
            default() {
                return {};
            },
        },
        hideTitle: {
            type: Boolean,
            default: false,
        },
    },
    filters: {
        formatDateValue(value) {
            if (!value) return '';
            // 返回的value的值都是这个样子2019-09-20T18:22:30.000Z
            // 对value进行处理
            value = value.replace('T', ' ').slice(0, value.lastIndexOf('.'));
            // 转化后的value 2019-09-20 18:22:30
            // 获取到时分秒
            const h = Number(value.substr(11, 2));
            const m = Number(value.substr(14, 2));
            const s = Number(value.substr(17, 2));
            // 判断时分秒是不是 00:00:00 (如果是用户手动输入的00:00:00也会不显示)
            if (h > 0 || m > 0 || s > 0) {
                // 时分秒有一个> 0 就说明用户输入一个非 00:00:00 的时分秒
                return formatDate(value);
            }
            // 用户没有输入或者输入了 00:00:00
            return formatDate(value, 'yyyy-MM-dd');

        },
    },
    computed: {
        visible() {
            return Object.keys(this.frontmatter).some(key => {
                return [ 'title', 'date', 'tags' ].includes(key);
            });
        },
        frontmatter() {
            return this.info.frontmatter || {};
        },
        title() {
            return this.frontmatter.title || this.info.title;
        },
        tags() {
            if (typeof this.frontmatter.tags === 'string') {
                return this.frontmatter.tags.split(',');
            }
            return this.frontmatter.tags;
        },
        categories() {
            if (typeof this.frontmatter.categories === 'string') {
                return this.frontmatter.categories.split(',');
            }
            return this.frontmatter.categories;
        },
        currentTag() {
            return this.$currentTags || this.$currentTag || null;
        },
    },
    methods: {
        goTags(tag) {
            let path = `/tag/${tag}/`;
            if (this.$tags) {
                const info = this.$tags.getItemByName(tag);
                path = info.path;
            }
            this.$router.push({ path });
        },
        goCategories(categories) {
            let path = `/categories/${categories}/`;
            if (this.$categories) {
                const info = this.$categories.getItemByName(categories);
                path = info.path;
            }
            this.$router.push({ path });
        },
    },
};
</script>

<style lang="stylus" module>
.root[class] {
    padding-bottom: 0;
}

.title {
    border-bottom: 1px solid $borderColor;
    padding-bottom: 1rem;
}

.icon {
    margin-right: 3px;
    color: #888;
}

.rows {
    font-size: 14px;
    line-height: 1.5;

    >span {
        margin-right: 1rem;
    }
}

.tags {
    .tagItem {
        cursor: pointer;
        margin-right: 6px;
        word-break: break-all;

        &:hover {
            color: $accentColor;
        }

        &[active] {
            color: $accentColor;
        }
    }
}

@media (max-width: $MQMobile) {
    .tags {
        display: block;
    }
}
</style>
