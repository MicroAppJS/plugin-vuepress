<template>
    <div
        class="theme-container"
        :class="pageClasses"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
    >
        <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

        <slot name="sidebar">
            <div class="sidebar-mask" @click="toggleSidebar(false)"></div>

            <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
                <slot name="sidebar-top" slot="top" />
                <slot name="sidebar-bottom" slot="bottom" />
            </Sidebar>
        </slot>

        <slot>
            <component :is="HomeMode" v-if="$page.frontmatter.home" />

            <Page v-else :sidebar-items="sidebarItems">
                <slot name="page-top" slot="top" />
                <slot name="page-bottom" slot="bottom" />
            </Page>
        </slot>

        <Footer v-if="$page.frontmatter.footer" />
    </div>
</template>

<script>
import ParentLayout from '@default-theme/layouts/Layout.vue';
import Footer from '@theme/components/Footer.vue';
import HomeBlog from '@theme/components/HomeBlog.vue';
export default {
    extends: ParentLayout,
    components: { Footer, HomeBlog },
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
    },
    mounted() {
        console.warn(this);
    },
};
</script>
