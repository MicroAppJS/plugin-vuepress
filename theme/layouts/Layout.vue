<template>
    <div
        class="theme-container"
        :class="pageClasses"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
    >
        <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

        <div class="sidebar-mask" @click="toggleSidebar(false)"></div>
        <TransitionFadeSlide direction="x">
            <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
                <slot name="sidebar-top" slot="top" />
                <slot name="sidebar-bottom" slot="bottom" />
            </Sidebar>
        </TransitionFadeSlide>

        <TransitionFadeSlide>
            <Header v-if="$page.frontmatter.home || showHeader" />
        </TransitionFadeSlide>

        <TransitionFadeSlide>
            <slot>
                <component :is="HomeMode" v-if="$page.frontmatter.home" />

                <Page v-else :sidebar-items="sidebarItems">
                    <slot name="page-top" slot="top" />
                    <slot name="page-bottom" slot="bottom" />
                </Page>
            </slot>
        </TransitionFadeSlide>

        <Footer v-if="$page.frontmatter.footer" />
    </div>
</template>

<script>
import ParentLayout from '@default-theme/layouts/Layout.vue';
import Header from '@theme/components/Header.vue';
import Footer from '@theme/components/Footer.vue';
import HomeBlog from '@theme/components/HomeBlog.vue';
import TransitionFadeSlide from '@theme/components/TransitionFadeSlide.vue';
export default {
    extends: ParentLayout,
    components: { Header, Footer, HomeBlog, TransitionFadeSlide },
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
    },
};
</script>
