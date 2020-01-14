<template>
    <header class="navbar">
        <div class="navbar-inner">
            <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

            <div class="navbar-crumb">
                <router-link :to="$localePath" class="home-link">
                    <img
                        class="logo"
                        v-if="$site.themeConfig.logo"
                        :src="$withBase($site.themeConfig.logo)"
                        :alt="$siteTitle"
                    />
                    <span
                        ref="siteName"
                        class="site-name"
                        v-if="$siteTitle"
                        :class="{ 'can-hide': $site.themeConfig.logo }"
                    >{{ $siteTitle }}</span>
                </router-link>
            </div>

            <div class="navbar-action">
                <div
                    class="links"
                    :style="linksWrapMaxWidth ? {
                'max-width': linksWrapMaxWidth + 'px'
            } : {}"
                >
                    <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia" />
                    <SearchBox
                        v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false"
                    />
                    <NavLinks class="can-hide" />
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import ParentLayout from '@default-theme/components/Navbar.vue';
export default {
    name: 'Navbar',
    extends: ParentLayout,
};
</script>


<style lang="stylus">
.navbar {
    box-shadow: $boxShadow;

    .navbar-inner {
        width: 100%;
        margin: 0 auto;
    }

    .navbar-crumb {
        float: left;
        display: flex;
        height: 100%;
        align-items: center;
    }

    .navbar-action {
        position: relative;
        float: right;
        display: flex;
        align-items: center;
    }

    .links {
        background-color: transparent;
        top: 0;
        right: 0;

        .search-box {
            input {
                background-color: $backgroundColor;
            }

            .suggestions {
                background-color: $backgroundColor;
            }
        }
    }

    .nav-links {
        a:hover, a.router-link-active {
            color: $accentColor;
        }
    }
}
</style>
