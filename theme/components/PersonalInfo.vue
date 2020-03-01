<template>
    <div :class="$style.root">
        <div :class="$style.left" :simple="simple">
            <img :class="$style.avatar" :src="$withBase(avatar)" />
            <h3 :class="$style.name" v-if="author">{{ author }}</h3>
        </div>
        <div :class="$style.warpper" :simple="simple">
            <div v-if="simple" :class="$style.description">
                <div v-if="description">{{ description }}</div>
                <Content slot-key="aboutme"></Content>
            </div>
            <div :class="$style.num" :simple="simple">
                <div>
                    <h3>{{$posts.length}}</h3>
                    <h6>文章</h6>
                </div>
                <div v-if="simple">
                    <h3>{{$categories.length}}</h3>
                    <h6>分类</h6>
                </div>
                <div>
                    <h3>{{$tags.length}}</h3>
                    <h6>标签</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PersonalInfo',
    props: {
        simple: Boolean,
    },
    computed: {
        avatar() {
            return this.$frontmatter.avatar || this.$i18nText('avatar') || require('@theme/assets/avatar.svg');
        },
        author() {
            return this.$frontmatter.author || this.$i18nText('author') || this.$site.title;
        },
        description() {
            return this.$i18nText('description') || this.$site.description;
        },
    },
    mounted() {
        console.warn(this);
    },
};
</script>

<style lang="stylus" module>
.root {
    position: relative;
    box-sizing: border-box;
}

.avatar {
    display: block;
    margin: 2rem auto;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    box-sizing: border-box;

    &:hover {
        transform: rotate(666turn);
        transition-delay: 1s;
        transition-property: all;
        transition-duration: 59s;
        transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
    }
}

.left {
    &[simple] {
        display: inline-block;
        width: 46%;
    }
}

.warpper {
    position: relative;
    box-sizing: border-box;
    text-align: center;

    &[simple] {
        display: inline-block;
        width: 52%;
        vertical-align: top;
        padding: 2rem 0;
    }
}

.name {
    color: $textColor;
}

.num {
    display: flex;
    margin: 0 auto 1rem;
    width: 80%;

    &[simple] {
        margin: 0;
        width: 100%;
    }

    > div {
        text-align: center;
        flex: auto;
        border-right: 1px solid $borderColor;

        &:last-child {
            border-right: none;
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

.description {
    position: relative;
    box-sizing: border-box;
    padding: 1rem;
    min-height: 8rem;
}
</style>
