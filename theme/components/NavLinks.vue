<template>
    <nav v-if="userLinks.length || repoLink" class="nav-links">
        <!-- user links -->
        <div v-for="item in userLinks" :key="item.link" class="nav-item">
            <DropdownLink v-if="item.type === 'links'" :item="item" />
            <NavLink v-else :item="item" />
        </div>

        <!-- repo link -->
        <a
            v-if="repoLink"
            :href="repoLink"
            class="repo-link"
            target="_blank"
            rel="noopener noreferrer"
        >
            <SvgIcon v-if="repoIcon" :name="repoIcon" class="icon"></SvgIcon>
            {{ repoLabel }}
            <OutboundLink />
        </a>
    </nav>
</template>

<script>
import ParentLayout from '@default-theme/components/NavLinks.vue';
export default {
    name: 'NavLinks',
    extends: ParentLayout,
    computed: {
        repoIcon() {
            if (!this.repoLink) return;
            if (this.$themeConfig.repoIcon) {
                return this.$themeConfig.repoIcon;
            }
        },
    },
};
</script>
