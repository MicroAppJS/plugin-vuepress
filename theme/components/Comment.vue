<template>
    <div :class="$style.root" v-if="visible">
        <Vssue v-if="type === 'vssue'" />
    </div>
</template>

<script>
export default {
    name: 'Comment',
    computed: {
        visible() {
            return !!this.$themeConfig.comment;
        },
        comment() {
            return this.$themeConfig.comment || {};
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
