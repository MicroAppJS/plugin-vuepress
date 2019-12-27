<template>
    <main :class="$style.home" aria-labelledby="main-title">
        <header :class="[ $style.hero, $slots.mask ? $style.hasMask : '' ]">
            <slot name="mask"></slot>
            <img
                :class="$style.logo"
                v-if="data.heroImage"
                :src="$withBase(data.heroImage)"
                :alt="data.heroAlt || 'hero'"
            />

            <h1
                v-if="data.heroText !== null"
                :class="[ data.heroImage ? '' : $style.notImg ]"
                id="main-title"
            >{{ heroText }}</h1>

            <p v-if="data.tagline !== null" :class="$style.description">{{ tagline }}</p>

            <p v-if="data.badges && Array.isArray(data.badges)" :class="$style.badges">
                <span v-for="(item, index) in data.badges" :key="index">
                    <iframe
                        v-if="!/^https?/.test(item)"
                        :src="`https://ghbtns.com/github-btn.html?${item}`"
                        frameborder="0"
                        scrolling="0"
                        width="auto"
                        height="20px"
                        style="min-width: 100px; max-width: 120px;"
                    ></iframe>
                    <img style="padding-right: 20px;" v-else :src="$withBase(item)" alt />
                </span>
            </p>

            <p v-if="data.actionText && data.actionLink" :class="$style.action">
                <NavLink :class="$style.actionButton" :item="actionLink" />
            </p>
        </header>

        <div v-if="data.features && data.features.length" :class="$style.features">
            <section v-for="(feature, index) in data.features" :key="index" :class="$style.feature">
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

        <slot>
            <Content :class="[ 'theme-default-content', $style.custom ]" />
        </slot>
    </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue';
export default {
    name: 'Home',
    components: { NavLink },
    computed: {
        data() {
            return this.$page.frontmatter;
        },
        heroText() {
            return this.data.heroText || this.$title || 'Hello';
        },
        tagline() {
            return this.data.tagline || this.$description || 'Welcome to your VuePress site';
        },
        actionLink() {
            return {
                link: this.data.actionLink,
                text: this.data.actionText,
            };
        },
    },
};
</script>

<style lang="stylus" module>
.home {
    padding: $navbarHeight 0 0;
    margin: 0px auto;
    display: block;

    .hero {
        position: relative;
        text-align: center;
        box-sizing: border-box;
        overflow: hidden;

        &.hasMask {
            z-index: 1;
            min-height: 450px;
        }

        img.logo {
            max-width: 100%;
            max-height: 280px;
            display: block;
            margin: 3rem auto 1.5rem;
        }

        h1 {
            font-size: 2rem;

            &.notImg {
                margin-top: 8rem;
            }
        }

        h1, .description, .action, .badges {
            margin: 2rem auto;
        }

        .action {
            margin-bottom: 6rem;
        }

        .description {
            max-width: 35rem;
            font-size: 1.2rem;
            line-height: 1.3;
            color: lighten($textColor, 30%);
        }

        .actionButton {
            display: inline-block;
            font-size: 1.2rem;
            color: #fff;
            background-color: $accentColor;
            padding: 0.8rem 1.6rem;
            border-radius: $borderRadius;
            transition: background-color 0.1s ease;
            box-sizing: border-box;
            border-bottom: 1px solid darken($accentColor, 10%);

            &:hover {
                background-color: lighten($accentColor, 10%);
            }
        }
    }

    .features {
        // border-top: 1px solid $borderColor;
        padding: 1.2rem 0;
        margin-top: 2.5rem;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        align-content: stretch;
        justify-content: space-between;
    }

    .feature {
        flex-grow: 1;
        flex-basis: 100%;
        max-width: 100%;

        &:nth-child(even) {
            background: rgba(27, 31, 35, 0.05);
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
            max-width: 20rem;
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

    .custom {
        max-width: 960px;
        margin: 0px auto;
        padding: 2rem 1.2rem;
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

            .wrapper {
                flex-direction: column;
                padding: 2rem 0;

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
        .hero {
            img {
                max-height: 210px;
                margin: 2rem auto 1.2rem;
            }

            h1 {
                font-size: 2rem;

                &.notImg {
                    margin-top: 6rem;
                }
            }

            h1, .description, .action {
                margin: 1.2rem auto;
            }

            .action {
                margin-bottom: 4rem;
            }

            .description {
                font-size: 1.2rem;
            }

            .actionButton {
                font-size: 1rem;
                padding: 0.6rem 1.2rem;
            }
        }

        .feature {
            h2 {
                font-size: 1.25rem;
            }
        }
    }
}
</style>
