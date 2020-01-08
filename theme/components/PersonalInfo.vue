<template>
    <div :class="$style.root">
        <img :class="$style.avatar" :src="$withBase(avatar)" />
        <h3 :class="$style.name" v-if="author">{{ author }}</h3>
        <div :class="$style.num">
            <div>
                <h3>{{$posts.length}}</h3>
                <h6>文章</h6>
            </div>
            <div>
                <h3>{{$tags.length}}</h3>
                <h6>标签</h6>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PersonalInfo',
    computed: {
        avatar() {
            return this.$frontmatter.avatar || this.$i18nText('avatar') || require('@theme/assets/avatar.svg');
        },
        author() {
            return this.$frontmatter.author || this.$i18nText('author') || this.$site.title;
        },
    },
};
</script>

<style lang="stylus" module>
.root {
    position: relative;
}

.avatar {
    display: block;
    margin: 2rem auto;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;

    &:hover {
        transform: rotate(666turn);
        transition-delay: 1s;
        transition-property: all;
        transition-duration: 59s;
        transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
    }
}

.name {
    text-align: center;
    color: $textColor;
}

.num {
    display: flex;
    margin: 0 auto 1rem;
    width: 80%;

    > div {
        text-align: center;
        flex: auto;

        &:first-child {
            border-right: 1px solid $borderColor;
        }

        h3 {
            line-height: auto;
            margin: 0 0 0.6rem;
            color: $textColor;
        }

        h6 {
            line-height: auto;
            color: $textColor;
            margin: 0;
        }
    }
}
</style>
