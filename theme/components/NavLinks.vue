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
import { resolveNavLinkItem } from '@default-theme/util';
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
        userLinks() {
            return (this.nav || []).map(link => {
                if (link && [ 'category', 'categories' ].includes(link.role) && this.$categories && this.$categories.length > 0) {
                    link.items = this.$categories.list.map(item => {
                        item.link = item.path;
                        item.text = item.name;
                        return item;
                    }).sort((a, b) => {
                        try {
                            return a.text.localeCompare(b.text, 'zh-CN');
                        } catch (error) {
                            return a.text - b.text;
                        }
                    });
                }
                return Object.assign(resolveNavLinkItem(link), {
                    items: (link.items || []).map(resolveNavLinkItem),
                });
            });
        },
    },
};
</script>

<style lang="stylus">
@media (min-width: $MQMobile) {
    .nav-item > a:not(.external) {
        &:before {
            content: '';
            position: absolute;
            left: 51%;
            right: 51%;
            bottom: 0;
            background: lighten($accentColor, 8%);
            height: 2px;
            transition-property: left, right;
            transition-duration: 0.3s;
            transition-timing-function: ease-out;
        }

        &:hover, &.router-link-active {
            margin-bottom: -2px;
            border-bottom: 2px solid transparent;

            &:before {
                left: 0;
                right: 0;
            }
        }
    }
}
</style>
