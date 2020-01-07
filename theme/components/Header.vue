<template>
    <div :class="[ $style.hero, hasMask ? $style.hasMask : '' ]">
        <slot name="mask">
            <span v-if="frontmatter.banner" :class="$style.mask" :style="maskStyle"></span>
        </slot>
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
    </div>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue';
export default {
    name: 'Home',
    components: { NavLink },
    computed: {
        hasMask() {
            return this.$slots.mask || this.frontmatter.banner;
        },
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
        maskStyle() {
            const style = {};
            const banner = this.frontmatter.banner;
            if (banner) {
                style.backgroundImage = `url(${this.$withBase(banner)})`;
            }
            return style;
        },
    },
};
</script>

<style lang="stylus" module>
.hero {
    position: relative;
    text-align: center;
    box-sizing: border-box;
    overflow: hidden;

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
        max-width: 36rem;
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

    &.hasMask {
        z-index: 1;
        min-height: 350px;
        padding-bottom: 50px;
        color: #ffffff;

        .description {
            color: darken(#ffffff, 20%);
        }
    }
}

@media (max-width: $MQMobile) {
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
}

@media (max-width: $MQMobileNarrow) {
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
}

.mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    background: center center / cover no-repeat;
    z-index: -1;

    &:after {
        display: block;
        content: '';
        background: rgba(0, 0, 0, 0.65);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 0;
    }
}
</style>
