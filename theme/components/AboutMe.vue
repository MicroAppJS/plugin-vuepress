<template>
    <PostCardBlocks :title="title" :subtitle="subtitle">
        <template slot="body">
            <div :class="$style.root">
                <div :class="$style.warpper">
                    <PersonalInfo simple></PersonalInfo>
                </div>
            </div>
        </template>
    </PostCardBlocks>
</template>

<script>
import PostCardBlocks from '@theme/components/PostCardBlocks.vue';
import PersonalInfo from '@theme/components/PersonalInfo.vue';
export default {
    name: 'AboutMe',
    components: {
        PostCardBlocks, PersonalInfo,
    },
    props: {
        title: {
            type: Array,
            default() { return []; },
        },
        subtitle: {
            type: Array,
            default() { return []; },
        },
    },
    mounted() {
        this.$scroll.reveal(`.${this.$style.root}`, { delay: 100, origin: 'top', distance: '100px', interval: 100 });
    },
};
</script>

<style lang="stylus" module>
.root {
    position: relative;
    box-sizing: border-box;
    box-shadow: $boxShadow;
    border-radius: $borderRadius;
    transition: all 0.3s;
    margin: 1rem;

    &:hover {
        box-shadow: $boxShadowHover;
        transform: translateY(-0.2rem);
    }
}

.warpper {
    padding: 0.6rem;
}
</style>
