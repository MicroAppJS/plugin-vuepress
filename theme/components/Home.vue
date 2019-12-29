<template>
    <main :class="$style.home" aria-labelledby="main-title">
        <header :class="[ $style.hero, $slots.mask ? $style.hasMask : '' ]">
            <slot name="mask"></slot>
            <div :class="[ $style.headerWrapper, heroImage ? $style.hasHeroImage : '' ]">
                <div v-if="heroImage" :class="$style.headerItem">
                    <img
                        :class="$style.logo"
                        :src="$withBase(heroImage)"
                        :alt="frontmatter.heroAlt || 'hero'"
                    />
                </div>
                <div>
                    <h1
                        v-if="frontmatter.heroText !== null"
                        :class="[ heroImage ? '' : $style.notImg ]"
                        id="main-title"
                    >{{ heroText }}</h1>

                    <p v-if="frontmatter.tagline !== null" :class="$style.description">{{ tagline }}</p>

                    <p
                        v-if="frontmatter.badges && Array.isArray(frontmatter.badges)"
                        :class="$style.badges"
                    >
                        <span v-for="(item, index) in frontmatter.badges" :key="index">
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

                    <p v-if="actions && actions.length" :class="$style.action">
                        <NavLink
                            v-for="(item, index) in actions"
                            :key="index"
                            :class="$style.actionButton"
                            :item="item"
                        />
                    </p>
                </div>
            </div>
        </header>

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
        frontmatter() {
            return this.$page.frontmatter;
        },
        heroImage() {
            return this.frontmatter.heroImage || false;
        },
        heroText() {
            return this.frontmatter.heroText || this.$title || 'Hello';
        },
        tagline() {
            return (
                this.frontmatter.tagline ||
                this.$description ||
                'Welcome to your VuePress site'
            );
        },
        actionText() {
            const actionText = this.frontmatter.actionText;
            if (Array.isArray(actionText)) {
                return actionText;
            }
            if (typeof actionText === 'string') {
                return [ actionText ];
            }
            return [];
        },
        actionLink() {
            const actionLink = this.frontmatter.actionLink;
            if (Array.isArray(actionLink)) {
                return actionLink;
            }
            if (typeof actionLink === 'string') {
                return [ actionLink ];
            }
            return [];
        },
        actions() {
            const actionLink = this.actionLink;
            return this.actionText.map((text, index) => {
                return {
                    link: actionLink[index] || '/',
                    text,
                };
            });
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

    .hero {
        position: relative;
        text-align: center;
        box-sizing: border-box;
        overflow: hidden;
        margin-bottom: 3rem;

        &.hasMask {
            z-index: 1;
            min-height: 450px;
        }

        .headerWrapper {
            max-width: 1240px;
            width: 90%;
            margin: 0 auto;

            &.hasHeroImage {
                text-align: left;
                justify-content: space-between;
                flex-direction: row-reverse;
                align-items: center;
                display: flex;
            }

            .headerItem {
                margin-left: 6rem;
            }
        }

        img.logo {
            max-width: 100%;
            max-height: 1000px;
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
            padding: 10px;
        }

        .badges {
            margin: auto;
        }

        .description {
            max-width: 35rem;
            font-size: 1.2rem;
            line-height: 1.7;
            color: lighten($textColor, 10%);
        }

        .actionButton {
            display: inline-block;
            font-size: 1.2rem;
            color: #fff;
            background-color: $accentColor;
            padding: 0.6rem 1.2rem;
            border-radius: $borderRadius;
            transition: all 0.3s ease;
            box-sizing: border-box;
            border-bottom: 1px solid darken($accentColor, 10%);
            margin-right: 1rem;

            &:hover {
                background-color: lighten($accentColor, 20%);
            }

            &:not(:first-child) {
                color: $accentColor;
                border: 1px solid darken($accentColor, 10%);
                background-color: #fff;
            }

            &:last-child {
                margin-right: 0;
            }
        }
    }

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

    .custom {
        max-width: 960px;
        margin: 0px auto;
        padding: 0 1.2rem 2rem;
    }
}

@media (max-width: $MQMobile) {
    .home {
        .hero {
            .headerWrapper {
                &.hasHeroImage {
                    flex-direction: column;
                    text-align: center;
                }

                .headerItem {
                    margin-left: 0;
                }
            }

            img.logo {
                max-height: 300px;
            }
        }

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
        .hero {
            img.logo {
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
