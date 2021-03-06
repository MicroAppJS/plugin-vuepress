<template>
    <div
        class="theme-container"
        :class="pageClasses"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
    >
        <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

        <TransitionFadeSlide>
            <Header v-if="$page.frontmatter.home || showHeader" />
        </TransitionFadeSlide>

        <div :class="$style.wrapper" class="main-wrapper">
            <div class="sidebar-mask" @click="toggleSidebar(false)"></div>
            <div class="aside" :is-home="$page.frontmatter.home">
                <Sidebar :items="_sidebarItems" @toggle-sidebar="toggleSidebar">
                    <template slot="top">
                        <Topics v-if="$type === 'blog'" />
                        <slot name="sidebar-top"></slot>
                    </template>
                    <slot name="sidebar-bottom" slot="bottom" />
                </Sidebar>
            </div>

            <component :is="HomeMode" v-if="$page.frontmatter.home" />

            <slot>
                <TransitionFadeSlide direction="x">
                    <div
                        v-if="!$page.frontmatter.home"
                        :class="$style.content"
                        class="main-content"
                        :custom="!!$slots.default"
                    >
                        <Page :sidebar-items="sidebarItems">
                            <slot name="page-top" slot="top" />
                            <slot name="page-bottom" slot="bottom" />
                        </Page>
                    </div>
                </TransitionFadeSlide>
            </slot>
        </div>

        <Footer v-if="$page.frontmatter.footer" />
    </div>
</template>

<script>
import ParentLayout from '@default-theme/layouts/Layout.vue';
import Header from '@theme/components/Header.vue';
import Footer from '@theme/components/Footer.vue';
import HomeBlog from '@theme/components/HomeBlog.vue';
import TransitionFadeSlide from '@theme/components/TransitionFadeSlide.vue';
import Topics from '@theme/components/Topics.vue';
export default {
    extends: ParentLayout,
    components: { Header, Footer, HomeBlog, TransitionFadeSlide, Topics },
    props: {
        showHeader: Boolean,
        hideSidebar: Boolean,
    },
    computed: {
        HomeMode() {
            switch (this.$type) {
                case 'blog':
                    return 'HomeBlog';
                default:
                    break;
            }
            return 'Home';
        },
        shouldShowSidebar() {
            const { frontmatter } = this.$page;
            return (
                !frontmatter.home
                && frontmatter.sidebar !== false
                && this.sidebarItems.length
                && !this.hideSidebar
            );
        },
        _sidebarItems() {
            if (this.$type === 'blog') {
                const sidebarItems = this.sidebarItems;
                if (sidebarItems && sidebarItems.length > 0) {
                    const { title } = this.$page;
                    if (sidebarItems[0] && sidebarItems[0].title === title) {
                        sidebarItems[0].title = '文章目录';
                    }
                }
            }
            return this.sidebarItems;
        },
    },
};
</script>

<style lang="stylus" module>
.content {
    position: relative;
    display: block;

    &[custom] {
        padding-top: $navbarHeight;
    }
}

.wrapper {
    position: relative;
}
</style>
