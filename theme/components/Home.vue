<template>
    <main :class="$style.home" aria-labelledby="main-title">
        <template v-if="featuresNotImage">
            <div
                v-if="features && features.length"
                :class="$style.features"
                simple
                :line="!$slots.mask"
            >
                <div
                    :class="$style.feature"
                    v-for="(feature, index) in features"
                    :key="index"
                    simple
                >
                    <h2>{{ feature.title }}</h2>
                    <p>{{ feature.details }}</p>
                </div>
            </div>
        </template>
        <template v-else>
            <div v-if="features && features.length" :class="$style.features">
                <section v-for="(feature, index) in features" :key="index" :class="$style.feature">
                    <div :class="[ $style.wrapper, index % 2 === 1 ? $style.even : '' ]">
                        <div v-if="feature.image" :class="$style.wrapperImg">
                            <img :src="$withBase(feature.image)" alt />
                        </div>
                        <div v-if="feature.title" :class="$style.wrapperText">
                            <h2>{{ feature.title }}</h2>
                            <p>{{ feature.details }}</p>
                        </div>
                    </div>
                </section>
            </div>
        </template>

        <Content :class="[ 'theme-default-content', 'custom', $style.custom ]" />

        <slot></slot>
    </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue';
import TransitionFadeSlide from '@theme/components/TransitionFadeSlide.vue';
export default {
    name: 'Home',
    components: { NavLink, TransitionFadeSlide },
    computed: {
        frontmatter() {
            return this.$page.frontmatter;
        },
        features() {
            return this.frontmatter.features || [];
        },
        featuresNotImage() {
            return !this.features.some(item => !!item.image);
        },
    },
};
</script>

<style lang="stylus" module>
.home {
    padding: $navbarHeight 0 0;
    margin: 0px auto;
    display: block;

    .features {
        padding: 0 0 1.2rem;
        margin-top: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        align-content: stretch;
        justify-content: space-between;

        &[simple] {
            padding: 1.2rem;
            max-width: 1200px;
            margin: auto;

            &[line] {
                border-top: 1px solid $borderColor;
            }
        }
    }

    .feature {
        flex-grow: 1;
        flex-basis: 100%;
        max-width: 100%;

        &:nth-child(even) {
            background: rgba(27, 31, 35, 0.05);
        }

        &[simple] {
            flex-basis: 30%;
            max-width: 30%;
            background: none;
        }

        .wrapper {
            display: flex;
            box-sizing: border-box;
            max-width: 960px;
            margin: 0px auto;
            padding: 2rem;
            width: 100%;
            align-items: center;
            flex-direction: row;
            min-height: 25rem;

            &.even {
                flex-direction: row-reverse;
            }
        }

        .wrapperImg {
            flex: 0 1 100%;
            margin: auto;

            img {
                display: block;
                width: 100%;
            }
        }

        .wrapperText {
            flex: auto;
            box-sizing: border-box;
            padding: 0 2rem;
        }

        h2 {
            font-size: 1.4rem;
            font-weight: 500;
            border-bottom: none;
            padding-bottom: 1rem;
            color: lighten($textColor, 10%);
        }

        p {
            color: lighten($textColor, 25%);
        }
    }

    .custom[class] {
        max-width: 960px;
        margin: 0px auto;
        // padding: 0 1.2rem 2rem;
    }
}

@media (max-width: $MQMobile) {
    .home {
        .features {
            flex-direction: column;
        }

        .feature {
            max-width: 100%;
            padding: 0 2.5rem;
            margin: auto;

            &[simple] {
                max-width: 100%;
                margin: 0;
            }

            .wrapper {
                flex-direction: column;
                padding: 2rem 0;
                min-height: 15rem;

                &.even {
                    flex-direction: column-reverse;
                }

                .wrapperImg {
                    flex: auto;
                }

                .wrapperText {
                    padding: 1.2rem 0;
                }
            }
        }
    }
}

@media (max-width: $MQMobileNarrow) {
    .home {
        .feature {
            h2 {
                font-size: 1.25rem;
            }
        }
    }
}
</style>
