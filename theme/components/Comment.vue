<template>
    <div :class="$style.root" v-if="visible" :type="type">
        <CommentComp />
    </div>
</template>

<script>
import CommentComp from '@vuepress/plugin-blog/lib/client/components/Comment';
export default {
    name: 'Comment',
    components: {
        CommentComp,
    },
    computed: {
        visible() {
            return !!this.$blogConfig.comment;
        },
        comment() {
            return this.$blogConfig.comment || {};
        },
        type() {
            return this.comment.type || 'vssue';
        },
    },
};
</script>

<style lang="stylus" module>
.root {
    max-width: 820px;
    margin: 60px auto 30px;
}
</style>
