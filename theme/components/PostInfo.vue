<template>
    <div :class="$style.post" :simple="simple">
        <h2 role="title" :class="$style.title">
            <Badge
                v-if="post.frontmatter.type"
                style="margin-right: 5px;"
                :text="post.frontmatter.type"
                type="yellow"
            ></Badge>
            <NavLink :item="post.path" line :title="post.title">{{ post.title }}</NavLink>
        </h2>
        <article v-if="!simple" role="summary" :class="$style.summary">
            <template v-if="post.frontmatter.summary">
                <span>{{ post.frontmatter.summary || '' }}</span>
            </template>
            <!-- $page.excerpt -->
            <template v-else-if="post.excerptKey">
                <div
                    :class="$style.abstract"
                    class="theme-default-content abstract"
                    :key="post.excerptKey"
                >
                    <ExcerptContent :page-key="post.excerptKey"></ExcerptContent>
                </div>
            </template>
            <template v-else-if="post.excerpt">
                <div :class="$style.abstract" class="theme-default-content abstract">
                    <span v-html="post.excerpt"></span>
                </div>
            </template>
            <!-- <Content :post-key="post.key" slot-key="summary" /> -->
        </article>
        <PageInfo role="info" :class="$style.info" :info="post" hideTitle />
    </div>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue';
import PageInfo from '@theme/components/PageInfo.vue';
export default {
    name: 'PostInfo',
    components: {
        NavLink,
        PageInfo,
    },
    props: {
        post: {
            required: true,
            type: Object,
        },
        simple: Boolean,
    },
};
</script>

<style lang="stylus" module>
.post {
    position: relative;
    padding: 10px 20px;
    margin: 20px 0;
    box-shadow: $boxShadow;
    transition: all 0.3s;
    border-radius: $borderRadius;

    &:hover {
        box-shadow: $boxShadowHover;
    }

    &:first-child {
        margin-top: 0;
    }

    .title {
        position: relative;
        font-size: 1.28rem;
        line-height: 36px;
        border: none;
        display: inline-block;
        max-width: 100%;
    }

    .summary {
        word-break: break-all;
        opacity: 0.85;
        color: $textColor;
    }

    .info {
        padding: 0;
        margin: 20px 0;
    }

    &[simple] {
        .title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 1.2rem;
        }
    }

    .abstract[class] {
        padding: 0 0 1rem;
        max-width: none;
    }
}
</style>
