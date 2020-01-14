<script>
import ParentLayout from '@default-theme/components/SidebarLink.vue';
export default {
    name: 'SidebarLink',
    extends: ParentLayout,
};
</script>

<style lang="stylus">
a.sidebar-link {
    border-left: none;
    border-right: 0.25rem solid transparent;

    &.active {
        border-right-color: $accentColor;
    }

    .sidebar-sub-headers & {
        border-right: none;
    }
}
</style>
